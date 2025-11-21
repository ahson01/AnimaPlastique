<svelte:head>
	<title>AnimaPlastique</title>
</svelte:head>

<section class="relative flex w-full justify-center overflow-hidden">
	<!-- soft background glows to make the glass pop -->
	<div class="pointer-events-none absolute inset-0 -z-10">
		<!-- top-left light glow -->
		<div class="absolute -top-32 -left-24 h-72 w-72 rounded-full blur-3xl opacity-25
		            bg-[radial-gradient(closest-side,rgba(255,255,255,0.6),transparent)] dark:opacity-20"></div>

		<!-- bottom-right neutral shadow -->
		<div class="absolute -bottom-24 -right-24 h-96 w-96 rounded-full blur-3xl opacity-20
		            bg-[radial-gradient(closest-side,rgba(0,0,0,0.3),transparent)] dark:opacity-30"></div>

		<!-- NEW: dark reddish accent gradient -->
		<div class="absolute bottom-0 right-0 h-[40rem] w-[40rem] translate-x-1/3 translate-y-1/3 rounded-full blur-[120px]
		            opacity-40 bg-[radial-gradient(closest-side,rgba(180,30,40,0.4),transparent)]
		            dark:opacity-60 dark:bg-[radial-gradient(closest-side,rgba(220,50,60,0.35),transparent)]"></div>
	</div>

	<div class="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pt-18 pb-24 lg:pt-22">
		<!-- Top: hero row -->
		<div class="flex flex-col gap-12 lg:flex-row lg:items-center">
			<!-- Left -->
			<div class="max-w-3xl space-y-7">
				<p class="font-mono text-[0.65rem] uppercase tracking-[0.35em]
					bg-gradient-to-r from-rose-400 to-red-500  bg-clip-text text-transparent animate-pop-up">
					AnimaPlastique · web dev agency
				</p>

				<h1
					class="font-inter text-balance text-4xl leading-tight -tracking-[0.06em]
					       sm:text-5xl lg:text-6xl xl:text-7xl rapid-text "
				>
					<span class="reveal-line rapid-text">Rapidly launch modern</span>
					<span class="reveal-line rapid-text">websites without limits-</span>
					<span class="reveal-line rapid-text">flexible, future-ready,</span> 
					<span class="reveal-line rapid-text">and built to scale.</span>  
				</h1>

				<p class="max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
					Design-driven builds, clean code, and infrastructure that won’t box you in later. From landing
					pages to full product sites, we handle the stack so you can focus on the work.
				</p>

				<div class="flex flex-wrap items-center gap-4">
					<!-- Primary CTA -->
					<a
						href="/contact"
						class="interactable inline-flex items-center justify-center rounded-full border px-6 py-2.5 text-[0.7rem]
						       uppercase tracking-[0.22em]
						       border-neutral-900/20 bg-neutral-900 text-neutral-50 shadow-sm
						       transition-all duration-200
						       hover:-translate-y-0.5 hover:shadow-lg hover:bg-neutral-800
						       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950
						       dark:border-neutral-50/15 dark:bg-neutral-50 dark:text-neutral-900
						       dark:hover:bg-neutral-100 dark:hover:border-neutral-50/30
						       dark:focus-visible:ring-rose-400/80 dark:focus-visible:ring-offset-neutral-900 animate-pop-up"
					>
						Start a project
					</a>

					<!-- Secondary / Ghost CTA -->
<a
	href="/work"
	class="interactable inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-[0.7rem]
	       uppercase tracking-[0.22em]
	       border border-neutral-900/20 bg-transparent
	       text-neutral-900!
	       transition-all duration-200
	       hover:-translate-y-0.5 hover:bg-neutral-900/5 hover:text-neutral-950! hover:shadow-md
	       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50

	       dark:border-neutral-50/20 dark:bg-transparent dark:text-white!
	       dark:hover:bg-neutral-50/10 dark:hover:text-white! dark:hover:border-neutral-50/30
	       dark:focus-visible:ring-rose-400/80 dark:focus-visible:ring-offset-neutral-900 animate-pop-up"
>
	View work
	<span class="font-mono text-xs">↗</span>
