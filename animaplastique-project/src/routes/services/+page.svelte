<svelte:head>
	<title>Services · AnimaPlastique</title>
	<meta
		name="description"
		content="Modern, fast websites and small products built with care, priced for Indian founders, students, and small teams."
	/>
</svelte:head>

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
				'A minimal, fast portfolio with sections for projects, about, and contact. No bloated templates — just focused pages that highlight real work.',
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

<section class="relative flex w-full justify-center overflow-hidden bg-[var(--bg)] text-[var(--text)]">
	<!-- Background glows -->
	<div class="pointer-events-none absolute inset-0 -z-10">
		<div
			class="absolute -top-32 -left-24 h-72 w-72 rounded-full blur-3xl opacity-50
			       bg-[radial-gradient(closest-side,var(--glow-soft),transparent)]"
		></div>

		<div
			class="absolute -bottom-24 -right-24 h-96 w-96 rounded-full blur-3xl opacity-30
			       bg-[radial-gradient(closest-side,var(--glow-muted),transparent)]"
		></div>

		<div
			class="absolute bottom-0 right-0 h-[40rem] w-[40rem] translate-x-1/3 translate-y-1/3 rounded-full blur-[120px]
			       opacity-40 bg-[radial-gradient(closest-side,var(--glow-accent),transparent)]"
		></div>
	</div>

	<div class="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pt-18 pb-24 lg:pt-22">
		<header class="space-y-4 text-center lg:text-left">
			<p
				class="font-mono text-[0.65rem] uppercase tracking-[0.35em]
				   bg-gradient-to-r from-emerald-500 to-rose-500 bg-clip-text text-transparent animate-pop-up"
			>
				Services
			</p>

			<h1
				class="font-inter text-3xl sm:text-4xl lg:text-5xl leading-tight -tracking-[0.06em] text-[var(--text-strong)] "
			>
				<span class="reveal-line block">Web work that feels sharp,</span> <br>
				<span class="reveal-line block">priced for India.</span>
				
			</h1>

			<p class="max-w-xl text-xs sm:text-sm text-[var(--text-soft)] mx-auto lg:mx-0">
				No bloated templates. No heavy stacks. Just fast, minimal, thoughtful builds.
			</p>

			<div class="mt-3">
				<a
					href="/contact"
					class="interactable inline-flex items-center justify-center rounded-full border px-6 py-2.5 text-[0.7rem]
						uppercase tracking-[0.22em]
						border-[var(--border)] bg-[var(--chip-bg)] text-[var(--text-strong)] shadow-sm
						transition-all duration-200
						hover:-translate-y-0.5 hover:shadow-md hover:bg-[var(--chip-hover)] animate-pop-up"
				>
					Start a project
				</a>
			</div>
		</header>

<section
  class="grid gap-6 md:grid-cols-2 auto-rows-[minmax(240px,auto)] md:auto-rows-[minmax(260px,auto)]"
>
  {#each services as service, i}
    <article
      style={`--delay: ${i * 0.08}s`}
      class={`animate-pop-up group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[var(--border)]
        bg-gradient-to-br from-[var(--card-bg)] to-[var(--card-bg-soft)]
        p-6 sm:p-8 shadow-sm
        transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[var(--border-strong)]
        ${i === 0 ? 'md:col-span-2 md:flex-row md:items-center gap-8' : ''}`}
    >
      <div class={`space-y-3 ${i === 0 ? 'md:max-w-md' : ''}`}>
        <p class="text-xs font-mono uppercase tracking-[0.22em] text-[var(--text-muted)]">
          {service.tagline}
        </p>
        <h2 class="text-2xl sm:text-3xl font-semibold text-[var(--text-strong)]">
          {service.name}
        </h2>
        <p class="text-sm leading-relaxed text-[var(--text-soft)]">
          {service.description}
        </p>
      </div>

      <div
        class={`mt-6 flex flex-col gap-3 text-sm text-[var(--text-soft)]
          ${i === 0 ? 'md:mt-0 md:text-right md:items-end' : ''}`}
      >
        <p class="text-[0.75rem] text-[var(--text-muted)]">
          Typical timeline: {service.eta}
        </p>

        <p class="text-[0.8rem]">{service.cta}</p>

        <a
          href="/contact"
          class="mt-2 inline-flex items-center gap-1 text-[0.75rem] font-mono uppercase tracking-[0.18em]
            text-[var(--link)] hover:text-[var(--link-hover)]"
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
		--glow-accent: rgba(255, 120, 120, 0.35);
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
		--glow-accent: rgba(220, 50, 70, 0.35);
		--glow-green: rgba(52, 211, 153, 0.22);
	}
</style>
