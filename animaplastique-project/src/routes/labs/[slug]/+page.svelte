<!-- src/routes/labs/[slug]/+page.svelte -->
<script lang="ts">
	export let data: {
		slug: string;
		title: string;
		description?: string;
		date?: string;
		html: string;
	};

	const formatDate = (d?: string) => {
		if (!d) return '';
		const date = new Date(d);
		if (Number.isNaN(date.getTime())) {
			return d.split('T')[0];
		}
		return date.toLocaleDateString('en-GB', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};
</script>

<svelte:head>
	<title>Lab · {data.title}</title>
	{#if data.description}
		<meta name="description" content={data.description} />
	{/if}
</svelte:head>

<section
	class="relative flex w-full justify-center overflow-hidden bg-[var(--bg)] text-[var(--text)]"
>
	<!-- background glows -->
	<div class="pointer-events-none absolute inset-0 -z-10">
		<div
			class="absolute -top-32 -left-24 h-72 w-72 rounded-full blur-3xl opacity-25
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

	<div class="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 pt-18 pb-24 lg:pt-22">
		<!-- Back link -->
		<a
			href="/labs"
			class="mb-2 inline-flex items-center gap-1 text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-soft)]"
		>
			<span class="font-mono text-sm">←</span>
			<span>Back to labs</span>
		</a>

		<!-- Header -->
		<header class="space-y-3">
			<p class="font-mono text-[0.65rem] uppercase tracking-[0.35em] text-[var(--text-muted)]">
				Lab note
			</p>
			<h1
				class="font-inter text-3xl leading-tight -tracking-[0.06em]
				       sm:text-4xl text-[var(--text-strong)]"
			>
				{data.title}
			</h1>

			<div class="flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)]">
				{#if data.date}
					<span class="font-mono">
						{formatDate(data.date)}
					</span>
				{/if}
				{#if data.description}
					<span class="inline-flex items-center gap-1 text-[var(--text-soft)]">
						{data.description}
					</span>
				{/if}
			</div>
		</header>

		<!-- Markdown content -->
		<article
			class="mt-2 prose prose-sm max-w-none
			       text-[var(--text-soft)]
			       prose-headings:text-[var(--text-strong)]
			       prose-a:text-[var(--link)] hover:prose-a:text-[var(--link-hover)]
			       prose-strong:text-[var(--text-strong)]
			       prose-code:text-[var(--link)]
			       prose-pre:bg-[var(--card-bg-soft)] prose-pre:text-[var(--text-soft)] prose-pre:border prose-pre:border-[var(--border)]
			       prose-blockquote:border-l-[var(--border)] prose-blockquote:text-[var(--text-soft)]"
		>
			{@html data.html}
		</article>
	</div>
</section>

<style>
	/* If you already defined these vars globally (layout / other pages),
	   you can delete this block. Otherwise this keeps Labs themed. */

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

		--link: #6ee7b7;
		--link-hover: #a7f3d0;

		--glow-soft: rgba(20, 20, 20, 0.9);
		--glow-muted: rgba(15, 23, 42, 0.7);
		--glow-accent: rgba(16, 185, 129, 0.35);
		--glow-green: rgba(52, 211, 153, 0.22);
	}

	:global(html) {
		/* If you prefer light-first and dark override, swap these blocks.
		   Right now this page is designed as dark-first. */
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

		--link: #047857;
		--link-hover: #10b981;

		--glow-soft: rgba(255, 255, 255, 0.9);
		--glow-muted: rgba(200, 200, 200, 0.4);
		--glow-accent: rgba(52, 211, 153, 0.35);
		--glow-green: rgba(52, 211, 153, 0.18);
	}
</style>