</a>

				</div>
			</div>
			<div
				class=" grid w-full max-w-sm gap-4 rounded-2xl p-5 text-xs sm:text-[0.7rem]
				       border border-black/10 bg-white/40 shadow-lg backdrop-blur-md
				       ring-1 ring-black/5
				       dark:border-white/10 dark:bg-white/5 dark:ring-white/5 animate-pop-up"
			>
				<div class="flex items-baseline justify-between border-b pb-3 border-black/10 dark:border-white/10">
					<span class="font-mono text-[0.7rem] uppercase tracking-[0.25em]">
						Details
					</span>
				</div>

				<div class="flex items-baseline justify-between">
					<span class="font-mono uppercase tracking-[0.25em]">Typical launch</span>
					<span class="font-mono text-[0.75rem]">1–2 weeks</span>
				</div>

				<div class="flex items-baseline justify-between">
					<span class="font-mono uppercase tracking-[0.25em]">Types</span>
					<span class="font-mono text-[0.75rem] text-neutral-600 dark:text-neutral-400">
						Landing pages · Full-sites
					</span>
				</div>

				<div class="flex items-baseline justify-between">
					<span class="font-mono uppercase tracking-[0.25em]">Scope sizes</span>
					<span class="font-mono text-[0.75rem] text-neutral-600 dark:text-neutral-400">
						1–10 pages (modular)
					</span>
				</div>

				<div class="flex items-baseline justify-between">
					<span class="font-mono uppercase tracking-[0.25em]">Performance</span>
					<span class="font-mono text-[0.75rem] text-neutral-600 dark:text-neutral-400">
						Fast load · SEO-ready
					</span>
				</div>

				<div class="flex items-baseline justify-between">
					<span class="font-mono uppercase tracking-[0.25em]">Rate</span>
					<span class="font-mono text-[0.75rem] text-neutral-600 dark:text-neutral-400">
						₹550 per page
					</span>
				</div>

				<div class="flex items-baseline justify-between">
					<span class="font-mono uppercase tracking-[0.25em]">Availability</span>
					<span class="font-mono text-[0.75rem]">
						Bookings open
					</span>
				</div>
			</div>



			
		</div>

		<!-- Bottom: info -->
		<div
			class="mt-4 grid gap-8 border-t border-white/10 pt-10 text-xs sm:grid-cols-3 sm:text-[0.75rem] "
		>
			<div class="space-y-2 animate-pop-up" style="--delay: 0.3s;">
				<p class="font-mono text-[0.65rem] uppercase tracking-[0.25em]
					bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent">
					Best for
				</p>
				<p class="text-neutral-600 dark:text-neutral-400">
					New launches, redesigns, and small teams that want a clean, modern site without wrestling with
					templates.
				</p>
			</div>

			<div class="space-y-2 animate-pop-up" style="--delay: 0.4s;">
				<p class="font-mono text-[0.65rem] uppercase tracking-[0.25em]
					bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent">
					How it works
				</p>
				<ul class="space-y-1 text-neutral-600 dark:text-neutral-400">
					<li>→ Short call to align on goals and scope.</li>
					<li>→ We design and build in focused sprints.</li>
					<li>→ You review, refine, and we launch together.</li>
				</ul>
			</div>

			<div class="space-y-2 animate-pop-up" style="--delay: 0.5s;">
				<p class="font-mono text-[0.65rem] uppercase tracking-[0.25em]
					bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent">
					What you get
				</p>
				<ul class="space-y-1 text-neutral-600 dark:text-neutral-400">
					<li>→ A responsive, production-ready website.</li>
					<li>→ Basic analytics & SEO setup.</li>
					<li>→ Handover docs so you’re not locked in.</li>
				</ul>
			</div>
		</div>
	</div>


  <!-- Credit -->
<div class=" text-center absolute  left-10 bottom-30 opacity-60 hover:opacity-100 transition-opacity">
    <a
        href="https://github.com/ahson01"
        target="_blank"
        rel="noopener"
        class="font-mono text-[0.65rem] tracking-[0.25em] uppercase
               text-neutral-600 dark:text-neutral-400 hover:text-rose-500 dark:hover:text-rose-400"
    >
        Crafted by ahson01
    </a>
</div>
	
</section>

