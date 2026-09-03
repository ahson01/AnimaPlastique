<script lang="ts">
	import {
		Upload,
		Download,
		Image as ImageIcon,
		CheckCircle2,
		Loader2,
		AlertCircle,
		Sliders
	} from 'lucide-svelte';
	import GlowBackdrop from '$lib/components/GlowBackdrop.svelte';

	let file: File | null = null;
	let compressing = false;
	let compressedFile: File | null = null;
	let error = '';
	let quality = 0.8;
	let fileInputRef: HTMLInputElement;

	function handleFileSelect(e: Event) {
		const target = e.target as HTMLInputElement;
		const selectedFile = target.files?.[0];
		if (selectedFile && selectedFile.type.startsWith('image/')) {
			file = selectedFile;
			compressedFile = null;
			error = '';
		} else {
			error = 'Please select a valid image file.';
		}
	}

	async function compressImage() {
		if (!file) return;

		compressing = true;
		error = '';
		compressedFile = null;

		try {
			const img = new Image();
			const reader = new FileReader();

			const blob = await new Promise<Blob>((resolve, reject) => {
				reader.onload = (e) => {
					const result = e.target?.result;
					if (typeof result !== 'string') {
						reject(new Error('Failed to read file'));
						return;
					}
					img.onload = () => {
						const canvas = document.createElement('canvas');
						canvas.width = img.width;
						canvas.height = img.height;
						const ctx = canvas.getContext('2d');
						if (!ctx) {
							reject(new Error('Failed to get canvas context'));
							return;
						}
						ctx.drawImage(img, 0, 0);

						canvas.toBlob(
							(blob) => {
								if (blob) {
									resolve(blob);
								} else {
									reject(new Error('Compression failed'));
								}
							},
							'image/jpeg',
							quality
						);
					};
					img.onerror = () => reject(new Error('Failed to load image'));
					img.src = result;
				};
				reader.onerror = () => reject(new Error('Failed to read file'));
				reader.readAsDataURL(file as File);
			});

			const originalName = (file as File).name.split('.').slice(0, -1).join('.');
			const finalBlob = blob.size > (file as File).size ? (file as File) : blob;

			if (blob.size > (file as File).size && quality > 0.9) {
				error =
					'Note: 100% quality may result in a larger file than the original. Using original file.';
			}

			compressedFile = new File([finalBlob], `${originalName}_compressed.jpg`, {
				type: 'image/jpeg'
			});
		} catch (err) {
			error = (err as Error).message || 'Compression failed';
		} finally {
			compressing = false;
		}
	}

	function handleDownload() {
		if (!compressedFile) return;
		const url = URL.createObjectURL(compressedFile);
		const a = document.createElement('a');
		a.href = url;
		a.download = compressedFile.name;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}
</script>

<svelte:head>
	<title>Free Online Image Compressor | xkinetics</title>
	<meta name="description" content="Compress images without losing quality, right in your browser." />
</svelte:head>



<section
	class="relative isolate flex min-h-screen w-full justify-center overflow-hidden bg-[var(--bg)] dark:bg-neutral-950"
