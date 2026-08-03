<script lang="ts">
	type Service = {
		id: string;
		name: string;
		packageTier: string; // maps to homepage package
		price: string;
		tagline: string;
		description: string;
		eta: string;
		cta: string;
	};

	const services: Service[] = [
		{
			id: 'starter',
			name: 'Starter',
			packageTier: 'Starter package',
			// 📌 PRICING: ₹550 × 1–3 pages. Adjust if needed.
			price: 'from ₹1,650',
			tagline: 'Single-page site to ship your idea fast.',
			description:
				'Modern, scroll-based landing page with clean layout, mobile-first design, and a clear call to action. Built to look sharp on both laptops and low-end phones.',
			eta: '3–5 days',
			cta: 'Perfect for early-stage ideas, local businesses, and campaigns.'
		},
		{
			id: 'business',
			name: 'Business',
			packageTier: 'Business package',
			// 📌 PRICING: ₹550 × 5 pages. Adjust if needed.
			price: 'from ₹2,750',
			tagline: 'A proper multi-page site with SEO and analytics.',
			description:
				'Up to 6 pages with navigation, product storytelling, and structured content. Includes basic SEO setup and analytics so you can actually track what’s working.',
			eta: '7–12 days',
			cta: 'For small businesses, solo operators, and portfolio-plus sites.'
		},
		{
			id: 'custom',
			name: 'Custom',
			packageTier: 'Custom package',
			price: 'let’s talk',
			tagline: 'Larger scope, full spec, built around your needs.',
			description:
				'7–10 pages, product-style sites, or anything that doesn’t fit a template. We align on scope first, then build it right, no cutting corners to hit a fixed price.',
			eta: '2–4 weeks',
			cta: 'For teams building something serious.'
		},
		{
			id: 'care',
			name: 'Care plan',
			packageTier: 'Add-on',
			// 📌 PRICING: Set a monthly rate you’re comfortable with. Suggested: ₹500–₹1,500/mo
			price: 'from ₹500 / mo',
			tagline: 'Keep your site from going stale.',
			description:
				'Lightweight monthly support for small changes, bug fixes, and polish. Ideal once your main build is done and you want it to keep feeling fresh.',
			eta: 'Ongoing',
			cta: 'For existing sites that need steady attention.'
		}
	];
</script>

<svelte:head>
	<title>Services · xkinetics.space</title>
	<meta
		name="description"
		content="Modern, fast websites and small products built with care, priced for Indian businesses, students, and small teams."
	/>
</svelte:head>

<section
	class="relative flex w-full justify-center overflow-hidden bg-[var(--bg)] text-[var(--text)]"
