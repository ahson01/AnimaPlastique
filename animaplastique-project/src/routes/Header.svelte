<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { page } from '$app/stores';

  // Simple core links (no dropdowns)
  const links = [
    { href: '/', label: 'Home' },
    { href: '/work', label: 'Work' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ];

  // Minimal projects section
  const projectLinks = [
    { href: '/projects', label: 'All Projects' },
    { href: '/labs', label: 'Labs & Experiments' }
  ];

  // Community section (Discord + Minecraft future)
  const communityLinks = [
    {
      href: 'https://discord.gg/9kNaxhtHXM',
      label: 'Discord',
      external: true
    },
    { href: '#', label: 'Minecraft (coming soon)' }
  ];


  // Tools section
  const toolLinks = [
    { href: '/tools/file-converter', label: 'File Converter' }
  ];

  let theme: 'dark' | 'light' = 'dark';
  let isMenuOpen = false;

  /**************************
   * THEME LOGIC (unchanged)
   **************************/
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

  /**************************
   * UNDERLINE LOGIC
   **************************/
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

    // Grouped: Projects routes
    if (path.startsWith('/projects') || path.startsWith('/labs')) {
      return navEl.querySelector('a[data-nav-root="projects"]') as HTMLAnchorElement | null;
    }

    // Grouped: Community routes
    if (path.startsWith('/community') || path.startsWith('/minecraft')) {
      return navEl.querySelector('a[data-nav-root="community"]') as HTMLAnchorElement | null;
    }

    // Grouped: Tools routes
    if (path.startsWith('/tools')) {
      return navEl.querySelector('a[data-nav-root="tools"]') as HTMLAnchorElement | null;
    }


    // Direct match for simple core links
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

  /**************************
   * READ SVELTEKIT ROUTE
   **************************/
  $: currentPath = $page.url.pathname;

  // On route change → wait one tick → reposition underline & close mobile menu
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

  /**************************
   * ON MOUNT
   **************************/
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
    <!-- LOGO -->
    <a href="/" class="flex flex-col gap-0.5 no-underline">
      <span class="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[var(--text-strong)]">
        AnimaPlastique
      </span>
      <span
        class="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[var(--text-muted)]"
      >
        web dev & community
      </span>
    </a>

    <div class="flex items-center gap-4">
      <!-- DESKTOP NAV -->
      <nav aria-label="Main" class="hidden md:block">
        <ul
          bind:this={navEl}
          on:mouseleave={resetUnderline}
          class="relative flex items-center gap-6 text-[0.7rem] uppercase tracking-[0.25em]"
        >
          <!-- Animated underline -->
          {#if underlineWidth > 0}
            <div
              class="pointer-events-none absolute bottom-0 h-[2px] rounded-full bg-[var(--text-strong)] transition-all duration-300 ease-out"
              style={`left:${underlineLeft}px; width:${underlineWidth}px;`}
            ></div>
          {/if}

          <!-- Simple core links -->
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

          <!-- Projects (minimal dropdown) -->
          <li class="group relative pb-1">
            <a
              href="#"
              aria-current={currentPath.startsWith('/projects') || currentPath.startsWith('/labs')
                ? 'page'
                : undefined}
              class="ap-nav-link flex items-center gap-1 mt-1 text-[var(--text-soft)]"
              data-nav-root="projects"
              on:mouseenter={handleHover}
              on:click={handleNavClick}
            >
              Projects
              <span class="text-[0.5rem] translate-y-[0.5px]">▾</span>
            </a>

            <!-- Dropdown -->
            <div
              class="pointer-events-none absolute left-0 top-full w-48 rounded-xl border border-[var(--border)] bg-[var(--card-bg-soft)] p-2 text-[0.65rem] shadow-lg backdrop-blur-sm opacity-0 translate-y-1 transition-all duration-150 ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0"
            >
              {#each projectLinks as item}
                <a
                  href={item.href}
                  class="block rounded-md px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] ap-nav-link text-[var(--text-soft)] hover:text-[var(--text-strong)]"
                >
                  {item.label}
                </a>
              {/each}
            </div>
          </li>

          <!-- Community dropdown -->
          <li class="group relative pb-1">
            <a
              href="#"
              aria-current={currentPath.startsWith('/community') || currentPath.startsWith('/minecraft')
                ? 'page'
                : undefined}
              class="ap-nav-link flex items-center gap-1 mt-1 text-[var(--text-soft)]"
              data-nav-root="community"
              on:mouseenter={handleHover}
              on:click={handleNavClick}
            >
              Community
              <span class="text-[0.5rem] translate-y-[0.5px]">▾</span>
            </a>

            <div
              class="pointer-events-none absolute left-0 top-full w-56 rounded-xl border border-[var(--border)] bg-[var(--card-bg-soft)] p-2 text-[0.65rem] shadow-lg backdrop-blur-sm opacity-0 translate-y-1 transition-all duration-150 ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0"
            >
              {#each communityLinks as item}
                {#if item.external}
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    class="block rounded-md px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] ap-nav-link text-[var(--text-soft)] hover:text-[var(--text-strong)]"
                  >
                    {item.label}
                  </a>
                {:else}
                  <a
                    href={item.href}
                    class="block rounded-md px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] ap-nav-link text-[var(--text-soft)] hover:text-[var(--text-strong)]"
                  >
                    {item.label}
                  </a>
                {/if}
              {/each}
            </div>
          </li>

          <!-- Tools dropdown -->
        <li class="group relative pb-1">
          <a
            href="#"
            aria-current={currentPath.startsWith('/tools') ? 'page' : undefined}
            class="ap-nav-link flex items-center gap-1 mt-1 text-[var(--text-soft)]"
            data-nav-root="tools"
            on:mouseenter={handleHover}
            on:click={handleNavClick}
          >
            Tools
            <span class="text-[0.5rem] translate-y-[0.5px]">▾</span>
          </a>

          <div
            class="pointer-events-none absolute left-0 top-full w-48 rounded-xl border border-[var(--border)] bg-[var(--card-bg-soft)] p-2 text-[0.65rem] shadow-lg backdrop-blur-sm opacity-0 translate-y-1 transition-all duration-150 ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0"
          >
            {#each toolLinks as item}
              <a
                href={item.href}
                class="block rounded-md px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] ap-nav-link text-[var(--text-soft)] hover:text-[var(--text-strong)]"
              >
                {item.label}
              </a>
            {/each}
          </div>
        </li>

        </ul>
      </nav>

      <!-- Theme toggle -->
      <button
        on:click={toggleTheme}
        class="ap-toggle"
        aria-label="Toggle dark mode"
        aria-pressed={theme === 'dark'}
      >
        <span class={`ap-toggle-knob ${theme === 'dark' ? 'translate-x-5' : 'translate-x-0'}`}>
          {theme === 'dark' ? '☾' : '☼'}
        </span>
      </button>

      <!-- MOBILE MENU BUTTON -->
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

  <!-- MOBILE NAV -->
  {#if isMenuOpen}
    <nav aria-label="Mobile main" class="md:hidden px-6 pb-6 h-screen bg-[var(--bg)] text-[var(--text)]">
      <ul class="flex flex-col gap-2 text-[0.7rem] uppercase tracking-[0.25em]">
        <!-- Core links -->
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

        <!-- Projects group -->
        <li class="mt-3">
          <div class="text-[0.6rem] uppercase tracking-[0.3em] text-[var(--text-muted)]">
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

        <!-- Community group -->
        <li class="mt-3">
          <div class="text-[0.6rem] uppercase tracking-[0.3em] text-[var(--text-muted)]">
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

              <!-- Tools group -->
      <li class="mt-3">
        <div class="text-[0.6rem] uppercase tracking-[0.3em] text-[var(--text-muted)]">
          Tools
        </div>
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

<style>
  /* If you already defined these globally, you can remove this block.
     Otherwise this keeps the header themed the same way as your pages. */

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

<meta name="google-adsense-account" content="ca-pub-4761348886535927">
