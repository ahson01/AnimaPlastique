<script lang="ts">
	export type Repo = {
		name: string;
		html_url: string;
		description: string | null;
		stargazers_count: number;
		language: string | null;
		homepage: string | null;
		topics?: string[];
	};

	export let data: {
		repos: Repo[];
		username: string;
	};

	const { repos, username } = data;

	function formatStars(count: number) {
		if (count >= 1000) return (count / 1000).toFixed(1) + 'k';
		return String(count);
	}
</script>

<svelte:head>
	<title>Projects · xkinetics.space</title>
</svelte:head>

<section class="relative flex w-full justify-center overflow-hidden">
	<!-- background glows -->
	<div class="pointer-events-none absolute inset-0 -z-10">
		<div
			class="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.6),transparent)] opacity-25
			       blur-3xl
			       dark:opacity-20"
		></div>

		<div
			class="absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgba(0,0,0,0.3),transparent)] opacity-20
			       blur-3xl
			       dark:opacity-30"
		></div>

		<div
			class="absolute right-0 bottom-0 h-[40rem] w-[40rem] translate-x-1/3 translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.4),transparent)]
			       opacity-40 blur-[120px]
			       dark:bg-[radial-gradient(closest-side,rgba(16,185,129,0.35),transparent)] dark:opacity-60"
		></div>
	</div>

	<div class="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pt-18 pb-24 lg:pt-22">
		<!-- Header -->
		<header class="space-y-4">
			<p
				class="animate-pop-up bg-gradient-to-r from-emerald-400 to-green-500
				   bg-clip-text font-mono text-[0.65rem] tracking-[0.35em] text-transparent uppercase"
			>
				xkinetics.space · GitHub projects
			</p>

			<div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
				<div class="space-y-2">
					<h1
						class="font-inter rapid-text reveal-line block text-3xl
						       leading-tight -tracking-[0.06em] text-balance sm:text-4xl lg:text-5xl"
					>
						<span class="reveal-line block">
							<span class="rapid-text">Selected repositories from <span class="rapid-text font-mono">@{username}</span>.</span>
						</span>
					</h1>
					<p class="max-w-2xl text-sm leading-relaxed text-neutral-400">
						Small utilities, bots, experiments, and tools that live on GitHub. These repos are a
						good snapshot of how we write code in the wild: pragmatic, documented, and shipped.
					</p>
				</div>

				<a
					href={`https://github.com/${username}`}
					target="_blank"
					rel="noopener noreferrer"
					class="mt-2 inline-flex items-center justify-center rounded-full border border-neutral-900/20 bg-neutral-900 p-5
					       py-2 text-[0.7rem]
					       tracking-[0.22em] text-neutral-50 uppercase shadow-sm
					       transition-all duration-200
					       hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg
					       focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 focus-visible:outline-none
					       dark:border-neutral-50/15 dark:bg-neutral-50 dark:text-neutral-900
					       dark:hover:border-neutral-50/30 dark:hover:bg-neutral-100
					       dark:focus-visible:ring-emerald-400/80 dark:focus-visible:ring-offset-neutral-900"
				>
					View full GitHub profile
				</a>
			</div>
		</header>

		<!-- If no repos -->
		{#if !repos || repos.length === 0}
			<div class="mt-8 text-sm text-neutral-400">
				No repositories found for the selected list. Check <code>{username}</code> and repo names.
			</div>
		{:else}
			<!-- Repo cards -->
			<div class="flex flex-col gap-6">
				{#each repos as repo}
					<article
						class="group relative w-full overflow-hidden rounded-2xl border border-white/10
						       bg-neutral-950/70 p-6 shadow-lg backdrop-blur-md
						       transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-7"
					>
						<div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
							<div class="space-y-2">
								<div class="flex items-center gap-2">
									<a
										href={repo.html_url}
										target="_blank"
										rel="noopener noreferrer"
										class="font-mono text-xs tracking-[0.22em] text-emerald-400/90 uppercase"
									>
										{username}/{repo.name}
									</a>
								</div>

								<h2 class="text-xl font-semibold text-neutral-50">
									{repo.name}
								</h2>

								{#if repo.description}
									<p class="max-w-xl text-sm text-neutral-300">
										{repo.description}
									</p>
								{/if}

								<!-- meta: language + stars -->
								<div class="mt-2 flex flex-wrap items-center gap-3 text-xs text-neutral-400">
									{#if repo.language}
										<span class="inline-flex items-center gap-1">
											<span class="h-2 w-2 rounded-full bg-emerald-400/80"></span>
											{repo.language}
										</span>
									{/if}

									<span class="inline-flex items-center gap-1">
										<svg width="13" height="13" viewBox="0 0 24 24" class="text-yellow-300">
											<path
												fill="currentColor"
												d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.62L12 2L9.19 8.62L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
											/>
										</svg>
										{formatStars(repo.stargazers_count)} stars
									</span>

									{#if repo.topics && repo.topics.length}
										<span class="hidden gap-1 sm:inline-flex">
											{#each repo.topics.slice(0, 3) as topic}
												<span class="rounded-full bg-white/5 px-2 py-0.5 text-[0.65rem]">
													{topic}
												</span>
											{/each}
										</span>
									{/if}
								</div>
							</div>

							<!-- right side buttons -->
							<div class="flex flex-shrink-0 flex-col items-start gap-2 pt-2 lg:items-end">
								<a
									href={repo.html_url}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5
									       text-xs text-neutral-100 transition-colors hover:bg-white
									       hover:text-black"
								>
									View on GitHub
									<svg width="13" height="13" viewBox="0 0 15 15" fill="none">
										<path
											d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
											fill="currentColor"
										/>
									</svg>
								</a>

								{#if repo.homepage}
									<a
										href={repo.homepage}
										target="_blank"
										rel="noopener noreferrer"
										class="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5
										       text-xs text-black shadow-sm transition hover:bg-white"
									>
										Live demo
										<span class="font-mono text-[0.65rem]">↗</span>
									</a>
								{/if}
							</div>
						</div>
					</article>
				{/each}
			</div>
		{/if}
	</div>
</section>
