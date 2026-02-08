<script lang="ts">
	import type { LabSummary } from './+page.server';

	export let data: { labs: LabSummary[] };

	const labs = data.labs ?? [];

	const formatDate = (d?: string) => {
		if (!d) return '';
		const date = new Date(d);
		if (Number.isNaN(date.getTime())) {
			// fallback if frontmatter date is just "YYYY-MM-DD"
			return d.split('T')[0];
		}
		return date.toLocaleDateString('en-GB', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};
</script>

<!-- src/routes/labs/+page.svelte -->
<svelte:head>
	<title>Labs · AnimaPlastique</title>
</svelte:head>

<section class="relative flex w-full justify-center overflow-hidden">
	<!-- background glows -->
	<div class="pointer-events-none absolute inset-0 -z-10">
		<div
			class="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.6),transparent)] opacity-25
			       blur-3xl
			       dark:opacity-20"
		></div>

		<div
			class="absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgba(0,0,0,0.3),transparent)] opacity-20
			       blur-3xl
			       dark:opacity-30"
		></div>

		<div
			class="absolute right-0 bottom-0 h-[40rem] w-[40rem] translate-x-1/3 translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(180,30,40,0.4),transparent)]
			       opacity-40 blur-[120px]
			       dark:bg-[radial-gradient(closest-side,rgba(220,50,60,0.35),transparent)] dark:opacity-60"
		></div>
	</div>

	<div class="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pt-18 pb-24 lg:pt-22">
		<!-- Header -->
		<header class="space-y-4">
			<p
				class="animate-pop-up bg-gradient-to-r from-rose-400 to-red-500
				   bg-clip-text font-mono text-[0.65rem] tracking-[0.35em] text-transparent uppercase"
			>
				AnimaPlastique · labs
			</p>

			<div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
				<div class="space-y-2">
					<h1
						class="font-inter rapid-text reveal-line block text-3xl
						       leading-tight -tracking-[0.06em] text-balance sm:text-4xl lg:text-5xl"
					>
						<span class="reveal-line block">
							<span class="rapid-text">Lab notes straight from the repo.</span>
						</span>
					</h1>
					<p class="max-w-2xl text-sm leading-relaxed text-neutral-400">
						Every item here is a markdown file in
						<span class="rounded bg-white/5 px-1.5 py-0.5 font-mono text-xs"> notes/labs </span>
						on GitHub — rendered directly on this site.
					</p>
				</div>
			</div>
		</header>

		<!-- Labs list -->
		<div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#if labs.length === 0}
				<p class="col-span-full text-sm text-neutral-500">
					No labs yet. Add some markdown files to <code>notes/labs</code>.
				</p>
			{:else}
				{#each labs as lab}
					<a
						href={`/labs/${lab.slug}`}
						class="group flex flex-col justify-between rounded-2xl border border-white/10
						       bg-neutral-950/70 p-5 text-left shadow-sm transition-all duration-300
						       hover:-translate-y-1 hover:border-white/30 hover:shadow-2xl"
					>
						<div class="space-y-2">
							<div class="flex items-center justify-between gap-2">
								<h2 class="line-clamp-2 text-base font-semibold text-neutral-50">
									{lab.title}
								</h2>
								{#if lab.date}
									<span class="font-mono text-[0.7rem] text-neutral-500">
										{formatDate(lab.date)}
									</span>
								{/if}
							</div>

							{#if lab.description}
								<p class="line-clamp-3 text-xs text-neutral-300">
									{lab.description}
								</p>
							{/if}
						</div>

						<span
							class="mt-4 inline-flex items-center gap-1 text-[0.7rem] text-neutral-300 opacity-80 transition-opacity group-hover:opacity-100"
						>
							<span>Read note</span>
							<span class="font-mono text-xs">↗</span>
						</span>
					</a>
				{/each}
			{/if}
		</div>
	</div>
</section>
