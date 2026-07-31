<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { page } from '$app/stores';

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/work', label: 'Work' },
		{ href: '/services', label: 'Services' },
		{ href: '/about', label: 'About' },
		{ href: '/contact', label: 'Contact' }
	];

	const projectLinks = [
		{ href: '/projects', label: 'All Projects' },
		{ href: '/labs', label: 'Labs & Experiments' }
	];

	const communityLinks = [
		{
			href: 'https://discord.gg/9kNaxhtHXM',
			label: 'Discord',
			external: true
		}
	];

	const studiosLinks = [{ href: '/studios', label: 'xkinetics studios' }];

	const toolLinks = [
		{ href: '/tools/file-converter', label: 'File Converter' },
		{ href: '/tools/image-compressor', label: 'Image Compressor' },
		{ href: '/tools/json-formatter', label: 'JSON Formatter' },
		{ href: '/tools/color-palette', label: 'Color Palette' },
		{ href: '/tools/meta-preview', label: 'Meta Preview' },
		{ href: '/tools/exif-insight', label: 'Exif Insight' },
		{ href: '/tools/qr-code-studio', label: 'QR Code Studio' }
	];

	let theme: 'dark' | 'light' = 'dark';
	let isMenuOpen = false;

	function setTheme(value: 'dark' | 'light') {
		theme = value;
		document.documentElement.classList.toggle('dark', value === 'dark');
		localStorage.setItem('theme', value);
	}

	function toggleTheme() {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	}

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	let navEl: HTMLUListElement | null = null;
	let underlineLeft = 0;
	let underlineWidth = 0;

	function moveUnderlineTo(el: HTMLAnchorElement | null) {
		if (!el || !navEl) return;

		const parentRect = navEl.getBoundingClientRect();
		const rect = el.getBoundingClientRect();

		underlineLeft = rect.left - parentRect.left;
		underlineWidth = rect.width;
	}

	function handleHover(event: MouseEvent) {
		const el = (event.currentTarget as HTMLElement).closest('a') as HTMLAnchorElement | null;
		if (!el || !el.dataset.navRoot) return;
		moveUnderlineTo(el);
	}

	function handleNavClick(event: MouseEvent) {
		const el = (event.currentTarget as HTMLElement).closest('a') as HTMLAnchorElement | null;
		if (!el || !el.dataset.navRoot) return;
		moveUnderlineTo(el);
	}

	function getActiveAnchor(path: string): HTMLAnchorElement | null {
		if (!navEl) return null;

		if (path.startsWith('/projects') || path.startsWith('/labs')) {
			return navEl.querySelector('a[data-nav-root="projects"]') as HTMLAnchorElement | null;
		}

		if (path.startsWith('/studios')) {
			return navEl.querySelector('a[data-nav-root="studios"]') as HTMLAnchorElement | null;
		}

		if (path.startsWith('/community')) {
			return navEl.querySelector('a[data-nav-root="community"]') as HTMLAnchorElement | null;
		}

		if (path.startsWith('/tools')) {
			return navEl.querySelector('a[data-nav-root="tools"]') as HTMLAnchorElement | null;
		}

		const el = navEl.querySelector(
			`a[href="${path}"][data-nav-root="primary"]`
		) as HTMLAnchorElement | null;
		if (el) return el;

		return null;
	}

	function resetUnderline() {
		const active = getActiveAnchor(currentPath);
		if (active) {
			moveUnderlineTo(active);
		} else {
			underlineWidth = 0;
		}
	}

	$: currentPath = $page.url.pathname;

	$: (async () => {
		if (!navEl) return;
		await tick();
		const active = getActiveAnchor(currentPath);

		if (active) {
			moveUnderlineTo(active);
		} else {
			underlineWidth = 0;
		}

		isMenuOpen = false;
	})();

	onMount(async () => {
		const stored = localStorage.getItem('theme');
		setTheme(stored === 'light' ? 'light' : 'dark');

		await tick();
		const active = getActiveAnchor(currentPath);
		if (active) {
			moveUnderlineTo(active);
		} else {
			underlineWidth = 0;
		}
	});
</script>

