<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { currency, formatPrice } from '$lib/stores/currency';

	const featuredProjects = [

		{
			title: 'Natural Eggs',
			link: 'https://natural-eggs-website-ahson.vercel.app/',
			image: '/natural_egg_landing_page_demo.png',
			desc: 'A direct-order landing page for a local natural egg business so buyers can skip the middleman and order farm-straight.'
		},
				{
			title: 'Grocery Mart',
			link: 'https://grocery-mart-snowy.vercel.app/',
			image: '/grocery_mart_demo.png',
			desc: 'A premium instant grocery delivery app built entirely on Flutter showcasing high-performance animations and interaction.'
		}
	];

	let activeIndex = 0;
	let intervalId: any;

	onMount(() => {
		startAutoPlay();
	});

	onDestroy(() => {
		stopAutoPlay();
	});

	function startAutoPlay() {
		intervalId = setInterval(() => {
			activeIndex = (activeIndex + 1) % featuredProjects.length;
		}, 4000);
	}

	function stopAutoPlay() {
		if (intervalId) {
			clearInterval(intervalId);
		}
	}
</script>

<svelte:head>
	<title>xkinetics.space</title>
</svelte:head>

<section class="relative flex w-full justify-center overflow-hidden">
	<div class="pointer-events-none absolute inset-0 -z-10">
		<div
			class="absolute -top-32 -left-24 h-72 w-72 rounded-full
			        opacity-30 blur-3xl
			        bg-[radial-gradient(closest-side,rgba(16,185,129,0.15),transparent)]
			        dark:bg-[radial-gradient(closest-side,rgba(255,255,255,0.6),transparent)] dark:opacity-20"
		></div>

		<div
			class="absolute -right-24 -bottom-24 h-96 w-96 rounded-full
			        opacity-20 blur-3xl
			        bg-[radial-gradient(closest-side,rgba(0,0,0,0.08),transparent)]
			        dark:bg-[radial-gradient(closest-side,rgba(0,0,0,0.3),transparent)] dark:opacity-30"
		></div>

		<div
			class="absolute right-0 bottom-0 h-[40rem] w-[40rem] translate-x-1/3 translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.4),transparent)]
		            opacity-40 blur-[120px]
		            dark:bg-[radial-gradient(closest-side,rgba(16,185,129,0.35),transparent)] dark:opacity-60"
		></div>
	</div>

	<div class="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pt-18 pb-24 lg:pt-22">
		<div class="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
			<div class="max-w-2xl space-y-7">
				<p
					class="animate-pop-up bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text
				       font-mono text-[0.65rem] tracking-[0.35em] text-transparent uppercase"
				>
					xkinetics.space · web dev agency
				</p>

				<!--
					📌 HEADLINE OPTION CHOSEN: Option A
					Option B: "Templates won't cut it. / Freelancers ghost you. / We build real sites for / founders and small businesses."
					Option C: "The site your / business actually deserves. / Custom-built for founders, / creators, and small teams."
				-->
				<h1
					class="font-inter rapid-text text-4xl leading-tight -tracking-[0.06em]
					       text-balance sm:text-5xl lg:text-6xl"
				>
					<span class="reveal-line" style="--delay: 0.1s">Your site should be</span><br />
					<span class="reveal-line" style="--delay: 0.2s">live by next week.</span><br />
					<span class="reveal-line" style="--delay: 0.3s">Not next quarter.</span>
				</h1>

				<p class="max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
					Built for small businesses, solo founders, and creators who need a real site fast.
					No template wrestling. No waiting on a freelancer to reply. Clean code, shipped on time.
				</p>

				<div class="flex flex-wrap items-center gap-4">
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

					<a
						href="/work"
						class="interactable animate-pop-up inline-flex items-center justify-center gap-2 rounded-full border border-neutral-900/20
	       bg-transparent px-4
	       py-2 text-[0.7rem] tracking-[0.22em]
	       text-neutral-900!
	       uppercase transition-all
	       duration-200 hover:-translate-y-0.5 hover:bg-neutral-900/5 hover:text-neutral-950!
	       hover:shadow-md focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50

	       focus-visible:outline-none dark:border-neutral-50/20 dark:bg-transparent
	       dark:text-white! dark:hover:border-neutral-50/30 dark:hover:bg-neutral-50/10
	       dark:hover:text-white! dark:focus-visible:ring-emerald-400/80 dark:focus-visible:ring-offset-neutral-900"
					>
						View work
						<span class="font-mono text-xs">↗</span>
					</a>
				</div>
			</div>

			<!-- ─── PRICING PACKAGES CARD ──────────────────────────────── -->
			<div
				class="animate-pop-up grid w-full max-w-sm gap-4 rounded-2xl border border-black/10
				       bg-[#f5f5f0]/70 p-5 text-xs shadow-lg ring-1
				       ring-black/5 backdrop-blur-md
				       sm:text-[0.7rem] dark:border-white/10 dark:bg-white/5 dark:ring-white/5"
			>
				<div class="flex items-baseline justify-between border-b border-black/10 pb-3 dark:border-white/10">
					<span class="font-mono text-[0.7rem] tracking-[0.25em] uppercase">Packages</span>
				</div>

				<!-- Starter -->
				<div class="space-y-0.5">
					<div class="flex items-baseline justify-between">
						<span class="font-mono tracking-[0.2em] uppercase">Starter</span>
						<!--
							📌 PRICING: ₹550 × 3 pages = ₹1,650 starting.
							Adjust the number below if you want a different entry price.
						-->
						<span class="font-mono text-[0.75rem]">from {formatPrice(1650, $currency)}</span>
					</div>
					<p class="font-mono text-[0.62rem] tracking-[0.1em] text-neutral-500 dark:text-neutral-500">
						1–3 pages · responsive · fast delivery
					</p>
				</div>

				<!-- Business -->
				<div class="space-y-0.5">
					<div class="flex items-baseline justify-between">
						<span class="font-mono tracking-[0.2em] uppercase">Business</span>
						<!--
							📌 PRICING: ₹550 × 5 pages = ₹2,750 starting.
							Adjust below if needed.
						-->
						<span class="font-mono text-[0.75rem]">from {formatPrice(2750, $currency)}</span>
					</div>
					<p class="font-mono text-[0.62rem] tracking-[0.1em] text-neutral-500 dark:text-neutral-500">
						up to 6 pages · SEO + analytics setup
					</p>
				</div>

				<!-- Custom -->
				<div class="space-y-0.5">
					<div class="flex items-baseline justify-between">
						<span class="font-mono tracking-[0.2em] uppercase">Custom</span>
						<span class="font-mono text-[0.75rem] text-emerald-600 dark:text-emerald-400">let's talk</span>
					</div>
					<p class="font-mono text-[0.62rem] tracking-[0.1em] text-neutral-500 dark:text-neutral-500">
						7–10 pages · product sites · full scope
					</p>
				</div>

				<div class="border-t border-black/10 pt-3 dark:border-white/10 space-y-2">
					<div class="flex items-baseline justify-between">
						<span class="font-mono tracking-[0.25em] uppercase">Typical launch</span>
						<span class="font-mono text-[0.75rem]">1–2 weeks</span>
					</div>
					<div class="flex items-baseline justify-between">
						<span class="font-mono tracking-[0.25em] uppercase">Availability</span>
						<span class="font-mono text-[0.75rem] text-emerald-600 dark:text-emerald-400">Now booking</span>
					</div>
				</div>
			</div>
		</div>

		<!-- ─── PROOF / CREDIBILITY SECTION ───────────────────────────── -->
		<div
			class="animate-pop-up grid gap-8 border-t border-black/10 pt-10 lg:grid-cols-2 dark:border-white/10"
			style="--delay: 0.2s"
		>
			<!-- Featured Work callout -->
			<div class="space-y-4">
				<p
					class="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text
				       font-mono text-[0.65rem] tracking-[0.25em] text-transparent uppercase"
				>
					Featured Work
				</p>

				<!-- Autoplay slider container -->
				<div 
					class="relative overflow-hidden rounded-xl border border-black/10 bg-[#f5f5f0] dark:border-white/10 dark:bg-neutral-950/30 h-[280px] group"
					role="region"
					aria-label="Featured projects carousel"
					on:mouseenter={stopAutoPlay}
					on:mouseleave={startAutoPlay}
				>
					<!-- Slides Wrapper -->
					<div class="flex transition-transform duration-700 ease-in-out h-full" style="transform: translateX(-{activeIndex * 100}%)">
						{#each featuredProjects as project}
							<div class="w-full flex-shrink-0 flex flex-col h-full">
								<img
									src={project.image}
									alt={project.title}
									class="h-36 w-full object-cover"
								/>

								<div class="p-4 flex-grow flex flex-col justify-between space-y-1">
									<div class="space-y-1">
										<div class="flex items-center justify-between">
											<h3 class="font-mono text-xs font-semibold tracking-[0.15em] uppercase">{project.title}</h3>
											<span class="font-mono text-xs text-neutral-500 group-hover:text-emerald-400 transition-colors">↗</span>
										</div>
										<p class="text-[0.7rem] leading-relaxed text-neutral-500 dark:text-neutral-400">
											{project.desc}
										</p>
									</div>
									<a
										href={project.link}
										target="_blank"
										rel="noopener noreferrer"
										class="inline-block font-mono text-[0.6rem] tracking-[0.2em] uppercase
										       text-emerald-500 hover:text-emerald-400 transition-colors pt-2"
									>
										View live →
									</a>
								</div>
							</div>
						{/each}
					</div>

					<!-- Navigation Dots -->
					<div class="absolute bottom-3 right-4 flex gap-1.5 z-10">
						{#each featuredProjects as _, idx}
							<button
								class="h-1.5 rounded-full transition-all duration-300 {idx === activeIndex ? 'w-4 bg-emerald-500' : 'w-1.5 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400'}"
								on:click={() => activeIndex = idx}
								aria-label="Go to slide {idx + 1}"
							></button>
						{/each}
					</div>
				</div>
			</div>

			<!-- Founder blurb + availability -->
			<div class="space-y-6">
				<div class="space-y-3">
					<p
						class="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text
					       font-mono text-[0.65rem] tracking-[0.25em] text-transparent uppercase"
					>
						Who's building this
					</p>
					<!--
						📌 FOUNDER BIO PLACEHOLDER:
						Replace the paragraph below with 2–3 honest, personal sentences.
						Not corporate-speak. Something like:
						"I'm [Name], a [city]-based developer who started xkinetics.space because
						[honest reason]. I believe [something you actually care about]."
					-->
					<p class="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
						Founders @ xkinetics. We believe your business deserves better than a copy-paste website. As a two-person team, we handcraft custom, lightning-fast web experiences from the ground up. Websites that are built with care.
						<br>
						<br>
						- Ahson01 & Hammad 
					
					</p>
				</div>

				<div class="flex flex-wrap gap-3">
					<span
						class="inline-flex items-center gap-2 rounded-full border border-emerald-500/30
						       bg-emerald-500/10 px-4 py-2 font-mono text-[0.65rem] tracking-[0.12em]
						       uppercase text-emerald-600 dark:text-emerald-400"
					>
						<span class="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
						Now booking
					</span>
				</div>
			</div>
		</div>

		<div
			class="mt-4 grid gap-8 border-t border-black/10 pt-10 text-xs sm:grid-cols-3 sm:text-[0.75rem] dark:border-white/10"
		>
			<div class="animate-pop-up space-y-2" style="--delay: 0.3s;">
				<p
					class="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text
				       font-mono text-[0.65rem] tracking-[0.25em] text-transparent uppercase"
				>
					Best for
				</p>
				<p class="text-neutral-600 dark:text-neutral-400">
					Small businesses, solo founders, and creators who need a clean modern site without
					wrestling with templates or chasing unreliable freelancers.
				</p>
			</div>

			<div class="animate-pop-up space-y-2" style="--delay: 0.4s;">
				<p
					class="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text
				       font-mono text-[0.65rem] tracking-[0.25em] text-transparent uppercase"
				>
					How it works
				</p>
				<ul class="space-y-1 text-neutral-600 dark:text-neutral-400">
					<li>→ Short call to align on goals and scope.</li>
					<li>→ We design and build in focused sprints.</li>
					<li>→ You review, refine, and we launch together.</li>
				</ul>
			</div>

			<div class="animate-pop-up space-y-2" style="--delay: 0.5s;">
				<p
					class="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text
				       font-mono text-[0.65rem] tracking-[0.25em] text-transparent uppercase"
				>
					What you get
				</p>
				<ul class="space-y-1 text-neutral-600 dark:text-neutral-400">
					<li>→ A responsive, production-ready website.</li>
					<li>→ Basic analytics & SEO setup.</li>
					<li>→ Handover docs so you’re not locked in.</li>
				</ul>
			</div>
		</div>

		<!-- ─── AFTER LAUNCH & TERMS SECTION ──────────────────────────── -->
		<div
			class="animate-pop-up mt-4 grid gap-8 border-t border-black/10 pt-10 dark:border-white/10"
			style="--delay: 0.6s;"
		>
			<div class="space-y-6">
				<p
					class="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text
					       font-mono text-[0.65rem] tracking-[0.25em] text-transparent uppercase"
				>
					After Launch
				</p>
				
				<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					<!-- Ownership -->
					<div class="rounded-2xl border border-black/10 bg-[#f5f5f0]/70 p-5 text-xs shadow-sm dark:border-white/10 dark:bg-white/5 space-y-2">
						<p class="font-mono text-[0.65rem] tracking-[0.25em] text-emerald-600 dark:text-emerald-400 uppercase">Ownership</p>
						<p class="font-mono text-neutral-600 dark:text-neutral-400 leading-relaxed">
							You own 100% of the code, domain, and content from handover. No lock-in. No recurring fees are needed to keep the site running.
						</p>
					</div>

					<!-- Support -->
					<div class="rounded-2xl border border-black/10 bg-[#f5f5f0]/70 p-5 text-xs shadow-sm dark:border-white/10 dark:bg-white/5 space-y-2">
						<p class="font-mono text-[0.65rem] tracking-[0.25em] text-emerald-600 dark:text-emerald-400 uppercase">Support</p>
						<p class="font-mono text-neutral-600 dark:text-neutral-400 leading-relaxed">
							We include [X] days of free bug fixes after launch. For ongoing support, small updates, or changes, you can use our monthly Care Plan.
						</p>
					</div>

					<!-- Handover -->
					<div class="rounded-2xl border border-black/10 bg-[#f5f5f0]/70 p-5 text-xs shadow-sm dark:border-white/10 dark:bg-white/5 space-y-2">
						<p class="font-mono text-[0.65rem] tracking-[0.25em] text-emerald-600 dark:text-emerald-400 uppercase">Handover</p>
						<p class="font-mono text-neutral-600 dark:text-neutral-400 leading-relaxed">
							You get full source code, deployment access, and documentation. Everything is set up so the site works without us.
						</p>
					</div>

					<!-- Continuity -->
					<div class="rounded-2xl border border-black/10 bg-[#f5f5f0]/70 p-5 text-xs shadow-sm dark:border-white/10 dark:bg-white/5 space-y-2">
						<p class="font-mono text-[0.65rem] tracking-[0.25em] text-emerald-600 dark:text-emerald-400 uppercase">Continuity</p>
						<p class="font-mono text-neutral-600 dark:text-neutral-400 leading-relaxed">
							We document and hand over everything properly. You are not stuck depending on either of us to keep the site running.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="absolute bottom-6 left-6 opacity-40 transition-all hover:opacity-100">
		<a
			href="https://github.com/ahson01"
			target="_blank"
			rel="noopener"
			class="font-mono text-[0.6rem] tracking-[0.2em] text-[var(--text-muted)]
               uppercase transition-colors hover:text-emerald-500 dark:hover:text-emerald-400"
		>
			Built by ahson01 and hammad
		</a>
	</div>
</section>
