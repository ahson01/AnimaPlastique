<script lang="ts">
	import {
		Globe,
		Share2,
		Eye,
		Copy,
		Check,
		MessageSquare,
		Twitter,
		Facebook,
		Search,
		Linkedin,
		Slack,
		Code,
		Layout,
		Sparkles,
		AlertCircle,
		CheckCircle2,
		Upload,
		Image as ImageIcon
	} from 'lucide-svelte';

	let title = 'xkinetics.space - Rapid Web Development';
	let description =
		'High-performance websites built with precision and speed. Privacy-first tools and premium design for the modern web.';
	let url = 'https://xkinetics.space';
	let image = 'https://xkinetics.space/og-image.png';

	let activePreview = 'google';
	let activeTab = 'editor'; // 'editor' | 'code'
	let copied = false;
	let fileInputRef: HTMLInputElement;

	$: titleStatus = title.length >= 50 && title.length <= 60 ? 'good' : 'warning';
	$: descStatus = description.length >= 120 && description.length <= 160 ? 'good' : 'warning';

	async function copyToClipboard(text: string) {
		await navigator.clipboard.writeText(text);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}

	function handleImageUpload(e: Event) {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file && file.type.startsWith('image/')) {
			const reader = new FileReader();
			reader.onload = (ev) => {
				if (typeof ev.target?.result === 'string') {
					image = ev.target.result;
				}
			};
			reader.readAsDataURL(file);
		}
	}

	$: metaTags = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${image}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${url}">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${description}">
