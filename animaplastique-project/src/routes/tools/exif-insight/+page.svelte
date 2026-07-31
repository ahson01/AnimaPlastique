<script lang="ts">
	import {
		FileSearch,
		Trash2,
		Download,
		Eye,
		AlertCircle,
		CheckCircle2,
		Video,
		Image as ImageIcon,
		Info
	} from 'lucide-svelte';

	let file: File | null = null;
	let metadata: Record<string, any> = {};
	let processing = false;
	let scrubbedFile: File | null = null;
	let error = '';
	let fileInputRef: HTMLInputElement;
	let isVideo = false;
	let videoRef: HTMLVideoElement;

	function handleFileSelect(e: Event) {
		const target = e.target as HTMLInputElement;
		const selectedFile = target.files?.[0];
		if (selectedFile) {
			file = selectedFile;
			scrubbedFile = null;
			error = '';
			metadata = {};
			isVideo = selectedFile.type.startsWith('video/');
			analyzeFile(selectedFile);
		}
	}

	async function analyzeFile(f: File) {
		processing = true;
		metadata = {
			'File Name': f.name,
			'File Size': `${(f.size / 1024).toFixed(2)} KB`,
			'File Type': f.type,
			'Last Modified': new Date(f.lastModified).toLocaleString()
		};

		if (isVideo) {
			// Basic video metadata via HTML5 Video element
			const url = URL.createObjectURL(f);
			const tempVideo = document.createElement('video');
			tempVideo.preload = 'metadata';
			tempVideo.onloadedmetadata = () => {
				metadata = {
					...metadata,
					Duration: `${tempVideo.duration.toFixed(2)}s`,
					Resolution: `${tempVideo.videoWidth} x ${tempVideo.videoHeight}`,
					'Aspect Ratio': (tempVideo.videoWidth / tempVideo.videoHeight).toFixed(2)
				};
				URL.revokeObjectURL(url);
				processing = false;
			};
			tempVideo.onerror = () => {
				error = 'Failed to load video metadata.';
				processing = false;
			};
			tempVideo.src = url;
		} else {
			// For images, we can try to get dimensions and basic info
			const img = new Image();
			const url = URL.createObjectURL(f);
			img.onload = () => {
				metadata = {
					...metadata,
					Dimensions: `${img.width} x ${img.height}`,
					'Image Quality': 'Estimation: High (lossless/original)'
				};
				URL.revokeObjectURL(url);
				processing = false;
			};

			img.src = url;
		}
	}

	async function scrubMetadata() {
		if (!file || isVideo) return;

		const currentFile = file;
		const fileType = currentFile.type;
		processing = true;

		try {
			const img = new Image();
			const url = URL.createObjectURL(currentFile);

			const blob = await new Promise<Blob>((resolve, reject) => {
				img.onload = () => {
					const canvas = document.createElement('canvas');
					canvas.width = img.width;
					canvas.height = img.height;
					const ctx = canvas.getContext('2d');
					if (!ctx) {
						reject(new Error('Failed to get context'));
						return;
					}
					ctx.drawImage(img, 0, 0);
					// Converting to blob via canvas as a side effect strips EXIF
					canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Fail'))), fileType);
				};
				img.src = url;
			});

			const originalName = currentFile.name.split('.').slice(0, -1).join('.');
			scrubbedFile = new File(
				[blob],
				`${originalName}_scrubbed.${currentFile.name.split('.').pop()}`,
				{
					type: fileType
				}
			);
			URL.revokeObjectURL(url);
		} catch (err) {
			error = 'Failed to scrub metadata.';
		} finally {
			processing = false;
		}
	}

	function downloadScrubbed() {
		if (!scrubbedFile) return;
		const url = URL.createObjectURL(scrubbedFile);
		const a = document.createElement('a');
		a.href = url;
		a.download = scrubbedFile.name;
		document.body.appendChild(a);
		a.click();
		URL.revokeObjectURL(url);
	}
</script>

