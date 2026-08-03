<script lang="ts">
	import { revealOnScroll } from '$lib/actions/revealOnScroll';
	type Project = {
		title: string;
		image: string;
		link: string;
		description: string;
		details?: string;
		tags?: string[];
	};

	const iconSlugMap: Record<string, string> = {
		Python: 'python',
		React: 'react',
		HTML: 'html',
		CSS: 'css',
		JavaScript: 'js',
		TypeScript: 'ts',
		Django: 'django',
		Express: 'express',
		Node: 'nodejs',
		GitHub: 'github',
		'GitHub Actions': 'githubactions',
		Vercel: 'vercel',
		Docker: 'docker'
	};

	const projects: Project[] = [{ title: 'Natural Eggs Demo', image: '/natural_egg_landing_page_demo.png', link: 'https://natural-eggs-website-ahson.vercel.app/', description: 'Demo landing page for Natural Eggs client.', tags: ['Demo', 'Landing'] }];
</script>

<svelte:head>
	<title>Work · xkinetics.space</title>
</svelte:head>

<section class="relative flex w-full justify-center overflow-hidden">
	<div class="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pt-18 pb-24 lg:pt-22">
		<header class="space-y-4">
			<p
				class="animate-pop-up bg-gradient-to-r from-emerald-400 to-green-500
			   bg-clip-text font-mono text-[0.65rem] tracking-[0.35em] text-transparent uppercase"
			>
				xkinetics.space · selected work
			</p>
		</header>

		<div class="flex flex-col gap-10">
			{#if projects.length === 0}
				<div
					use:revealOnScroll
					class="reveal-on-scroll flex flex-col items-center gap-4 py-20 text-center"
					style="--delay: 0.1s"
				>
					<h2
						class="bg-gradient-to-r from-slate-100 to-slate-500 bg-clip-text text-3xl font-bold text-transparent"
					>
						We're currently booking new work
					</h2>

					<p class="max-w-md text-sm text-neutral-300">
						We partner with brands, creators, and startups to build digital experiences that look
						exceptional and feel alive. Got a project in mind?
					</p>
					<br />
					<a
						href="/contact"
						class="interactable animate-pop-up inline-flex items-center justify-center rounded-full border border-neutral-900/20 bg-neutral-900
						       px-6 py-2.5
						       text-[0.7rem] tracking-[0.22em] text-neutral-50 uppercase
						       shadow-sm transition-all
						       duration-200 hover:-translate-y-0.5 hover:bg-neutral-800
						       hover:shadow-lg focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950
						       focus-visible:outline-none dark:border-neutral-50/15 dark:bg-neutral-50
						       dark:text-neutral-900 dark:hover:border-neutral-50/30
						       dark:hover:bg-neutral-100 dark:focus-visible:ring-emerald-400/80 dark:focus-visible:ring-offset-neutral-900"
					>
						Start a project
					</a>
				</div>
			{/if}

			{#each projects as project, i}
				<a
					use:revealOnScroll
					href={project.link}
					target="_blank"
					rel="noopener noreferrer"
					style={`--delay: ${i * 0.08}s`}
					class="reveal-on-scroll group relative h-[450px] w-full overflow-hidden rounded-2xl
			       border border-white/10 bg-neutral-950/40 shadow-lg
			       backdrop-blur-md transition-all duration-500 hover:shadow-2xl"
				>
					<img
						src={project.image}
						alt={project.title}
						class="absolute inset-0 h-full w-full object-cover
				       opacity-60 brightness-[0.65]
				       transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:brightness-100"
						loading="lazy"
					/>

					<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20"></div>

					<div
						class="relative z-20 flex h-full flex-col justify-end p-10
				       text-left transition-all duration-500 group-hover:-translate-y-2"
					>
						<h2 class="text-3xl font-bold text-white drop-shadow-md">
							{project.title}
						</h2>

						<p class="mt-2 max-w-xl text-sm text-neutral-200">
							{project.description}
						</p>

						{#if project.details}
							<p class="mt-1 text-xs text-neutral-300 italic">
								{project.details}
							</p>
						{/if}

						{#if project.tags}
							<div class="mt-4 flex flex-wrap gap-2">
								{#each project.tags as tag}
									<span
										class="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1
									   text-xs text-neutral-100 backdrop-blur-sm"
									>
										{#if iconSlugMap[tag]}
											<img
												src={`https://skillicons.dev/icons?i=${iconSlugMap[tag]}`}
												alt={tag}
												class="h-4 w-4"
											/>
										{/if}
										{tag}
									</span>
								{/each}
							</div>
						{/if}

						<div
							class="mt-5 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
						>
							<div
								class="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-xs text-black
						       shadow-sm transition hover:bg-white/90"
							>
								Visit site
								<svg width="15" height="15" viewBox="0 0 15 15" fill="none">
									<path
										d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
										fill="currentColor"
									/>
								</svg>
							</div>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>