>
	<GlowBackdrop />

	<div class="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pt-18 pb-24 lg:pt-22">
		<div class="flex flex-col gap-12 lg:flex-row lg:items-start">
			<div class="max-w-3xl flex-1 space-y-7">
				<p
					class="animate-pop-up bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text font-mono text-[0.65rem] tracking-[0.35em] text-transparent uppercase"
				>
					WASM Image Compressor · Privacy-first
				</p>
				<p class="max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
					Optimize your images instantly. All processing happens in your browser, so no file is ever
					uploaded to a server.
				</p>

				<div
					class="animate-pop-up cursor-pointer rounded-xl border-2 border-dashed border-neutral-300 p-8 text-center transition-colors hover:border-emerald-400 dark:border-neutral-700 dark:hover:border-emerald-500"
					style="--delay: 0.1s;"
					on:click={() => fileInputRef?.click()}
					on:keydown={(e) => e.key === 'Enter' && fileInputRef?.click()}
					role="button"
					tabindex="0"
				>
					<input
						bind:this={fileInputRef}
						type="file"
						on:change={handleFileSelect}
						class="hidden"
						accept="image/*"
					/>
					<Upload class="mx-auto mb-4 h-12 w-12 text-neutral-400 dark:text-neutral-500" />
					<p class="mb-2 font-medium text-neutral-900 dark:text-neutral-100">
						{file ? file.name : 'Click to upload an image'}
					</p>
					<p class="font-mono text-xs tracking-[0.2em] text-neutral-400 uppercase">
						PNG · JPG · WEBP
					</p>
				</div>

				{#if file}
					<div class="animate-pop-up space-y-4" style="--delay: 0.2s;">
						<div class="flex items-center justify-between">
							<label
								for="quality-slider"
								class="block font-mono text-xs tracking-[0.25em] text-neutral-600 uppercase dark:text-neutral-400"
							>
								Compression Quality: {Math.round(quality * 100)}%
							</label>
							<Sliders class="h-4 w-4 text-neutral-400" />
						</div>
						<input
							id="quality-slider"
							type="range"
							min="0.1"
							max="1"
							step="0.05"
							bind:value={quality}
							class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-200 accent-emerald-500 dark:bg-neutral-800"
						/>

						<button
							on:click={compressImage}
							disabled={compressing}
							class="inline-flex w-full items-center justify-center gap-2 rounded-full border border-neutral-900/20 bg-neutral-900 px-6 py-3 text-[0.7rem] tracking-[0.22em] text-neutral-50 uppercase shadow-sm transition-all hover:bg-neutral-800 disabled:opacity-50 dark:bg-neutral-50 dark:text-neutral-900"
						>
							{#if compressing}
								<Loader2 class="h-4 w-4 animate-spin" />
								Compressing...
							{:else}
								<ImageIcon class="h-4 w-4" />
								Optimize Image
							{/if}
						</button>
					</div>
				{/if}
			</div>

			<div
				class="animate-pop-up grid w-full max-w-sm gap-4 rounded-2xl border border-black/10 bg-white/40 p-5 text-xs shadow-lg ring-1 ring-black/5 backdrop-blur-md sm:text-[0.7rem] dark:border-white/10 dark:bg-white/5"
				style="--delay: 0.15s;"
			>
				<div
					class="flex items-baseline justify-between border-b border-black/10 pb-3 font-mono tracking-[0.25em] uppercase dark:border-white/10"
				>
					<span>Stats</span>
				</div>
				{#if file}
					<div class="flex items-baseline justify-between">
						<span class="font-mono tracking-wider text-neutral-500 uppercase">Original Size</span>
						<span class="font-mono">{(file.size / 1024).toFixed(2)} KB</span>
					</div>
				{/if}
				{#if compressedFile}
					<div class="flex items-baseline justify-between text-green-600 dark:text-green-400">
						<span class="font-mono tracking-wider uppercase">Compressed Size</span>
						<span class="font-mono">{(compressedFile.size / 1024).toFixed(2)} KB</span>
					</div>
					{#if file}
						<div class="flex items-baseline justify-between text-emerald-500">
							<span class="font-mono tracking-wider uppercase">Reduction</span>
							<span class="font-mono"
								>{Math.round((1 - compressedFile.size / file.size) * 100)}%</span
							>
						</div>
					{/if}
				{/if}
				<div class="flex items-baseline justify-between">
					<span class="font-mono tracking-wider text-neutral-500 uppercase">Privacy</span>
					<span class="text-neutral-900 italic dark:text-neutral-100">No upload</span>
				</div>
			</div>
		</div>

		{#if error}
			<div
				class="animate-pop-up flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800/50 dark:bg-red-950/30"
			>
				<AlertCircle class="mt-0.5 h-5 w-5 text-red-600 dark:text-red-400" />
				<p class="text-sm text-red-600 dark:text-red-400">{error}</p>
			</div>
		{/if}

		{#if compressedFile}
			<div
				class="animate-pop-up rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-800/50 dark:bg-green-950/30"
			>
				<div class="mb-6 flex items-center gap-3">
					<CheckCircle2 class="h-6 w-6 text-green-600 dark:text-green-400" />
					<h3
						class="font-mono text-xs tracking-[0.25em] text-green-800 uppercase dark:text-green-300"
					>
						Image Optimized
					</h3>
				</div>
				<button
					on:click={handleDownload}
					class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-900 px-6 py-3 text-[0.7rem] tracking-[0.22em] text-green-50 uppercase shadow-lg transition-all hover:-translate-y-1 hover:bg-green-800 dark:bg-green-50 dark:text-green-900"
				>
					<Download class="h-4 w-4" />
					Download Optimized Image
				</button>
			</div>
		{/if}
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
