<script lang="ts">
	import { revealOnScroll } from '$lib/actions/revealOnScroll';

	const projects = [

		{
			title: 'Natural Eggs',
			subtitle: 'Landing page demo',
			link: 'https://natural-eggs-website-ahson.vercel.app/',
			image: '/natural_egg_landing_page_demo.png',
			description: 'A direct-order landing page for a local natural egg business, so buyers can skip the middleman and order straight from the farm.',
			stack: ['SvelteKit', 'Tailwind', 'Typescript', 'Vercel'],
			year: '2025',
			status: 'Demo -- live and publicly accessible',
			problem: 'Local egg businesses in India typically have no web presence. Sales happen through WhatsApp forwards, word of mouth, or physical stalls. There\'s no way for someone who finds them online to understand what\'s available, what makes the eggs different, or how to place an order without calling first.',
			approach: 'Built as a single scrolling page: hero with a strong product photo, a short "why natural" section, a simple product listing, and a direct order/contact CTA. Kept the site minimal as the audience is largely on mobile data, so load time matters more than animation. Design is warm and honest rather than corporate.',
			result: 'The demo is live and does what it says: gives a local egg business a real page to point people to. It\'s not a client project yet, it was built to show this exact use case is possible at the Starter tier.'
		},
				{
			title: 'Grocery Mart',
			subtitle: 'Demo grocery app',
			link: 'https://grocery-mart-snowy.vercel.app/',
			image: '/grocery_mart_demo.png',
			description: 'A lightning-fast grocery delivery app demo (similar to Blinkit, Instamart, or Swiggy) showcasing smooth performance, quick search, intuitive cart management, and seamless category browsing.',
			stack: ['Flutter', 'Dart', 'Tailwind CSS', 'Vercel'],
			year: '2026',
			status: 'Demo -- live and publicly accessible',
			problem: 'Instant grocery delivery web & mobile apps need to load instantly, handle thousands of products with complex categorization, and provide zero-latency animations to match native app experiences on budget devices.',
			approach: 'Built entirely on Flutter, taking advantage of its powerful rendering engine for buttery-smooth animations and instant interactions. Designed with an Instamart/Blinkit-style interface featuring a quick-add cart, search filtering, and categorized grocery shelves.',
			result: 'An incredibly responsive web application that runs flawlessly on mobile and desktop browsers alike. Demonstrates that Flutter can deliver a unified, premium native-feeling e-commerce experience from a single codebase.'
		}
	];
</script>

<svelte:head>
	<title>Work · xkinetics.space</title>
</svelte:head>

