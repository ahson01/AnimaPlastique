<svelte:head>
	<title>Work · AnimaPlastique</title>
</svelte:head>

<script lang="ts">
	type Project = {
		title: string;
		image: string;
		link: string;
		description: string;
		details?: string;
		tags?: string[];
	};

	// Map display tag -> skillicons slug
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

	const projects: Project[] = [

		{
			title: 'My Portfolio Site',
			image:
				'https://github.com/ahson01/notes/blob/main/img/portfolio.png?raw=true',
			link: 'https://ahson01.github.io/',
			description: 'This is a portfolio site for my github account @ahson01',
			tags: ['react', 'ts', 'vercel']
		}
	];

</script>

<section class="relative flex w-full justify-center overflow-hidden">


	<div class="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pt-18 pb-24 lg:pt-22">
		<!-- Header -->
		<header class="space-y-4">
			<p
				class="font-mono text-[0.65rem] uppercase tracking-[0.35em]
				   bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent"
			>
				AnimaPlastique · selected work
			</p>


		</header>

<!-- PROJECTS: full-width cinematic cards -->
<div class="flex flex-col gap-10">
	{#each projects as project}
		<a
			href={project.link}
			target="_blank"
			rel="noopener noreferrer"
			class="group relative w-full h-[450px] overflow-hidden rounded-2xl 
			       border border-white/10 bg-neutral-950/40 backdrop-blur-md
			       shadow-lg transition-all duration-500 hover:shadow-2xl"
		>
			<!-- background image -->
			<img
				src={project.image}
				alt={project.title}
				class="absolute inset-0 w-full h-full object-cover 
				       opacity-60 brightness-[0.65]
				       transition-all duration-500 group-hover:opacity-100 group-hover:brightness-100 group-hover:scale-105"
				loading="lazy"
			/>

			<!-- overlay gradient -->
			<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20"></div>

			<!-- content -->
			<div
				class="relative z-20 flex flex-col justify-end h-full p-10 
				       text-left transition-all duration-500 group-hover:-translate-y-2"
			>
				<h2 class="text-3xl font-bold text-white drop-shadow-md">
					{project.title}
				</h2>

				<p class="mt-2 max-w-xl text-sm text-neutral-200">
					{project.description}
				</p>

				{#if project.details}
					<p class="mt-1 text-xs italic text-neutral-300">
						{project.details}
					</p>
				{/if}

				<!-- tags -->
				{#if project.tags}
					<div class="flex flex-wrap gap-2 mt-4">
						{#each project.tags as tag}
							<span
								class="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full 
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

				<!-- visit button -->
				<div class="mt-5 opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
					<div
						class="inline-flex items-center gap-2 rounded-lg bg-white text-black px-3 py-1.5 text-xs 
						       shadow-sm hover:bg-white/90 transition"
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
