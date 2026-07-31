// src/routes/labs/[slug]/+page.server.ts
import type { PageServerLoad } from './$types';

// Dynamic route: content is fetched from GitHub per-slug at request time,
// so it must not be force-prerendered by the global prerender=true layout.
export const prerender = false;
import { error } from '@sveltejs/kit';
import matter from 'gray-matter';
import { Marked } from 'marked';
import { GITHUB_TOKEN } from '$env/static/private';

type LabFrontmatter = {
	title?: string;
	description?: string;
	date?: string;
};

type RepoMeta = {
	full_name: string;
	description: string | null;
	stargazers_count: number;
	language: string | null;
	html_url: string;
};

const OWNER = 'ahson01';
const REPO = 'notes';
const RAW_BASE = `https://raw.githubusercontent.com/${OWNER}/${REPO}/main/`;

// ---------- Marked instance (no global overrides!) ----------
const md = new Marked(); // isolated instance

// ---------- helpers ----------
const apiHeaders: HeadersInit = {
	Accept: 'application/vnd.github.v3+json',
	...(GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {})
};

const rawHeaders: HeadersInit = {
	...(GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {})
};

function escapeHtml(input: string): string {
	return input
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

function formatStars(stars: number): string {
	if (stars >= 1_000_000) return `${(stars / 1_000_000).toFixed(1).replace(/\.0$/, '')}m`;
	if (stars >= 1_000) return `${(stars / 1_000).toFixed(1).replace(/\.0$/, '')}k`;
	return String(stars);
}

// GitHub repo card HTML
function buildRepoCard(meta: RepoMeta): string {
	const [owner, repo] = meta.full_name.split('/');
	const desc = meta.description ? escapeHtml(meta.description) : 'No description';
	const lang = meta.language ? escapeHtml(meta.language) : 'Unknown';
	const stars = formatStars(meta.stargazers_count);

	return `
<a href="${meta.html_url}" target="_blank" rel="noreferrer" class="block my-4 no-underline">
	<div class="group flex flex-col gap-2 rounded-2xl border border-white/10 bg-neutral-950/80 p-4 transition-all hover:border-white/40 hover:bg-neutral-900/90">
		<div class="flex items-center justify-between gap-2">
			<div class="flex items-center gap-2">
				<span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs font-mono">
					gh
				</span>
				<div class="flex flex-col">
					<span class="text-xs text-neutral-400">${escapeHtml(owner)}</span>
					<span class="text-sm font-semibold text-neutral-50">${escapeHtml(repo)}</span>
				</div>
			</div>
			<div class="flex items-center gap-3 text-[0.7rem] text-neutral-400">
				<span class="inline-flex items-center gap-1">
					<span>★</span>
					<span>${stars}</span>
				</span>
				<span class="inline-flex items-center gap-1">
					<span class="h-2 w-2 rounded-full bg-emerald-400 inline-block"></span>
					<span>${lang}</span>
				</span>
			</div>
		</div>
		<p class="text-xs text-neutral-300 leading-relaxed">
			${desc}
		</p>
	</div>
</a>
`.trim();
}

export const load: PageServerLoad = async ({ fetch, params }) => {
	const { slug } = params;

	const headers = rawHeaders;

	// Try .md then .mdx, same pattern as the React example
	const candidatePaths = [`labs/${slug}.md`, `labs/${slug}.mdx`];

	let rawMarkdown: string | null = null;

	for (const path of candidatePaths) {
		const rawUrl = `${RAW_BASE}${path}`;
		const res = await fetch(rawUrl, { headers });

		if (res.status === 404) {
			continue; // try next extension
		}
		if (!res.ok) {
			const text = await res.text();
			console.error('Failed to fetch raw lab content:', res.status, text);
			throw error(500, 'Failed to load lab content from GitHub');
		}

		rawMarkdown = await res.text();
		break;
	}

	if (!rawMarkdown) {
		throw error(404, 'Lab note not found');
	}

	// Frontmatter + markdown body
	const { data: frontmatter, content } = matter<LabFrontmatter>(rawMarkdown);

	const title = frontmatter?.title ?? slug;
	const description = frontmatter?.description;
	const date = frontmatter?.date;

	// --- detect GitHub repo URLs in the markdown ---
	const repoUrlRegex = /https:\/\/github\.com\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)/g;
	const repoKeys = new Set<string>();

	for (const match of content.matchAll(repoUrlRegex)) {
		const owner = match[1];
		const repo = match[2];
		repoKeys.add(`${owner}/${repo}`);
	}

	// Fetch repo metadata
	const repoMetaMap = new Map<string, RepoMeta>();

	for (const key of repoKeys) {
		const apiUrl = `https://api.github.com/repos/${key}`;
		try {
			const res = await fetch(apiUrl, { headers: apiHeaders });
			if (!res.ok) {
				console.warn('Failed to fetch repo meta for', key, res.status);
				continue;
			}
			const json = (await res.json()) as RepoMeta;
			repoMetaMap.set(key, json);
		} catch (err) {
			console.error('Error fetching repo meta for', key, err);
		}
	}

	// --- markdown -> HTML (no custom renderer, so no href.replace) ---
	let html = (md.parse(content) as string) ?? '';

	// --- swap <a href="https://github.com/owner/repo"> with cards ---
	const anchorRegex =
		/<a\s+[^>]*href="https:\/\/github\.com\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)[^"]*"[^>]*>.*?<\/a>/g;

	html = html.replace(anchorRegex, (fullMatch, owner: string, repo: string) => {
		const key = `${owner}/${repo}`;
		const meta = repoMetaMap.get(key);
		if (!meta) return fullMatch; // fallback: keep original link
		return buildRepoCard(meta);
	});

	return {
		slug,
		title,
		description,
		date,
		html
	};
};