<header class="ap-shell bg-[var(--bg)] text-[var(--text)]">
	<div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
		<a href="/" class="flex flex-col gap-0.5 no-underline">
			<span
				class="font-mono text-xs font-semibold tracking-[0.25em] text-[var(--text-strong)] uppercase"
			>
				xkinetics.space
			</span>
			<span class="font-mono text-[0.6rem] tracking-[0.3em] text-[var(--text-muted)] uppercase">
				web dev & community
			</span>
		</a>

		<div class="flex items-center gap-4">
			<nav aria-label="Main" class="hidden md:block">
				<ul
					bind:this={navEl}
					on:mouseleave={resetUnderline}
					class="relative flex items-center gap-6 text-[0.7rem] tracking-[0.25em] uppercase"
				>
					{#if underlineWidth > 0}
						<div
							class="pointer-events-none absolute bottom-0 h-[2px] rounded-full bg-[var(--text-strong)] transition-all duration-300 ease-out"
							style={`left:${underlineLeft}px; width:${underlineWidth}px;`}
						></div>
					{/if}

					{#each links as link}
						<li class="relative pb-1">
							<a
								href={link.href}
								aria-current={currentPath === link.href ? 'page' : undefined}
								class="ap-nav-link text-[var(--text-soft)]"
								data-nav-root="primary"
								on:mouseenter={handleHover}
								on:click={handleNavClick}
							>
								{link.label}
							</a>
						</li>
					{/each}

					<li class="group relative pb-1">
						<button
							type="button"
							aria-current={currentPath.startsWith('/projects') || currentPath.startsWith('/labs')
								? 'page'
								: undefined}
							class="ap-nav-link mt-1 flex cursor-pointer appearance-none items-center gap-1 border-none bg-transparent text-[var(--text-soft)]"
							data-nav-root="projects"
							on:mouseenter={handleHover}
							on:click={handleNavClick}
						>
							Projects
							<span class="translate-y-[0.5px] text-[0.5rem]">▾</span>
						</button>

						<div
							class="pointer-events-none absolute top-full left-0 w-48 translate-y-1 rounded-xl border border-[var(--border)] bg-[var(--card-bg-soft)] p-2 text-[0.65rem] opacity-0 shadow-lg backdrop-blur-sm transition-all duration-150 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100"
						>
							{#each projectLinks as item}
								<a
									href={item.href}
									class="ap-nav-link block rounded-md px-3 py-1.5 text-[0.65rem] tracking-[0.2em] text-[var(--text-soft)] uppercase hover:text-[var(--text-strong)]"
								>
									{item.label}
								</a>
							{/each}
						</div>
					</li>

					<li class="group relative pb-1">
						<button
							type="button"
							aria-current={currentPath.startsWith('/community') ? 'page' : undefined}
							class="ap-nav-link mt-1 flex cursor-pointer appearance-none items-center gap-1 border-none bg-transparent text-[var(--text-soft)]"
							data-nav-root="community"
							on:mouseenter={handleHover}
							on:click={handleNavClick}
						>
							Community
							<span class="translate-y-[0.5px] text-[0.5rem]">▾</span>
						</button>

						<div
							class="pointer-events-none absolute top-full left-0 w-56 translate-y-1 rounded-xl border border-[var(--border)] bg-[var(--card-bg-soft)] p-2 text-[0.65rem] opacity-0 shadow-lg backdrop-blur-sm transition-all duration-150 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100"
						>
							{#each communityLinks as item}
								{#if item.external}
									<a
										href={item.href}
										target="_blank"
										rel="noreferrer"
										class="ap-nav-link block rounded-md px-3 py-1.5 text-[0.65rem] tracking-[0.2em] text-[var(--text-soft)] uppercase hover:text-[var(--text-strong)]"
									>
										{item.label}
									</a>
								{:else}
									<a
										href={item.href}
										class="ap-nav-link block rounded-md px-3 py-1.5 text-[0.65rem] tracking-[0.2em] text-[var(--text-soft)] uppercase hover:text-[var(--text-strong)]"
									>
										{item.label}
									</a>
								{/if}
							{/each}
						</div>
					</li>

					<li class="group relative pb-1">
						<button
							type="button"
							aria-current={currentPath.startsWith('/studios') ? 'page' : undefined}
							class="ap-nav-link mt-1 flex cursor-pointer appearance-none items-center gap-1 border-none bg-transparent text-[var(--text-soft)]"
							data-nav-root="studios"
							on:mouseenter={handleHover}
							on:click={handleNavClick}
						>
							Studios
							<span class="translate-y-[0.5px] text-[0.5rem]">▾</span>
						</button>

						<div
							class="pointer-events-none absolute top-full left-0 w-56 translate-y-1 rounded-xl border border-[var(--border)] bg-[var(--card-bg-soft)] p-2 text-[0.65rem] opacity-0 shadow-lg backdrop-blur-sm transition-all duration-150 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100"
						>
							{#each studiosLinks as item}
								<a
									href={item.href}
									class="ap-nav-link block rounded-md px-3 py-1.5 text-[0.65rem] tracking-[0.2em] text-[var(--text-soft)] uppercase hover:text-[var(--text-strong)]"
								>
									{item.label}
								</a>
							{/each}
						</div>
					</li>

					<li class="group relative pb-1">
						<button
							type="button"
							aria-current={currentPath.startsWith('/tools') ? 'page' : undefined}
							class="ap-nav-link mt-1 flex cursor-pointer appearance-none items-center gap-1 border-none bg-transparent text-[var(--text-soft)]"
							data-nav-root="tools"
							on:mouseenter={handleHover}
							on:click={handleNavClick}
						>
							Tools
							<span class="translate-y-[0.5px] text-[0.5rem]">▾</span>
						</button>

						<div
							class="pointer-events-none absolute top-full left-0 w-48 translate-y-1 rounded-xl border border-[var(--border)] bg-[var(--card-bg-soft)] p-2 text-[0.65rem] opacity-0 shadow-lg backdrop-blur-sm transition-all duration-150 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100"
						>
							{#each toolLinks as item}
								<a
									href={item.href}
									class="ap-nav-link block rounded-md px-3 py-1.5 text-[0.65rem] tracking-[0.2em] text-[var(--text-soft)] uppercase hover:text-[var(--text-strong)]"
								>
									{item.label}
								</a>
							{/each}
						</div>
					</li>
				</ul>
			</nav>

			<button
				on:click={toggleTheme}
				class="ap-toggle"
				aria-label="Toggle dark mode"
				aria-pressed={theme === 'dark'}
			>
				<span class={`ap-toggle-knob ${theme === 'dark' ? 'translate-x-5' : 'translate-x-0'}`}>
					{theme === 'dark' ? '●' : '○'}
				</span>
			</button>

			<button
				type="button"
				class="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] text-xs md:hidden"
				on:click={toggleMenu}
				aria-label="Toggle navigation menu"
				aria-expanded={isMenuOpen}
			>
				{#if isMenuOpen}
					✕
				{:else}
					☰
				{/if}
			</button>
		</div>
	</div>

	{#if isMenuOpen}
		<nav
			aria-label="Mobile main"
			class="h-screen bg-[var(--bg)] px-6 pb-6 text-[var(--text)] md:hidden"
		>
			<ul class="flex flex-col gap-2 text-[0.7rem] tracking-[0.25em] uppercase">
				{#each links as link}
					<li>
						<a
							href={link.href}
							aria-current={currentPath === link.href ? 'page' : undefined}
							class="ap-nav-link flex items-center py-1.5 text-[var(--text-soft)]"
						>
							{link.label}
						</a>
					</li>
				{/each}

				<li class="mt-3">
					<div class="text-[0.6rem] tracking-[0.3em] text-[var(--text-muted)] uppercase">
						Projects
					</div>
					<div class="flex flex-col gap-1">
						{#each projectLinks as item}
							<a
								href={item.href}
								class="ap-nav-link flex items-center rounded-md py-1 pl-3 text-[var(--text-soft)]"
							>
								{item.label}
							</a>
						{/each}
					</div>
				</li>

				<li class="mt-3">
					<div class="text-[0.6rem] tracking-[0.3em] text-[var(--text-muted)] uppercase">
						Community
					</div>
					<div class="flex flex-col gap-1">
						{#each communityLinks as item}
							{#if item.external}
								<a
									href={item.href}
									target="_blank"
									rel="noreferrer"
									class="ap-nav-link flex items-center rounded-md py-1.5 pl-3 text-[var(--text-soft)]"
								>
									{item.label}
								</a>
							{:else}
								<a
									href={item.href}
									class="ap-nav-link flex items-center rounded-md py-1.5 pl-3 text-[var(--text-soft)]"
								>
									{item.label}
								</a>
							{/if}
						{/each}
					</div>
				</li>

				<li class="mt-3">
					<div class="text-[0.6rem] tracking-[0.3em] text-[var(--text-muted)] uppercase">
						Studios
					</div>
					<div class="flex flex-col gap-1">
						{#each studiosLinks as item}
							<a
								href={item.href}
								class="ap-nav-link flex items-center rounded-md py-1.5 pl-3 text-[var(--text-soft)]"
							>
								{item.label}
							</a>
						{/each}
					</div>
				</li>

				<li class="mt-3">
					<div class="text-[0.6rem] tracking-[0.3em] text-[var(--text-muted)] uppercase">Tools</div>
					<div class="flex flex-col gap-1">
						{#each toolLinks as item}
							<a
								href={item.href}
								class="ap-nav-link flex items-center rounded-md py-1.5 pl-3 text-[var(--text-soft)]"
							>
								{item.label}
							</a>
						{/each}
					</div>
				</li>
			</ul>
		</nav>
	{/if}
</header>

<meta name="google-adsense-account" content="ca-pub-4761348886535927" />
