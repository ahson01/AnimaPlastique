<svelte:head>
	<title>About · xkinetics.space</title>
</svelte:head>
<script>
	import { revealOnScroll } from '$lib/actions/revealOnScroll';
	import GlowBackdrop from '$lib/components/GlowBackdrop.svelte';
</script>

<section
	class="relative isolate flex w-full justify-center overflow-hidden bg-[var(--bg)] text-[var(--text)]"
>
	<GlowBackdrop />

	<div class="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pt-18 pb-24 lg:pt-22">
		<div class="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
			<div class="space-y-7">
				<p
					class="font-mono text-[0.65rem] uppercase tracking-[0.35em]
					   bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent animate-pop-up"
				>
					xkinetics.space · studio profile
				</p>

				<h1
					class="font-inter text-balance text-4xl leading-tight -tracking-[0.06em]
					       sm:text-5xl lg:text-6xl rapid-text text-[var(--text-strong)]"
				>
					<span class="reveal-line block">Small, opinionated, </span>
					<span class="reveal-line block">and obsessed </span>
					<span class="reveal-line block">with web detail.</span>
				</h1>

				<p class="max-w-xl text-sm leading-relaxed text-[var(--text-soft)]">
					xkinetics.space is a tiny web studio that likes sharp typography, fast load times, and layouts that
					actually respect your content.
				</p>

				<div class="flex flex-wrap gap-3 pt-2 text-[0.7rem]">
					<span
						class="inline-flex items-center rounded-full border px-3 py-1
						       text-[0.65rem] uppercase tracking-[0.18em]
						       border-[var(--border-strong)]
						       bg-[var(--text-strong)] text-[var(--bg)]"
					>
						Design-led builds
					</span>
					<span
						class="inline-flex items-center rounded-full border px-3 py-1
						       text-[0.65rem] uppercase tracking-[0.18em]
						       border-[var(--border)]
						       bg-[var(--chip-bg)] text-[var(--text-soft)]"
					>
						Remote-friendly collaboration
					</span>
					<span
						class="inline-flex items-center rounded-full border px-3 py-1
						       text-[0.65rem] uppercase tracking-[0.18em]
						       border-[var(--border)]
						       bg-[var(--chip-bg)] text-[var(--text-soft)]"
					>
						Launch now, iterate later
					</span>
				</div>

				<div class="flex flex-wrap items-center gap-4 pt-4">
					<a
						href="/contact"
						class="interactable ap-cta-glow inline-flex items-center justify-center rounded-full border px-6 py-2.5 text-[0.7rem]
						       uppercase tracking-[0.22em]
						       border-[var(--border-strong)] bg-[var(--text-strong)] text-[var(--bg)] shadow-sm
						       transition-all duration-200
						       hover:-translate-y-0.5 hover:shadow-lg hover:bg-[color-mix(in_oklab,var(--text-strong) 85%,white)] animate-pop-up"
					>
						Start a project
					</a>

					<a
						href="/work"
						class="interactable ap-cta-ghost inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-[0.7rem]
						       uppercase tracking-[0.22em]
						       border border-[var(--border)] bg-transparent
						       text-[var(--text-strong)]
						       transition-all duration-200
						       hover:-translate-y-0.5 hover:bg-[var(--chip-bg)] hover:text-[var(--text-strong)] hover:shadow-md animate-pop-up"
					>
						View work
						<span class="font-mono text-xs">↗</span>
					</a>
				</div>
			</div>

			<div class="space-y-5">
				<div class="flex items-baseline justify-between border-b border-[var(--border-strong)] pb-3">
					<span class="font-mono text-[0.7rem] uppercase tracking-[0.25em]">
						Working style
					</span>
					<span class="font-mono text-[0.65rem] text-[var(--text-muted)]">
						Low-friction, high-clarity
					</span>
				</div>

				<div class="space-y-3">
					<div class="flex items-start gap-4 animate-pop-up" style="--delay: 0.1s">
						<div
							class="w-7 shrink-0 pt-1 font-mono text-[0.7rem] text-emerald-700 dark:text-emerald-400"
						>
							01
						</div>
					<div class="space-y-1.5">
						<p class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--text-muted)]">Scope & priorities</p>
							<p class="text-[var(--text-soft)]">
								Short call or a quick brief to define what absolutely needs to ship and what can wait.
							</p>
						</div>
					</div>

					<div class="flex items-start gap-4 animate-pop-up" style="--delay: 0.2s">
						<div
							class="w-7 shrink-0 pt-1 font-mono text-[0.7rem] text-emerald-700 dark:text-emerald-400"
						>
							02
						</div>
						<div class="space-y-1">
							<p class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--text-muted)]">Design & build loops</p>
							<p class="text-[var(--text-soft)]">
								We prototype quickly, get real feedback, and refine structure, copy, and visuals in tight
								iterations.
							</p>
						</div>
					</div>

					<div class="flex items-start gap-4 animate-pop-up" style="--delay: 0.3s">
						<div
							class="w-7 shrink-0 pt-1 font-mono text-[0.7rem] text-sky-700 dark:text-sky-400"
						>
							03
						</div>
						<div class="space-y-1">
							<p class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--text-muted)]">Launch & handover</p>
							<p class="text-[var(--text-soft)]">
								We ship, plug in analytics & SEO basics, and hand over a setup you (or your team) can
								maintain.
							</p>
						</div>
					</div>
				</div>

				<div class="mt-2 border-l-2 border-emerald-500/60 pl-4">
					<p class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--text-muted)]">
						Best fit
					</p>
					<p class="text-[0.75rem] text-[var(--text-soft)]">
						Founders, small teams, and independent creators who want a custom site with a clear narrative,
						not just another theme with swapped colors.
					</p>
				</div>
			</div>
		</div>



<div
  class="mt-4 grid gap-8 border-t border-[var(--border-strong)] pt-10 text-xs sm:grid-cols-3 sm:text-[0.75rem]"
>
  <div
    use:revealOnScroll
    class="space-y-2 reveal-on-scroll"
    style="--delay: 0s;"
  >
    <p
      class="font-mono text-[0.65rem] uppercase tracking-[0.25em]
         bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent"
    >
      Pace & scope
    </p>
    <p class="text-[var(--text-soft)]">
      Most sites ship in 1–3 weeks with 3–10 pages. We keep scope narrow, avoid endless feature
      creep, and focus on nailing the first version.
    </p>
  </div>

  <div
    use:revealOnScroll
    class="space-y-2 reveal-on-scroll"
    style="--delay: 0.12s;"
  >
    <p
      class="font-mono text-[0.65rem] uppercase tracking-[0.25em]
         bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent"
    >
      What we care about
    </p>
    <ul class="space-y-1 text-[var(--text-soft)]">	      <li>→ Clear hierarchy and thoughtful typography.</li>
	      <li>→ Snappy performance on real devices, not just lab scores.</li>
	      <li>→ Admin experiences that aren’t a nightmare to use.</li>
    </ul>
  </div>

  <div
    use:revealOnScroll
    class="space-y-2 reveal-on-scroll"
    style="--delay: 0.24s;"
  >
    <p
      class="font-mono text-[0.65rem] uppercase tracking-[0.25em]
         bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent"
    >
      If this sounds right
    </p>
    <ul class="space-y-1 text-[var(--text-soft)]">	      <li>→ Send a rough brief (or just a loom).</li>
	      <li>→ We’ll reply with a simple plan & timeline.</li>
	      <li>→ If we’re aligned, we start building within days, not months.</li>
    </ul>
  </div>
</div>
	</div>
</section>

<style>
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
