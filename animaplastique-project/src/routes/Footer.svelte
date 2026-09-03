<script lang="ts">
	const year = new Date().getFullYear();

	const pages = [
		{ href: '/work', label: 'Work' },
		{ href: '/services', label: 'Services' },
		{ href: '/about', label: 'About' },
		{ href: '/contact', label: 'Contact' }
	];

	const explore = [
		{ href: '/projects', label: 'All Projects' },
		{ href: '/labs', label: 'Labs & Experiments' },
		{ href: '/studios', label: 'Studios' }
	];

	const connect = [
		{ href: 'https://x.com/xkinetics_space', label: 'X / Twitter' },
		{ href: 'https://www.instagram.com/xkinetics.space/', label: 'Instagram' },
		{ href: 'https://discord.gg/9kNaxhtHXM', label: 'Discord' },
		{ href: 'https://github.com/ahson01', label: 'GitHub' }
	];

	function scrollTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<footer class="relative isolate overflow-hidden border-t border-[var(--border)] bg-[var(--bg)] text-[var(--text)]">
	<div class="relative mx-auto w-full max-w-6xl px-6 pt-16 pb-4">
		<!-- Top: CTA + link columns -->
		<div class="grid gap-12 md:grid-cols-[1.35fr_1fr_1fr] md:gap-8">
			<div class="max-w-sm space-y-5">
				<p class="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.3em]">
					<span class="ap-live-dot inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
					<span class="text-[var(--text-muted)]">Available for new projects</span>
				</p>
				<h2 class="font-inter text-3xl font-bold leading-tight -tracking-[0.04em] text-[var(--text-strong)]">
					Let's build something worth keeping.
				</h2>
				<a
					href="/contact"
					class="interactable ap-cta-glow inline-flex items-center justify-center gap-2 rounded-full
					       border border-neutral-900/20 bg-neutral-900 px-6 py-2.5
					       font-mono text-[0.7rem] uppercase tracking-[0.22em] text-neutral-50 shadow-sm
					       transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg
					       dark:border-neutral-50/15 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-100"
				>
					Start a project <span>↗</span>
				</a>
			</div>

			<nav aria-label="Footer pages" class="space-y-3">
				<p class="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[var(--text-muted)]">Pages</p>
				<ul class="space-y-2">
					{#each pages as item}
						<li>
							<a
								href={item.href}
								class="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--text-soft)] transition-colors hover:text-[var(--text-strong)]"
							>
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<div class="grid grid-cols-2 gap-8">
				<nav aria-label="Footer explore" class="space-y-3">
					<p class="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[var(--text-muted)]">
						Explore
					</p>
					<ul class="space-y-2">
						{#each explore as item}
							<li>
								<a
									href={item.href}
									class="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--text-soft)] transition-colors hover:text-[var(--text-strong)]"
								>
									{item.label}
								</a>
							</li>
						{/each}
					</ul>
				</nav>

				<nav aria-label="Footer connect" class="space-y-3">
					<p class="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[var(--text-muted)]">
						Connect
					</p>
					<ul class="space-y-2">
						{#each connect as item}
							<li>
								<a
									href={item.href}
									target="_blank"
									rel="noreferrer"
									class="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--text-soft)] transition-colors hover:text-[var(--text-strong)]"
								>
									{item.label}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			</div>
		</div>

		<!-- Giant wordmark -->
		<div aria-hidden="true" class="pointer-events-none mt-14 select-none sm:mt-16">
			<p
				class="whitespace-nowrap font-inter font-extrabold uppercase leading-[0.9] -tracking-[0.05em] text-[var(--text-strong)]"
				style="font-size: clamp(1.9rem, 8.4vw, 6.5rem)"
			>
				XKINETICS<span>.SPACE</span>
			</p>
		</div>

		<!-- Bottom bar -->
		<div
			class="mt-12 flex flex-col gap-3 border-t border-[var(--border)] pt-6 text-[0.65rem] text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between"
		>
			<p class="font-mono uppercase tracking-[0.2em]">
				© {year} xkinetics.space · Independent studio in India · IST (UTC+5:30)
			</p>
			<button
				type="button"
				onclick={scrollTop}
				class="group inline-flex cursor-pointer items-center gap-2 self-start font-mono uppercase tracking-[0.2em] text-[var(--text-muted)] transition-colors hover:text-[var(--text-strong)] sm:self-auto"
			>
				Back to top
				<span class="transition-transform duration-200 group-hover:-translate-y-0.5">↑</span>
			</button>
		</div>
	</div>
</footer>