<meta property="twitter:image" content="${image}">`;
</script>

<svelte:head>
	<title>Meta Preview · Pro Studio - xkinetics.space</title>
</svelte:head>

<section
	class="relative flex min-h-screen w-full justify-center overflow-hidden bg-neutral-50 dark:bg-neutral-950"
>
	<div class="pointer-events-none absolute inset-0 -z-10">
		<div
			class="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.6),transparent)] opacity-25 blur-3xl dark:opacity-20"
		></div>
		<div
			class="absolute right-0 bottom-0 h-[40rem] w-[40rem] translate-x-1/3 translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.4),transparent)] opacity-40 blur-[120px] dark:opacity-60"
		></div>
	</div>

	<div class="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pt-18 pb-24 lg:pt-22">
		<div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
			<div class="max-w-2xl space-y-5">
				<p
					class="animate-pop-up bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text font-mono text-[0.65rem] tracking-[0.35em] text-transparent uppercase"
				>
					Meta Preview · Pro Studio
				</p>
				<p class="max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
					The ultimate simulator for SEO and social media. Optimize your appearance, generate meta
					tags, and run health checks.
				</p>
			</div>
			<div class="animate-pop-up flex gap-2" style="--delay: 0.1s;">
				<button
					on:click={() => (activeTab = 'editor')}
					class="flex items-center gap-2 rounded-full px-5 py-2 font-mono text-[0.65rem] tracking-widest uppercase transition-all {activeTab ===
					'editor'
						? 'bg-neutral-900 text-neutral-50 shadow-lg dark:bg-neutral-50 dark:text-neutral-900'
						: 'bg-white/50 text-neutral-500 hover:bg-white/80 dark:bg-white/5 dark:hover:bg-white/10'}"
				>
					<Layout class="h-3 w-3" /> Editor
				</button>
				<button
					on:click={() => (activeTab = 'code')}
					class="flex items-center gap-2 rounded-full px-5 py-2 font-mono text-[0.65rem] tracking-widest uppercase transition-all {activeTab ===
					'code'
						? 'bg-neutral-900 text-neutral-50 shadow-lg dark:bg-neutral-50 dark:text-neutral-900'
						: 'bg-white/50 text-neutral-500 hover:bg-white/80 dark:bg-white/5 dark:hover:bg-white/10'}"
				>
					<Code class="h-3 w-3" /> Tag Studio
				</button>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-10 lg:grid-cols-12">
			{#if activeTab === 'editor'}
				<div class="animate-pop-up space-y-6 lg:col-span-4" style="--delay: 0.15s;">
					<div
						class="space-y-6 rounded-3xl border border-black/10 bg-white/40 p-7 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/5"
					>
						<div class="space-y-3">
							<div class="flex items-center justify-between">
								<label
									for="meta-title"
									class="font-mono text-[0.6rem] tracking-widest text-neutral-500 uppercase"
									>Page Title</label
								>
								<span
									class="font-mono text-[0.6rem] {titleStatus === 'good'
										? 'text-green-500'
										: 'text-amber-500'}"
								>
									{title.length} / 60
								</span>
							</div>
							<input
								id="meta-title"
								bind:value={title}
								class="w-full rounded-xl border border-black/5 bg-white/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-white/5 dark:bg-black/20"
							/>
							{#if titleStatus === 'warning' && title.length > 0}
								<div class="flex items-center gap-2 text-[0.65rem] text-amber-500 italic">
									<AlertCircle class="h-3 w-3" />
									{title.length < 50 ? 'Title is a bit short.' : 'Title might be truncated.'}
								</div>
							{/if}
						</div>

						<div class="space-y-3">
							<div class="flex items-center justify-between">
								<label
									for="meta-desc"
									class="font-mono text-[0.6rem] tracking-widest text-neutral-500 uppercase"
									>Description</label
								>
								<span
									class="font-mono text-[0.6rem] {descStatus === 'good'
										? 'text-green-500'
										: 'text-amber-500'}"
								>
									{description.length} / 160
								</span>
							</div>
							<textarea
								id="meta-desc"
								bind:value={description}
								rows="4"
								class="w-full resize-none rounded-xl border border-black/5 bg-white/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-white/5 dark:bg-black/20"
							></textarea>
							{#if descStatus === 'warning' && description.length > 0}
								<div class="flex items-center gap-2 text-[0.65rem] text-amber-500 italic">
									<AlertCircle class="h-3 w-3" />
									{description.length < 120 ? 'Keep it between 120-160.' : 'A bit too long.'}
								</div>
							{/if}
						</div>

						<div class="space-y-3">
							<label
								for="meta-url"
								class="font-mono text-[0.6rem] tracking-widest text-neutral-500 uppercase"
								>Canonical URL</label
							>
							<input
								id="meta-url"
								bind:value={url}
								class="w-full rounded-xl border border-black/5 bg-white/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-white/5 dark:bg-black/20"
							/>
						</div>

						<div class="space-y-3">
							<label
								for="meta-image"
								class="font-mono text-[0.6rem] tracking-widest text-neutral-500 uppercase"
								>Social Preview Image</label
							>
							<div class="flex gap-2">
								<input
									id="meta-image"
									bind:value={image}
									class="flex-1 rounded-xl border border-black/5 bg-white/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-white/5 dark:bg-black/20"
								/>
								<button
									on:click={() => fileInputRef.click()}
									class="flex aspect-square w-12 items-center justify-center rounded-xl bg-neutral-900 text-neutral-50 transition-all hover:bg-neutral-800 dark:bg-neutral-50 dark:text-neutral-900"
								>
									<Upload class="h-4 w-4" />
								</button>
								<input
									type="file"
									bind:this={fileInputRef}
									on:change={handleImageUpload}
									accept="image/*"
									class="hidden"
								/>
							</div>
						</div>
					</div>
				</div>

				<div class="animate-pop-up flex flex-col gap-8 lg:col-span-8" style="--delay: 0.2s;">
					<div
						class="hide-scrollbar flex gap-1 overflow-x-auto rounded-2xl border border-black/5 bg-black/5 p-1 dark:border-white/5 dark:bg-white/5"
					>
						{#each [['google', Search], ['discord', MessageSquare], ['twitter', Twitter], ['linkedin', Linkedin], ['slack', Slack], ['browser', Globe]] as [id, Icon]}
							<button
								on:click={() => (activePreview = id)}
								class="flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-[0.6rem] tracking-widest whitespace-nowrap uppercase transition-all {activePreview ===
								id
									? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-neutral-50'
									: 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'}"
							>
								<svelte:component this={Icon} class="h-3 w-3" />
								{id}
							</button>
						{/each}
					</div>

					<div
						class="relative flex-1 rounded-3xl border border-black/5 bg-white/20 p-8 dark:border-white/5 dark:bg-white/[0.02]"
					>
						{#if activePreview === 'google'}
							<div class="max-w-[600px] space-y-2">
								<div class="mb-1 flex items-center gap-2">
									<div
										class="flex h-7 w-7 items-center justify-center rounded-full border border-black/5 bg-neutral-100 dark:border-white/5 dark:bg-neutral-800"
									>
										<Globe class="h-3 w-3 text-neutral-400" />
									</div>
									<div class="flex flex-col">
										<span class="text-[0.7rem] font-medium text-neutral-900 dark:text-neutral-100"
											>xkinetics.space</span
										>
										<span class="text-[0.65rem] text-neutral-400">{url}</span>
									</div>
								</div>
								<div
									class="cursor-pointer text-xl leading-tight text-blue-600 hover:underline dark:text-blue-400"
								>
									{title}
								</div>
								<div
									class="line-clamp-2 text-[0.875rem] leading-normal text-neutral-600 dark:text-neutral-400"
								>
									{description}
								</div>
							</div>
						{:else if activePreview === 'discord'}
							<div
								class="max-w-[432px] rounded-md border-l-4 border-emerald-500 bg-[#2f3136] p-4 text-left"
							>
								<div class="mb-1 text-[0.75rem] font-bold tracking-wider text-[#b9bbbe] uppercase">
									xkinetics.space
								</div>
								<div
									class="mb-2 cursor-pointer text-[1rem] font-semibold text-[#00b0f4] hover:underline"
								>
									{title}
								</div>
								<div class="mb-4 text-[0.875rem] text-[#dcddde]">{description}</div>
								<div class="aspect-[1.91/1] overflow-hidden rounded-md bg-neutral-800">
									<img src={image} alt="Preview" class="h-full w-full object-cover" />
								</div>
							</div>
						{:else if activePreview === 'twitter'}
							<div
								class="max-w-[506px] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-black"
							>
								<div
									class="aspect-[1.91/1] overflow-hidden border-b border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900"
								>
									<img src={image} alt="Preview" class="h-full w-full object-cover" />
								</div>
								<div class="p-3">
									<div class="mb-0.5 text-[0.8rem] text-neutral-500">
										{new URL(url).hostname}
									</div>
									<div
										class="mb-0.5 text-[0.9rem] font-medium text-neutral-900 dark:text-neutral-50"
									>
										{title}
									</div>
									<div class="line-clamp-2 text-[0.85rem] leading-snug text-neutral-500">
										{description}
									</div>
								</div>
							</div>
						{:else if activePreview === 'linkedin'}
							<div
								class="max-w-[552px] border border-neutral-200 bg-white text-left dark:border-neutral-800 dark:bg-[#1d2226]"
							>
								<div class="aspect-[1.91/1] overflow-hidden bg-neutral-100">
									<img src={image} alt="Preview" class="h-full w-full object-cover" />
								</div>
								<div class="border-t border-neutral-200 p-3 dark:border-neutral-800">
									<h4
										class="line-clamp-1 text-sm font-semibold text-neutral-900 dark:text-neutral-50"
									>
										{title}
									</h4>
									<p class="mt-1 text-[0.75rem] text-neutral-500 dark:text-neutral-400">
										{new URL(url).hostname}
									</p>
								</div>
							</div>
						{:else if activePreview === 'slack'}
							<div class="flex max-w-[500px] gap-3 text-left">
								<div class="w-1 rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
								<div class="flex-1 space-y-2">
									<div class="flex items-center gap-2">
										<div class="h-4 w-4 rounded bg-neutral-200 dark:bg-neutral-700"></div>
										<span class="text-sm font-bold">xkinetics.space</span>
									</div>
									<div class="cursor-pointer text-sm font-bold text-[#1264a3] hover:underline">
										{title}
									</div>
									<div class="text-sm">{description}</div>
									<div
										class="aspect-[1.91/1] max-w-[360px] overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800"
									>
										<img src={image} alt="Preview" class="h-full w-full object-cover" />
									</div>
								</div>
							</div>
						{:else if activePreview === 'browser'}
							<div
								class="max-w-[500px] rounded-t-xl border border-black/10 bg-neutral-100 dark:border-white/10 dark:bg-neutral-800"
							>
								<div class="flex items-center gap-2 px-3 py-2">
									<div class="flex gap-1.5">
										<div class="h-2.5 w-2.5 rounded-full bg-red-400"></div>
										<div class="h-2.5 w-2.5 rounded-full bg-amber-400"></div>
										<div class="h-2.5 w-2.5 rounded-full bg-green-400"></div>
									</div>
									<div
										class="flex-1 truncate rounded-lg border border-black/5 bg-white px-3 py-1 text-[0.65rem] text-neutral-500 dark:border-white/5 dark:bg-neutral-900"
									>
										{url}
									</div>
								</div>
								<div
									class="flex min-h-[160px] flex-col items-center justify-center bg-white p-6 text-center dark:bg-neutral-950"
								>
									<Sparkles class="mb-4 h-10 w-10 text-emerald-500 opacity-50" />
									<p class="text-xs text-neutral-400">Main Content Area</p>
								</div>
							</div>
						{/if}
					</div>
				</div>
			{:else}
				<div class="animate-pop-up lg:col-span-12" style="--delay: 0.15s;">
					<div
						class="rounded-3xl border border-black/10 bg-white/40 p-1 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/5"
					>
						<div class="flex items-center justify-between px-6 py-4">
							<div class="flex items-center gap-3">
								<div
									class="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/20 text-green-500"
								>
									<CheckCircle2 class="h-4 w-4" />
								</div>
								<span class="font-mono text-[0.7rem] tracking-[0.2em] text-neutral-500 uppercase"
									>Production Ready HTML</span
								>
							</div>
							<button
								on:click={() => copyToClipboard(metaTags)}
								class="white flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-2.5 font-mono text-[0.65rem] tracking-widest text-neutral-50 uppercase transition-all hover:bg-neutral-800 dark:bg-neutral-50 dark:text-neutral-900"
							>
								{#if copied}
									<Check class="h-3 w-3" /> Copied
								{:else}
									<Copy class="h-3 w-3" /> Copy Snippet
								{/if}
							</button>
						</div>
						<div
							class="overflow-hidden rounded-2xl bg-black/90 p-8 font-mono text-[0.75rem] leading-relaxed text-blue-300"
						>
							<pre class="hide-scrollbar overflow-x-auto"><code>{metaTags}</code></pre>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	@keyframes pop-up {
		0% {
			opacity: 0;
			transform: translateY(10px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.animate-pop-up {
		animation: pop-up 0.6s ease-out forwards;
		animation-delay: var(--delay, 0s);
		opacity: 0;
	}
	.hide-scrollbar::-webkit-scrollbar {
		display: none;
	}
	.hide-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
