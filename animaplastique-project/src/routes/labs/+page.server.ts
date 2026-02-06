// src/routes/labs/+page.server.ts
import type { PageServerLoad } from './$types';
import matter from 'gray-matter';
import { env } from '$env/dynamic/private';

type LabFrontmatter = {
	title?: string;
	description?: string;
	date?: string;
};

export type LabSummary = {
	slug: string;
	title: string;
	description?: string;
	date?: string;
};

const OWNER = 'ahson01';
const REPO = 'notes';

// Same idea as your React example:
const TREE_URL = `https://api.github.com/repos/${OWNER}/${REPO}/git/trees/main?recursive=1`;
const RAW_BASE = `https://raw.githubusercontent.com/${OWNER}/${REPO}/main/`;

export const load: PageServerLoad = async ({ fetch }) => {
	const headers: HeadersInit = {
		Accept: 'application/vnd.github.v3+json'
	};
	if (GITHUB_TOKEN) {
		// Same style as your Next example
		headers.Authorization = `token ${GITHUB_TOKEN}`;
	}

	// 1) Get full tree
	const res = await fetch(TREE_URL, { headers });
	if (!res.ok) {
		console.error('Failed to fetch repository tree:', res.status);
		return { labs: [] as LabSummary[] };
	}

	const data = await res.json();
	if (!data.tree || !Array.isArray(data.tree)) {
		return { labs: [] as LabSummary[] };
	}

	// 2) Filter to markdown files under labs/
	const mdFiles = data.tree.filter(
		(item: any) =>
			item.type === 'blob' &&
			typeof item.path === 'string' &&
			item.path.startsWith('labs/') &&
			(item.path.endsWith('.md') || item.path.endsWith('.mdx'))
	);

	const labs: LabSummary[] = [];

	for (const file of mdFiles) {
		const rawUrl = `${RAW_BASE}${file.path}`;
		try {
			const contentRes = await fetch(rawUrl, { headers });
			if (!contentRes.ok) {
				console.warn('Failed to fetch raw content for', file.path);
				continue;
			}

			const rawMarkdown = await contentRes.text();
			const { data: frontmatter } = matter<LabFrontmatter>(rawMarkdown);

			const fileName: string = file.path.split('/').pop() || '';
			const baseName = fileName.replace(/\.mdx?$/i, '');

			labs.push({
				slug: baseName,
				title: frontmatter?.title ?? baseName,
				description: frontmatter?.description,
				date: frontmatter?.date
			});
		} catch (err) {
			console.error('Error processing lab file', file.path, err);
		}
	}

	// 3) Sort newest first by date (if present)
	labs.sort((a, b) => {
		if (!a.date || !b.date) return 0;
		return a.date < b.date ? 1 : -1;
	});

	return { labs };
};
