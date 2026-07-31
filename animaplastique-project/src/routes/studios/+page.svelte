<script lang="ts">
	import { revealOnScroll } from '$lib/actions/revealOnScroll';

	const pillars = [
		{
			title: 'Mods & Plugins',
			desc: 'Custom gameplay, plugins, and mods built in-house, from Slimefun-style tech to custom mechanics.',
			mark: '⚙'
		},
		{
			title: 'Servers',
			desc: 'Self-hosted Minecraft servers with real communities, hand-picked plugins, and lore that keeps players coming back.',
			mark: '🛡'
		},
		{
			title: 'Pixel Art',
			desc: 'Hand-made textures, sprites, icons, and server branding, every pixel placed on purpose.',
			mark: '✦'
		}
	];
</script>

<svelte:head>
	<title>Studios · xkinetics.space</title>
	<meta
		name="description"
		content="xkinetics studios, the games arm of xkinetics.space. Mods, Minecraft servers, and pixel art built in-house."
	/>
</svelte:head>

<section
	class="relative flex w-full justify-center overflow-hidden bg-[var(--bg)] text-[var(--text)]"
>
	<div class="pointer-events-none absolute inset-0 -z-10">
		<div
			class="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,var(--glow-soft),transparent)] opacity-25
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

	<div class="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pt-18 pb-24 lg:pt-22">
		<div class="max-w-3xl space-y-6">
			<p
				class="animate-pop-up bg-gradient-to-r from-emerald-400 to-green-500
				       bg-clip-text font-mono text-[0.65rem] tracking-[0.35em] text-transparent uppercase"
			>
				xkinetics studios · games & servers
			</p>

			<h1
				class="rapid-text font-inter text-4xl leading-tight -tracking-[0.06em] text-balance
				       text-[var(--text-strong)] sm:text-5xl lg:text-6xl"
			>
				<span class="reveal-line block">We build worlds,</span>
				<span class="reveal-line block">mods, and servers</span>
				<span class="reveal-line block">we actually play.</span>
			</h1>

			<p class="max-w-xl text-sm leading-relaxed text-[var(--text-soft)]">
				xkinetics studios is the games arm of xkinetics.space, an extension of the site where
				games, mods, servers, and pixel art live. Everything here is built in-house and shipped
				to a real community.
			</p>
		</div>

		<div class="grid gap-6 md:grid-cols-3">
			{#each pillars as pillar, i}
				<article
					use:revealOnScroll
					class="reveal-on-scroll group flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card-bg-soft)] p-6 shadow-sm
					       backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-lg"
					style={`--delay: ${i * 0.1}s`}
				>
					<div
						class="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/60 bg-emerald-500/10 text-sm"
					>
						{pillar.mark}
					</div>
					<h2 class="font-mono text-[0.75rem] tracking-[0.25em] text-[var(--text-strong)] uppercase">
						{pillar.title}
					</h2>
					<p class="text-xs leading-relaxed text-[var(--text-soft)]">{pillar.desc}</p>
				</article>
			{/each}
		</div>

		<div
			use:revealOnScroll
			class="reveal-on-scroll grid overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card-bg-soft)] shadow-lg
			       backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl lg:grid-cols-[340px_1fr]"
			style="--delay: 0.2s"
		>
			<div class="flex items-center justify-center bg-[var(--card-bg)] p-6">
				<img
					src="/jeerasmp-banner.png"
					alt="JeeraSMP banner"
					class="aspect-[17/10] w-full max-w-[320px] rounded-2xl border border-[var(--border-strong)] shadow-md"
				/>
			</div>

			<div class="flex flex-col gap-5 p-6 sm:p-8">
				<div class="flex items-center gap-4">
					<img
						src="/jeerasmp-server-icon.png"
						alt="JeeraSMP server icon"
						class="h-14 w-14 rounded-2xl border border-[var(--border-strong)] bg-[var(--card-bg)] shadow-md"
					/>
					<div>
						<h2 class="font-inter text-2xl font-semibold text-[var(--text-strong)]">
							JeeraSMP
						</h2>
						<p class="font-mono text-[0.6rem] tracking-[0.3em] text-[var(--text-muted)] uppercase">
							Minecraft RPG server
						</p>
					</div>
				</div>

				<p class="max-w-xl text-sm leading-relaxed text-[var(--text-soft)]">
					A simple Minecraft RPG server. It is challenging, and harder than usual. There are no
					shortcuts or hand-holding. Progression takes time and real effort. Only the OGs will
					survive.
				</p>

				<div class="flex flex-wrap items-center gap-2 text-[0.65rem]">
					<span
						class="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--chip-bg)] px-3 py-1 font-mono tracking-[0.15em] text-[var(--text-soft)] uppercase"
					>
						Version 26.2
					</span>
					<span
						class="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--chip-bg)] px-3 py-1 font-mono tracking-[0.15em] text-[var(--text-soft)] uppercase"
					>
						Java
					</span>
					<span
						class="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/60 bg-emerald-500/10 px-3 py-1 font-mono tracking-[0.15em] text-emerald-600 uppercase dark:text-emerald-400"
					>
						Cracked
					</span>
				</div>

				<div
					class="flex items-center justify-between gap-3 rounded-xl border border-[var(--border-strong)] bg-[var(--chip-bg)] px-4 py-3"
				>
					<span class="font-mono text-[0.6rem] tracking-[0.2em] text-[var(--text-muted)] uppercase"
						>IP</span
					>
					<span class="truncate font-mono text-[0.75rem] text-[var(--text-strong)]"
						>collection-hierarchy.gl.joinmc.link</span
					>
				</div>

				<div class="mt-1">
					<a
						href="/studios/jeerasmp"
						class="interactable inline-flex items-center gap-2 rounded-full border border-[var(--text-strong)] bg-[var(--text-strong)] px-6 py-2.5
						       text-[0.7rem] tracking-[0.22em] text-[var(--bg)] uppercase shadow-sm
						       transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
					>
						Server page
						<span class="font-mono text-xs">→</span>
					</a>
				</div>
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