<section class="relative flex w-full justify-center overflow-hidden">
	<div class="mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 pt-18 pb-28 lg:pt-22">

		<!-- Page header -->
		<header use:revealOnScroll class="reveal-on-scroll space-y-3" style="--delay: 0s">
			<p
				class="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text
			       font-mono text-[0.65rem] tracking-[0.35em] text-transparent uppercase"
			>
				xkinetics.space · selected work
			</p>
			<h1 class="text-3xl font-bold -tracking-[0.04em] sm:text-4xl">
				Case Studies
			</h1>
			<p class="max-w-xl text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
				Real projects, honest context. Two demos so far, built to show what's possible across different frameworks and scopes.
			</p>
		</header>

		<!-- ─── PROJECT CARDS ─────────────────────────────────────────── -->
		<div class="flex flex-col gap-24">
			{#each projects as project, i}
				<article
					use:revealOnScroll
					class="reveal-on-scroll grid gap-12 lg:grid-cols-[1fr_1.6fr] border-b border-black/10 dark:border-white/10 pb-20 last:border-b-0 last:pb-0"
					style="--delay: {0.1 + i * 0.1}s"
				>
					<!-- Left column: meta -->
					<div class="space-y-8">
						<!-- Title + link -->
						<div class="space-y-2">
							<h2 class="text-2xl font-bold -tracking-[0.04em]">{project.title}</h2>
							<p class="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-neutral-500">
								{project.subtitle} · {project.year}
							</p>
							<a
								href={project.link}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30
								       bg-emerald-500/10 px-3 py-1.5 font-mono text-[0.65rem] tracking-[0.15em]
								       uppercase text-emerald-600 transition-colors hover:bg-emerald-500/20
								       dark:text-emerald-400"
							>
								View live ↗
							</a>
						</div>

						<!-- Divider -->
						<div class="border-t border-black/10 dark:border-white/10"></div>

						<!-- Tech stack -->
						<div class="space-y-3">
							<p class="font-mono text-[0.65rem] tracking-[0.25em] uppercase text-neutral-500">Tech stack</p>
							<ul class="space-y-1.5">
								{#each project.stack as tech}
									<li class="flex items-center gap-2 font-mono text-xs text-neutral-600 dark:text-neutral-400">
										<span class="text-emerald-500">→</span> {tech}
									</li>
								{/each}
							</ul>
						</div>

						<!-- Divider -->
						<div class="border-t border-black/10 dark:border-white/10"></div>

						<!-- Status -->
						<div class="space-y-1">
							<p class="font-mono text-[0.65rem] tracking-[0.25em] uppercase text-neutral-500">Status</p>
							<p class="font-mono text-xs text-neutral-600 dark:text-neutral-400">{project.status}</p>
						</div>
					</div>

					<!-- Right column: screenshot + case study text -->
					<div class="space-y-10">

						<!-- Screenshot -->
						<picture>
							<source srcset={project.image.replace('.png', '.avif')} type="image/avif" />
							<source srcset={project.image.replace('.png', '.webp')} type="image/webp" />
							<img
								src={project.image}
								alt={project.title}
								class="w-full rounded-xl border border-black/10 dark:border-white/10 object-cover shadow-2xl"
								loading="lazy"
							/>
						</picture>

						<!-- Problem -->
						<div class="space-y-3">
							<p
								class="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text
							       font-mono text-[0.65rem] tracking-[0.25em] text-transparent uppercase"
							>
								The problem
							</p>
							<p class="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
								{project.problem}
							</p>
						</div>

						<!-- Approach -->
						<div class="space-y-3">
							<p
								class="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text
							       font-mono text-[0.65rem] tracking-[0.25em] text-transparent uppercase"
							>
								Approach
							</p>
							<p class="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
								{project.approach}
							</p>
						</div>

						<!-- Result -->
						<div class="space-y-3">
							<p
								class="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text
							       font-mono text-[0.65rem] tracking-[0.25em] text-transparent uppercase"
							>
								Result
							</p>
							<p class="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
								{project.result}
							</p>
						</div>

						<!-- CTA -->
						<a
							href={project.link}
							target="_blank"
							rel="noopener noreferrer"
							class="interactable inline-flex items-center justify-center gap-2 rounded-full
							       border border-neutral-900/20 bg-neutral-900 px-6 py-2.5
							       font-mono text-[0.7rem] tracking-[0.22em] text-neutral-50 uppercase
							       shadow-sm transition-all duration-200
							       hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg
							       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70
							       dark:border-neutral-50/15 dark:bg-neutral-50 dark:text-neutral-900
							       dark:hover:bg-neutral-100"
						>
							Visit live site <span>↗</span>
						</a>
					</div>
				</article>
			{/each}
		</div>

		<!-- ─── BOOKING CTA ───────────────────────────────────────────── -->
		<div
			use:revealOnScroll
			class="reveal-on-scroll flex flex-col items-start gap-5 border-t border-black/10 dark:border-white/10 pt-16"
			style="--delay: 0.1s"
		>
			<div class="space-y-2">
				<p class="font-mono text-[0.65rem] tracking-[0.25em] uppercase text-neutral-500">
					Now booking
				</p>
				<h2 class="text-2xl font-bold -tracking-[0.04em]">
					Got a project in mind?
				</h2>
				<p class="max-w-md text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
					No agency bloat, just clean work done fast.
				</p>
			</div>
			<a
				href="/contact"
				class="interactable inline-flex items-center justify-center rounded-full
				       border border-neutral-900/20 bg-neutral-900 px-6 py-2.5
				       font-mono text-[0.7rem] tracking-[0.22em] text-neutral-50 uppercase
				       shadow-sm transition-all duration-200
				       hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg
				       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70
				       dark:border-neutral-50/15 dark:bg-neutral-50 dark:text-neutral-900
				       dark:hover:bg-neutral-100"
			>
				Start a project
			</a>
		</div>

	</div>
</section>
