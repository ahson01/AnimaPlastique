<script lang="ts">
	import { currency, formatPrice } from '$lib/stores/currency';
</script>

<svelte:head>
	<title>xkinetics.space</title>
</svelte:head>

<section class="relative flex w-full justify-center overflow-hidden">
	<div class="pointer-events-none absolute inset-0 -z-10">
		<div
			class="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.6),transparent)] opacity-25
		            blur-3xl dark:opacity-20"
		></div>

		<div
			class="absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgba(0,0,0,0.3),transparent)] opacity-20
		            blur-3xl dark:opacity-30"
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

				<h1
					class="font-inter rapid-text text-4xl leading-tight -tracking-[0.06em]
					       text-balance sm:text-5xl lg:text-6xl "
				>
					<span class="reveal-line" style="--delay: 0.1s">Rapidly launch modern</span><br />
					<span class="reveal-line" style="--delay: 0.2s">websites without limits-</span><br />
					<span class="reveal-line" style="--delay: 0.3s">flexible, future-ready,</span><br />
					<span class="reveal-line" style="--delay: 0.4s">and built to scale.</span>
				</h1>

				<p class="max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
					Design-driven builds, clean code, and infrastructure that won’t box you in later. From
					landing pages to full product sites, we handle the stack so you can focus on the work.
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
			<div
				class=" animate-pop-up grid w-full max-w-sm gap-4 rounded-2xl border border-black/10
				       bg-white/40 p-5 text-xs shadow-lg ring-1
				       ring-black/5 backdrop-blur-md
				       sm:text-[0.7rem] dark:border-white/10 dark:bg-white/5 dark:ring-white/5"
			>
				<div
					class="flex items-baseline justify-between border-b border-black/10 pb-3 dark:border-white/10"
				>
					<span class="font-mono text-[0.7rem] tracking-[0.25em] uppercase"> Details </span>
				</div>

				<div class="flex items-baseline justify-between">
					<span class="font-mono tracking-[0.25em] uppercase">Typical launch</span>
					<span class="font-mono text-[0.75rem]">1–2 weeks</span>
				</div>

				<div class="flex items-baseline justify-between">
					<span class="font-mono tracking-[0.25em] uppercase">Types</span>
					<span class="font-mono text-[0.75rem] text-neutral-600 dark:text-neutral-400">
						Landing pages · Full-sites
					</span>
				</div>

				<div class="flex items-baseline justify-between">
					<span class="font-mono tracking-[0.25em] uppercase">Scope sizes</span>
					<span class="font-mono text-[0.75rem] text-neutral-600 dark:text-neutral-400">
						1–10 pages (modular)
					</span>
				</div>

				<div class="flex items-baseline justify-between">
					<span class="font-mono tracking-[0.25em] uppercase">Performance</span>
					<span class="font-mono text-[0.75rem] text-neutral-600 dark:text-neutral-400">
						Fast load · SEO-ready
					</span>
				</div>

				<div class="flex items-baseline justify-between">
					<span class="font-mono tracking-[0.25em] uppercase">Rate</span>
					<span class="font-mono text-[0.75rem] text-neutral-600 dark:text-neutral-400">
						{formatPrice(550, $currency)} per page
					</span>
				</div>

				<div class="flex items-baseline justify-between">
					<span class="font-mono tracking-[0.25em] uppercase">Availability</span>
					<span class="font-mono text-[0.75rem]"> Bookings open </span>
				</div>
			</div>
		</div>

		<div
			class="mt-4 grid gap-8 border-t border-white/10 pt-10 text-xs sm:grid-cols-3 sm:text-[0.75rem]"
		>
			<div class="animate-pop-up space-y-2" style="--delay: 0.3s;">
				<p
					class="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text
				       font-mono text-[0.65rem] tracking-[0.25em] text-transparent uppercase"
				>
					Best for
				</p>
				<p class="text-neutral-600 dark:text-neutral-400">
					New launches, redesigns, and small teams that want a clean, modern site without wrestling
					with templates.
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