>
	<div class="pointer-events-none absolute inset-0 -z-10">
		<div
			class="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,var(--glow-soft),transparent)] opacity-50
			       blur-3xl"
		></div>

		<div
			class="absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,var(--glow-muted),transparent)] opacity-30
			       blur-3xl"
		></div>

		<div
			class="absolute right-0 bottom-0 h-[40rem] w-[40rem] translate-x-1/3 translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,var(--glow-accent),transparent)]
			       opacity-40 blur-[120px]"
		></div>
	</div>

	<div class="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pt-18 pb-24 lg:pt-22">
		<header class="space-y-4 text-center lg:text-left">
			<p
				class="animate-pop-up bg-gradient-to-r from-emerald-500 to-green-500
			   bg-clip-text font-mono text-[0.65rem] tracking-[0.35em] text-transparent uppercase"
			>
			xkinetics.space · Services
			</p>

			<h1
				class="font-inter bg-[var(--text-strong)] bg-clip-text text-3xl leading-tight -tracking-[0.06em] text-transparent sm:text-4xl lg:text-5xl"
			>
				<span class="reveal-line block"><span class="bg-[var(--text-strong)] bg-clip-text">Web work that feels sharp,</span></span> <br />
				<span class="reveal-line block"><span class="bg-[var(--text-strong)] bg-clip-text">priced for India.</span></span>
			</h1>

			<p class="mx-auto max-w-xl text-xs text-[var(--text-soft)] sm:text-sm lg:mx-0">
				No bloated templates. No heavy stacks. Just fast, minimal, thoughtful builds.
			</p>

			<div class="mt-3">
				<a
					href="/contact"
					class="interactable animate-pop-up inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--chip-bg)]
						px-6 py-2.5
						text-[0.7rem] tracking-[0.22em] text-[var(--text-strong)] uppercase
						shadow-sm transition-all
						duration-200 hover:-translate-y-0.5 hover:bg-[var(--chip-hover)] hover:shadow-md"
				>
					Start a project
				</a>
			</div>
		</header>

		<section
			class="grid auto-rows-[minmax(240px,auto)] gap-6 md:auto-rows-[minmax(260px,auto)] md:grid-cols-2"
		>
			{#each services as service, i}
				<article
					style={`--delay: ${i * 0.08}s`}
					class={`animate-pop-up group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[var(--border)]
        bg-gradient-to-br from-[var(--card-bg)] to-[var(--card-bg-soft)]
        p-6 shadow-sm transition-all
        duration-300 hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-lg sm:p-8
        ${i === 0 ? 'gap-8 md:col-span-2 md:flex-row md:items-center' : ''}`}
				>
					<div class={`space-y-3 ${i === 0 ? 'md:max-w-md' : ''}`}>
						<div class="flex flex-wrap items-center gap-2">
							<p class="font-mono text-xs tracking-[0.22em] text-[var(--text-muted)] uppercase">
								{service.tagline}
							</p>
							<span
								class="rounded-full border border-emerald-500/30 bg-emerald-500/10
								       px-2 py-0.5 font-mono text-[0.6rem] tracking-[0.12em]
								       uppercase text-emerald-600 dark:text-emerald-400"
							>
								{service.packageTier}
							</span>
						</div>
						<h2 class="text-2xl font-semibold text-[var(--text-strong)] sm:text-3xl">
							{service.name}
						</h2>
						<p class="text-sm leading-relaxed text-[var(--text-soft)]">
							{service.description}
						</p>
					</div>

					<div
						class={`mt-6 flex flex-col gap-3 text-sm text-[var(--text-soft)]
          ${i === 0 ? 'md:mt-0 md:items-end md:text-right' : ''}`}
					>
						<p class="font-mono text-lg font-semibold text-[var(--text-strong)]">
							{service.price}
						</p>
						<p class="text-[0.75rem] text-[var(--text-muted)]">
							Typical timeline: {service.eta}
						</p>

						<p class="text-[0.8rem]">{service.cta}</p>

						<a
							href="/contact"
							class="mt-2 inline-flex items-center gap-1 font-mono text-[0.75rem] tracking-[0.18em] text-[var(--link)]
            uppercase hover:text-[var(--link-hover)]"
						>
							<span>Talk about this</span> <span class="text-xs">↗</span>
						</a>
					</div>

					<div
						class="pointer-events-none absolute -right-16 -bottom-16 h-40 w-40 rounded-full
          bg-[radial-gradient(circle_at_center,var(--glow-green),transparent)]
          opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					></div>
				</article>
			{/each}
		</section>

		<!-- ─── AFTER LAUNCH & TERMS SECTION ──────────────────────────── -->
		<div
			class="animate-pop-up mt-8 border-t border-[var(--border)] pt-10"
			style="--delay: 0.35s;"
		>
			<div class="space-y-6">
				<p
					class="bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text
					       font-mono text-[0.65rem] tracking-[0.25em] text-transparent uppercase"
				>
					After Launch
				</p>
				
				<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					<!-- Ownership -->
					<div class="rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--card-bg)] to-[var(--card-bg-soft)] p-6 text-xs shadow-sm space-y-2">
						<p class="font-mono text-[0.65rem] tracking-[0.25em] text-emerald-600 dark:text-emerald-400 uppercase">Ownership</p>
						<p class="font-mono text-[var(--text-soft)] leading-relaxed">
							You own 100% of the code, domain, and content from handover. No lock-in. No recurring fees are needed to keep the site running.
						</p>
					</div>

					<!-- Support -->
					<div class="rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--card-bg)] to-[var(--card-bg-soft)] p-6 text-xs shadow-sm space-y-2">
						<p class="font-mono text-[0.65rem] tracking-[0.25em] text-emerald-600 dark:text-emerald-400 uppercase">Support</p>
						<p class="font-mono text-[var(--text-soft)] leading-relaxed">
							We include 30 days of free bug fixes after launch. For ongoing support, small updates, or changes, you can use our monthly Care Plan.
						</p>
					</div>

					<!-- Handover -->
					<div class="rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--card-bg)] to-[var(--card-bg-soft)] p-6 text-xs shadow-sm space-y-2">
						<p class="font-mono text-[0.65rem] tracking-[0.25em] text-emerald-600 dark:text-emerald-400 uppercase">Handover</p>
						<p class="font-mono text-[var(--text-soft)] leading-relaxed">
							You get full source code, deployment access, and documentation. Everything is set up so the site works without us.
						</p>
					</div>

					<!-- Continuity -->
					<div class="rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--card-bg)] to-[var(--card-bg-soft)] p-6 text-xs shadow-sm space-y-2">
						<p class="font-mono text-[0.65rem] tracking-[0.25em] text-emerald-600 dark:text-emerald-400 uppercase">Continuity</p>
						<p class="font-mono text-[var(--text-soft)] leading-relaxed">
							We document and hand over everything properly. You are not stuck depending on either of us to keep the site running.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* Light theme = default */
	:global(html) {
		--bg: #ffffff;
		--text: #111827;
		--text-strong: #020617;
		--text-soft: #4b5563;
		--text-muted: #9ca3af;

		--border: #e5e7eb;
		--border-strong: #d1d5db;

		--card-bg: #ffffff;
		--card-bg-soft: #f3f4f6;

		--chip-bg: #f9fafb;
		--chip-hover: #f3f4f6;

		--link: #111827;
		--link-hover: #059669;

		--glow-soft: rgba(255, 255, 255, 0.9);
		--glow-muted: rgba(200, 200, 200, 0.4);
		--glow-accent: rgba(52, 211, 153, 0.35);
		--glow-green: rgba(52, 211, 153, 0.18);
	}

	/* Dark theme via .dark class */
	:global(html.dark) {
		--bg: #050505;
		--text: #f5f5f5;
		--text-strong: #ffffff;
		--text-soft: #d1d5db;
		--text-muted: #6b7280;

		--border: #1f2937;
		--border-strong: #374151;

		--card-bg: #0a0a0a;
		--card-bg-soft: #111111;

		--chip-bg: #0f0f0f;
		--chip-hover: #111111;

		--link: #e5e7eb;
		--link-hover: #6ee7b7;

		--glow-soft: rgba(20, 20, 20, 0.9);
		--glow-muted: rgba(15, 23, 42, 0.7);
		--glow-accent: rgba(16, 185, 129, 0.35);
		--glow-green: rgba(52, 211, 153, 0.22);
	}
</style>
