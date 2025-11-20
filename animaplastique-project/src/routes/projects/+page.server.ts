import type { PageServerLoad } from './$types';
import { GITHUB_TOKEN } from '$env/static/private';

const username = 'ahson01';

// The repos you want to show
const selectedRepoNames = ['github-storage', 'omecord'];

export const load: PageServerLoad = async ({ fetch }) => {
	const repos = [];

	for (const repoName of selectedRepoNames) {
		const res = await fetch(`https://api.github.com/repos/${username}/${repoName}`, {
			headers: {
				Accept: 'application/vnd.github+json',
				Authorization: `Bearer ${GITHUB_TOKEN}`
			}
		});

		if (!res.ok) {
			console.warn(`Failed to fetch ${repoName}`, await res.text());
			continue;
		}

		const json = await res.json();
		repos.push(json);
	}

	return { repos, username };
};
