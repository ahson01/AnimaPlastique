<script lang="ts">
	import { revealOnScroll } from '$lib/actions/revealOnScroll';

	const serverIp = 'collection-hierarchy.gl.joinmc.link';

	let copied = false;

	async function copyIp() {
		try {
			await navigator.clipboard.writeText(serverIp);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch {
			// ignore
		}
	}

	const wikis = [
		{
			emoji: '🧪',
			name: 'Slimefun Core',
			desc: 'Tech, magic, and custom machinery.',
			href: 'https://github.com/Slimefun/Slimefun4/wiki'
		},
		{
			emoji: '🪄',
			name: 'Magic',
			desc: 'Spells, wands, and arcane abilities.',
			href: 'https://github.com/elBukkit/MagicPlugin/wiki'
		},
		{
			emoji: '⚔️',
			name: 'ValhallaMMO',
			desc: 'Skills, RPG attributes, and custom crafting.',
			href: 'https://github.com/Athlaeos/ValhallaMMO/wiki'
		}
	];

	const rules = [
		'Hacks are allowed, if you can bypass our anti-cheat and anti-Xray.',
		'Griefing builds is forbidden, but stealing loot is fair game.',
		'Keep it clean: no spawn killing, spam killing, or personal grudges.',
		'Re-engaging a fight removes your spam-kill protection.',
		'Bases can be claimed only after 3 days of owner inactivity.',
		'Leaving or losing control of a raided base forfeits your claim to it.'
	];
</script>

<svelte:head>
	<title>JeeraSMP · xkinetics studios</title>
	<meta
		name="description"
		content="JeeraSMP, a simple Minecraft RPG server. Challenging, harder than usual, no hand-holding. Join collection-hierarchy.gl.joinmc.link."
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
		<a
			href="/studios"
			class="inline-flex items-center gap-1 text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-soft)]"
		>
			<span class="font-mono text-sm">←</span>
			<span>Back to studios</span>
		</a>

		<div
			class="animate-pop-up w-1/2 overflow-hidden rounded-3xl border border-[var(--border)] shadow-lg"
		>
			<picture>
				<source srcset="/jeerasmp-banner.avif" type="image/avif" />
				<source srcset="/jeerasmp-banner.webp" type="image/webp" />
				<img
					src="/jeerasmp-banner.png"
					alt="JeeraSMP banner"
					class="aspect-[17/10] w-full max-w-md object-cover"
					loading="eager"
				/>
			</picture>
		</div>

		<div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
			<div class="max-w-2xl space-y-5">
				<div class="flex items-center gap-4">
					<picture>
						<source srcset="/jeerasmp-server-icon.avif" type="image/avif" />
						<source srcset="/jeerasmp-server-icon.webp" type="image/webp" />
						<img
							src="/jeerasmp-server-icon.png"
							alt="JeeraSMP server icon"
							class="h-16 w-16 rounded-2xl border border-[var(--border-strong)] bg-[var(--card-bg)] shadow-lg"
							loading="eager"
						/>
					</picture>
					<div>
						<p
							class="animate-pop-up bg-gradient-to-r from-emerald-400 to-green-500
							       bg-clip-text font-mono text-[0.65rem] tracking-[0.35em] text-transparent uppercase"
						>
							JeeraSMP · xkinetics studios
						</p>
						<h1
							class="font-inter text-4xl leading-tight -tracking-[0.06em] text-balance
							       text-[var(--text-strong)] sm:text-5xl"
						>
							JeeraSMP
						</h1>
					</div>
				</div>

				<p class="max-w-xl text-sm leading-relaxed text-[var(--text-soft)]">
					JeeraSMP is a simple Minecraft RPG server. It is challenging, and harder than usual.
					There are no shortcuts or hand-holding. Progression takes time and real effort. Only
					the OGs will survive.
				</p>

				<div
					class="inline-flex items-center gap-2 rounded-full border border-emerald-400/60 bg-emerald-500/10 px-4 py-1.5 text-[0.65rem] tracking-[0.2em] text-emerald-600 uppercase dark:text-emerald-400"
				>
					<span>⊹</span>
					<span>Cracked server, no premium account needed</span>
				</div>
			</div>

			<div
				class="animate-pop-up w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card-bg-soft)] p-5 text-xs shadow-lg backdrop-blur-md sm:text-[0.75rem]"
				style="--delay: 0.1s"
			>
				<div
					class="flex items-baseline justify-between border-b border-[var(--border-strong)] pb-3"
				>
					<span class="font-mono text-[0.7rem] tracking-[0.25em] uppercase"> Connect </span>
					<span class="font-mono text-[0.65rem] text-[var(--text-muted)]"> Java Edition </span>
				</div>

				<div class="mt-4 flex items-center justify-between gap-3">
					<div class="space-y-0.5">
						<span class="block font-mono tracking-[0.25em] text-[var(--text-muted)] uppercase"
							>IP Address</span
						>
						<span class="font-mono text-[0.8rem] text-[var(--text-strong)]">{serverIp}</span>
					</div>
					<button
						on:click={copyIp}
						class="interactable inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--text-strong)] bg-[var(--text-strong)] px-4 py-1.5
						       text-[0.65rem] tracking-[0.18em] text-[var(--bg)] uppercase transition-all
						       duration-200 hover:-translate-y-0.5 hover:shadow-md"
					>
						{#if copied}
							<span class="text-emerald-500 dark:text-emerald-600">✓</span> Copied
						{:else}
							Copy IP
						{/if}
					</button>
				</div>

				<div class="mt-4 grid grid-cols-2 gap-3 border-t border-[var(--border-strong)] pt-4">
					<div>
						<span class="block font-mono tracking-[0.25em] text-[var(--text-muted)] uppercase"
							>Version</span
						>
						<span class="font-mono text-[0.8rem]">26.2</span>
					</div>
					<div>
						<span class="block font-mono tracking-[0.25em] text-[var(--text-muted)] uppercase"
							>Mobile</span
						>
						<span class="font-mono text-[0.8rem]">Amethyst / Mojo</span>
					</div>
				</div>

				<p class="mt-3 text-[0.65rem] leading-relaxed text-[var(--text-muted)]">
					For mobile devices, please use the Amethyst launcher or Mojo Launcher to join. The
					Simple Voice Chat mod is recommended, but optional.
				</p>

				<p class="mt-2 border-t border-[var(--border-strong)] pt-3 text-[0.65rem] leading-relaxed text-[var(--text-muted)]">
					Cracked server, join with any launcher, no premium Minecraft account required.
				</p>
			</div>
		</div>

		<div class="flex flex-col gap-6">
			<p
				class="animate-pop-up bg-gradient-to-r from-emerald-400 to-green-500
				       bg-clip-text font-mono text-[0.65rem] tracking-[0.35em] text-transparent uppercase"
			>
				Server wikis & guides
			</p>
			<p class="max-w-xl text-sm leading-relaxed text-[var(--text-soft)]">
				Need help with plugin mechanics, recipes, or progression? Explore the wikis below.
			</p>

			<div class="grid gap-5 md:grid-cols-3">
				{#each wikis as wiki, i}
					<a
						use:revealOnScroll
						href={wiki.href}
						target="_blank"
						rel="noopener noreferrer"
						class="reveal-on-scroll group flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card-bg-soft)] p-6 shadow-sm
						       backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-lg"
						style={`--delay: ${i * 0.1}s`}
					>
						<div
							class="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/60 bg-emerald-500/10 text-base"
						>
							{wiki.emoji}
						</div>
						<div>
							<h3
								class="font-mono text-[0.75rem] tracking-[0.2em] text-[var(--text-strong)] uppercase"
							>
								{wiki.name}
							</h3>
							<p class="mt-1 text-xs leading-relaxed text-[var(--text-soft)]">{wiki.desc}</p>
						</div>
						<span
							class="mt-auto inline-flex items-center gap-1 text-[0.65rem] text-[var(--link)] transition-colors group-hover:text-[var(--link-hover)]"
						>
							Open wiki <span class="font-mono text-xs">↗</span>
						</span>
					</a>
				{/each}
			</div>
		</div>

		<div
			use:revealOnScroll
			class="reveal-on-scroll flex flex-col gap-5 rounded-3xl border border-[var(--border)] bg-[var(--card-bg-soft)] p-6 shadow-lg
			       backdrop-blur-md sm:p-10"
			style="--delay: 0.15s"
		>
			<div class="flex items-center justify-between gap-4">
				<p
					class="bg-gradient-to-r from-emerald-400 to-green-500
					       bg-clip-text font-mono text-[0.65rem] tracking-[0.35em] text-transparent uppercase"
				>
					Server rules
				</p>
				<span class="font-mono text-[0.6rem] text-[var(--text-muted)] uppercase">Read carefully</span>
			</div>

			<ul class="grid gap-3 sm:grid-cols-2">
				{#each rules as rule}
					<li class="flex items-start gap-3 text-sm leading-relaxed text-[var(--text-soft)]">
						<span class="mt-0.5 font-mono text-emerald-500">→</span>
						<span>{rule}</span>
					</li>
				{/each}
			</ul>
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
