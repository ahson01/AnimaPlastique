<svelte:head>
	<title>About · xkinetics.space</title>
</svelte:head>
<script>  import { revealOnScroll } from '$lib/actions/revealOnScroll';</script>

<section
	class="relative flex w-full justify-center overflow-hidden bg-[var(--bg)] text-[var(--text)]"
>
	<!-- soft background glows to make the glass pop -->
	<div class="pointer-events-none absolute inset-0 -z-10">
		<!-- top-left light glow -->
		<div
			class="absolute -top-32 -left-24 h-72 w-72 rounded-full blur-3xl opacity-25
			       bg-[radial-gradient(closest-side,var(--glow-soft),transparent)]"
		></div>

		<!-- bottom-right neutral shadow -->
		<div
			class="absolute -bottom-24 -right-24 h-96 w-96 rounded-full blur-3xl opacity-30
			       bg-[radial-gradient(closest-side,var(--glow-muted),transparent)]"
		></div>

		<!-- reddish accent gradient -->
		<div
			class="absolute bottom-0 right-0 h-[40rem] w-[40rem] translate-x-1/3 translate-y-1/3 rounded-full blur-[120px]
			       opacity-40 bg-[radial-gradient(closest-side,var(--glow-accent),transparent)]"
		></div>
	</div>

	<div class="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pt-18 pb-24 lg:pt-22">
		<!-- Different hero: more narrative, side-by-side layout -->
		<div class="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
			<!-- Left: story -->
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
						Async-friendly collaboration
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
						class="interactable inline-flex items-center justify-center rounded-full border px-6 py-2.5 text-[0.7rem]
						       uppercase tracking-[0.22em]
						       border-[var(--border-strong)] bg-[var(--text-strong)] text-[var(--bg)] shadow-sm
						       transition-all duration-200
						       hover:-translate-y-0.5 hover:shadow-lg hover:bg-[color-mix(in_oklab,var(--text-strong) 85%,white)] animate-pop-up"
					>
						Start a project
					</a>

					<a
						href="/work"
						class="interactable inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-[0.7rem]
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

			<!-- Right: process card -->
			<div
				class="grid w-full gap-4 rounded-2xl p-5 text-xs sm:text-[0.75rem]
				       border border-[var(--border)]
				       bg-[var(--card-bg-soft)] shadow-lg backdrop-blur-md"
			>
				<div
					class="flex items-baseline justify-between border-b pb-3 border-[var(--border-strong)]"
				>
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
							class="mt-[2px] flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-emerald-400/70 bg-emerald-500/10 text-[0.7rem] font-mono"
						>
							01
						</div>
						<div class="space-y-1">
							<p class="font-mono text-[0.7rem] uppercase tracking-[0.2em]">Scope & priorities</p>
							<p class="text-[var(--text-soft)]">
								Short call or async doc to define what absolutely needs to ship and what can wait.
							</p>
						</div>
					</div>

					<div class="flex items-start gap-4 animate-pop-up" style="--delay: 0.2s">
						<div
							class="mt-[2px] flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-emerald-400/70 bg-emerald-500/10 text-[0.7rem] font-mono"
						>
							02
						</div>
						<div class="space-y-1">
							<p class="font-mono text-[0.7rem] uppercase tracking-[0.2em]">Design & build loops</p>
							<p class="text-[var(--text-soft)]">
								We prototype quickly, get real feedback, and refine structure, copy, and visuals in tight
								iterations.
							</p>
						</div>
					</div>

					<div class="flex items-start gap-4 animate-pop-up" style="--delay: 0.3s">
						<div
							class="mt-[2px] flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-sky-400/70 bg-sky-500/10 text-[0.7rem] font-mono"
						>
							03
						</div>
						<div class="space-y-1">
							<p class="font-mono text-[0.7rem] uppercase tracking-[0.2em]">Launch & handover</p>
							<p class="text-[var(--text-soft)]">
								We ship, plug in analytics & SEO basics, and hand over a setup you (or your team) can
								maintain.
							</p>
						</div>
					</div>
				</div>

				<div class="mt-2 grid gap-2 rounded-xl border border-[var(--border-strong)] p-3">
					<p class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--text-muted)]">
						Best fit
					</p>
					<p class="text-[0.75rem] text-[var(--text-soft)]">
						Founders, small teams, and independent creators who want a custom site with a clear narrative —
						not just another theme with swapped colors.
					</p>
				</div>
			</div>
		</div>

		<!-- Tech stack row -->
		<div
			class="animate-pop-up mt-6 rounded-2xl border border-[var(--border)] bg-[var(--card-bg-soft)] p-5 text-xs shadow-inner backdrop-blur-md"
		>
			<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div class="space-y-1">
					<p
						class="font-mono text-[0.65rem] uppercase tracking-[0.25em]
						   bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent"
					>
						Tech stack
					</p>
					<p class="max-w-md text-[0.75rem] text-[var(--text-soft)]">
						Modern, boring-on-purpose tools — chosen for speed, maintainability, and the ability to grow
						with your product without sudden rewrites.
					</p>
				</div>

				<div class="flex flex-wrap gap-2 text-[0.65rem] text-[var(--text-muted)]">
					<span class="font-mono uppercase tracking-[0.2em]">SvelteKit</span>
					<span>·</span>
					<span class="font-mono uppercase tracking-[0.2em]">React</span>
					<span>·</span>
					<span class="font-mono uppercase tracking-[0.2em]">Tailwind</span>
					<span>·</span>
					<span class="font-mono uppercase tracking-[0.2em]">TypeScript</span>
				</div>
			</div>

			<div class="mt-5 flex flex-wrap items-center gap-4">
				<img
					src="https://skillicons.dev/icons?i=svelte,react,tailwind,ts,nodejs,vite,supabase,postgres"
					alt="Tech stack icons: Svelte, React, Tailwind, TypeScript, Node.js, Vite, Supabase, Postgres"
					class="h-10 w-auto drop-shadow-sm"
					loading="lazy"
				/>
			</div>
		</div>

		<!-- Closing text row -->
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
    <ul class="space-y-1 text-[var(--text-soft)]">
      <li>→ Clear hierarchy and thoughtful typography.</li>
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
    <ul class="space-y-1 text-[var(--text-soft)]">
      <li>→ Send a rough brief (or just a loom).</li>
      <li>→ We’ll reply with a simple plan & timeline.</li>
      <li>→ If we’re aligned, we start building within days, not months.</li>
    </ul>
  </div>
</div>
		<!-- India-based origin strip -->
		<div class="mt-6 border-t border-[var(--border-strong)] pt-6">
			<div
				class="flex flex-col items-center justify-between gap-3 text-[0.7rem] text-[var(--text-muted)] sm:flex-row"
			>
				<p class="font-mono text-[0.6rem] uppercase tracking-[0.22em]">
					Designed & built from India
				</p>

				<p class="flex items-center gap-2">
					<span
						class="inline-flex h-3 w-5 overflow-hidden rounded-sm ring-1 ring-[color-mix(in_oklab,var(--text-muted) 35%,transparent)]"
					>
						<span class="block h-full w-full">
							<span class="block h-[33.33%] w-full bg-[#FF9933]"></span>
							<span class="block h-[33.33%] w-full bg-white"></span>
							<span class="block h-[33.33%] w-full bg-[#128807]"></span>
						</span>
					</span>
					<span
						>Independent studio based in India, collaborating with teams worldwide · IST (UTC+5:30)</span
					>
				</p>
			</div>
		</div>
	</div>
</section>

<style>
	/* If you already defined these in another route, you can delete this block.
	   Otherwise this gives About its own light/dark variable theme. */

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