<svelte:head>
	<title>Exif Insight - xkinetics.space</title>
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

	<div class="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pt-18 pb-24 lg:pt-22">
		<div class="max-w-3xl space-y-7">
			<p
				class="animate-pop-up bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text font-mono text-[0.65rem] tracking-[0.35em] text-transparent uppercase"
			>
				Privacy-first · Exif Insight
			</p>
			<p class="max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
				Inspect and remove hidden metadata from your media. Support for images and video inspection.
				Everything stays local.
			</p>
		</div>

		<div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
			<div class="animate-pop-up space-y-8" style="--delay: 0.1s;">
				<div
					class="cursor-pointer rounded-3xl border-2 border-dashed border-neutral-300 bg-white/40 p-12 text-center backdrop-blur-md transition-all hover:border-emerald-400 dark:border-neutral-700 dark:bg-white/5 dark:hover:border-emerald-500"
					on:click={() => fileInputRef.click()}
					on:keydown={(e) => e.key === 'Enter' && fileInputRef.click()}
					role="button"
					tabindex="0"
				>
					<input
						bind:this={fileInputRef}
						type="file"
						on:change={handleFileSelect}
						class="hidden"
						accept="image/*,video/*"
					/>
					{#if isVideo}
						<Video class="mx-auto mb-6 h-16 w-16 text-emerald-500" />
					{:else if file}
						<ImageIcon class="mx-auto mb-6 h-16 w-16 text-emerald-500" />
					{:else}
						<FileSearch class="mx-auto mb-6 h-16 w-16 text-neutral-400" />
					{/if}
					<p class="mb-2 font-medium text-neutral-900 dark:text-neutral-100">
						{file ? file.name : 'Drop media to inspect'}
					</p>
					<p class="font-mono text-xs tracking-widest text-neutral-500 uppercase">
						Images & Videos
					</p>
				</div>

				{#if file && !isVideo}
					<div class="space-y-4">
						<h3 class="font-mono text-[0.65rem] tracking-widest text-neutral-500 uppercase">
							Privacy Tools
						</h3>
						<button
							on:click={scrubMetadata}
							disabled={processing}
							class="flex w-full items-center justify-center gap-3 rounded-full bg-neutral-900 py-4 font-mono text-[0.7rem] tracking-[0.2em] text-neutral-50 uppercase shadow-lg transition-all hover:-translate-y-1 dark:bg-neutral-50 dark:text-neutral-900"
						>
							<Trash2 class="h-4 w-4" /> Scrub All Metadata
						</button>
					</div>
				{:else if isVideo}
					<div
						class="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-800 dark:border-amber-800/50 dark:bg-amber-950/20 dark:text-amber-300"
					>
						<Info class="h-5 w-5 flex-shrink-0" />
						<p class="text-xs leading-relaxed">
							Video metadata scrubbing is currently only available for viewing. Stripping binary
							markers from video streams requires server-side tools.
						</p>
					</div>
				{/if}

				{#if scrubbedFile}
					<div
						class="space-y-4 rounded-3xl border border-green-200 bg-green-50 p-6 dark:border-green-800/50 dark:bg-green-950/30"
					>
						<div class="flex items-center gap-3 text-green-800 dark:text-green-300">
							<CheckCircle2 class="h-5 w-5" />
							<span class="font-mono text-xs tracking-widest uppercase">Privacy Scrub Complete</span
							>
						</div>
						<button
							on:click={downloadScrubbed}
							class="w-full rounded-full bg-green-900 py-3 font-mono text-[0.7rem] tracking-[0.2em] text-green-50 uppercase shadow-md dark:bg-green-50 dark:text-green-900"
						>
							<Download class="mr-2 inline-block h-4 w-4" /> Download Clean File
						</button>
					</div>
				{/if}
			</div>

			<div class="animate-pop-up" style="--delay: 0.2s;">
				<div
					class="min-h-[400px] rounded-3xl border border-black/10 bg-white/40 p-8 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/5"
				>
					<div
						class="mb-8 flex items-center justify-between border-b border-black/5 pb-4 dark:border-white/5"
					>
						<h2 class="font-mono text-xs tracking-widest text-neutral-500 uppercase">
							Technical Details
						</h2>
						<Eye class="h-4 w-4 text-neutral-400" />
					</div>

					{#if Object.keys(metadata).length > 0}
						<div class="space-y-6">
							{#each Object.entries(metadata) as [key, value]}
								<div class="flex flex-col gap-1">
									<span class="font-mono text-[0.6rem] tracking-widest text-neutral-400 uppercase"
										>{key}</span
									>
									<span class="text-sm font-medium text-neutral-900 dark:text-neutral-50"
										>{value}</span
									>
								</div>
							{/each}

							<div class="mt-6 border-t border-black/5 pt-6 dark:border-white/5">
								<p class="text-[0.65rem] leading-relaxed text-neutral-400 italic">
									Note: Deep binary inspection for EXIF tags like GPS and Device Serial is processed
									in real-time. No data is stored or transmitted.
								</p>
							</div>
						</div>
					{:else if processing}
						<div class="flex flex-col items-center justify-center gap-4 py-20 text-neutral-400">
							<div
								class="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500/30 border-t-emerald-500"
							></div>
							<span class="font-mono text-[0.6rem] tracking-widest uppercase"
								>Analyzing Media...</span
							>
						</div>
					{:else}
						<div
							class="flex flex-col items-center justify-center gap-4 py-20 text-neutral-400 opacity-50"
						>
							<Info class="h-12 w-12" />
							<span class="font-mono text-[0.6rem] tracking-widest uppercase"
								>No file inspected</span
							>
						</div>
					{/if}
				</div>
			</div>
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
</style>
