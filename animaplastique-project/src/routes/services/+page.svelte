<script lang="ts">
	type Service = {
		id: string;
		name: string;
		tagline: string;
		description: string;
		eta: string;
		cta: string;
	};

	const services: Service[] = [
		{
			id: 'landing',
			name: 'Launch landing',
			tagline: 'Single-page site to ship your idea fast.',
			description:
				'Modern, scroll-based landing page with clean layout, mobile-first design, and a clear call to action. Built to look sharp on both laptops and low-end phones.',
			eta: '3–5 days',
			cta: 'Perfect for early-stage ideas and campaigns.'
		},
		{
			id: 'portfolio',
			name: 'Portfolio / personal site',
			tagline: 'Make your work look as serious as you are.',
			description:
				'A minimal, fast portfolio with sections for projects, about, and contact. No bloated templates, just focused pages that highlight real work.',
			eta: '5–7 days',
			cta: 'Great for students, developers, designers and job hunters.'
		},
		{
			id: 'multi',
			name: 'Mini product site',
			tagline: 'A small but serious web presence.',
			description:
				'A structured multi-page site with navigation, pricing, and product storytelling. Built for clarity first, with performance baked in.',
			eta: '7–12 days',
			cta: 'Perfect for small businesses and SaaS-style tools.'
		},
		{
			id: 'care',
			name: 'Care plan',
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
		content="Modern, fast websites and small products built with care, priced for Indian founders, students, and small teams."
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
						<p class="font-mono text-xs tracking-[0.22em] text-[var(--text-muted)] uppercase">
							{service.tagline}
						</p>
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
