<script lang="ts">
	import { Palette, Upload, Copy, Check, Sliders, RefreshCw, Trash2 } from 'lucide-svelte';

	let file: File | null = null;
	let colors: string[] = [];
	let fileInputRef: HTMLInputElement;
	let copiedColor: string | null = null;

	function handleFileSelect(e: Event) {
		const target = e.target as HTMLInputElement;
		const selectedFile = target.files?.[0];
		if (selectedFile && selectedFile.type.startsWith('image/')) {
			file = selectedFile;
			extractColors();
		}
	}

	async function extractColors() {
		if (!file) return;

		const img = new Image();
		const reader = new FileReader();

		reader.onload = (e) => {
			const result = e.target?.result;
			if (typeof result !== 'string') return;

			img.onload = () => {
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');
				if (!ctx) return;

				// Scale down for faster processing
				const scale = Math.min(100 / img.width, 100 / img.height);
				canvas.width = img.width * scale;
				canvas.height = img.height * scale;

				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

				// Simple color gathering
				const colorMap: Record<string, number> = {};
				for (let i = 0; i < imageData.length; i += 4) {
					const r = Math.round(imageData[i] / 10) * 10;
					const g = Math.round(imageData[i + 1] / 10) * 10;
					const b = Math.round(imageData[i + 2] / 10) * 10;
					const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
					colorMap[hex] = (colorMap[hex] || 0) + 1;
				}

				// Sort by frequency and take top 6
				colors = Object.entries(colorMap)
					.sort((a, b) => b[1] - a[1])
					.slice(0, 6)
					.map(([hex]) => hex);
			};
			img.src = result;
		};
		reader.readAsDataURL(file);
	}

	async function copyColor(hex: string) {
		await navigator.clipboard.writeText(hex);
		copiedColor = hex;
		setTimeout(() => (copiedColor = null), 2000);
	}

	function generateRandom() {
		colors = Array.from({ length: 6 }, () => {
			const hex = Math.floor(Math.random() * 16777215)
				.toString(16)
				.padStart(6, '0');
			return `#${hex}`;
		});
		file = null;
	}

	function clearColors() {
		colors = [];
		file = null;
	}
</script>

<svelte:head>
	<title>Color Palette - AnimaPlastique</title>
</svelte:head>

<section
	class="relative flex min-h-screen w-full justify-center overflow-hidden bg-neutral-50 dark:bg-neutral-950"
>
	<div class="pointer-events-none absolute inset-0 -z-10">
		<div
			class="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.6),transparent)] opacity-25 blur-3xl dark:opacity-20"
		></div>
		<div
			class="absolute right-0 bottom-0 h-[40rem] w-[40rem] translate-x-1/3 translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(180,30,40,0.4),transparent)] opacity-40 blur-[120px] dark:opacity-60"
		></div>
	</div>

	<div class="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pt-18 pb-24 lg:pt-22">
		<div class="max-w-3xl space-y-7">
			<p
				class="animate-pop-up bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text font-mono text-[0.65rem] tracking-[0.35em] text-transparent uppercase"
			>
				Privacy-first · Color Palette
			</p>
			<p class="max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
				Generate stunning color systems or extract palettes from your inspiration images.
			</p>
		</div>

		<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
			<!-- Controls -->
			<div class="animate-pop-up space-y-6 lg:col-span-1" style="--delay: 0.1s;">
				<div
					class="group cursor-pointer rounded-2xl border-2 border-dashed border-neutral-300 p-6 text-center transition-colors hover:border-rose-400 dark:border-neutral-700 dark:hover:border-rose-500"
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
					<Upload
						class="mx-auto mb-4 h-8 w-8 text-neutral-400 transition-colors group-hover:text-rose-500"
					/>
					<p class="font-mono text-xs tracking-[0.2em] text-neutral-500 uppercase">
						Extract from Image
					</p>
				</div>

				<button
					on:click={generateRandom}
					class="flex w-full items-center justify-center gap-3 rounded-2xl bg-neutral-900 py-4 font-mono text-[0.7rem] tracking-[0.2em] text-neutral-50 uppercase shadow-lg transition-all hover:-translate-y-0.5 dark:bg-neutral-50 dark:text-neutral-900"
				>
					<RefreshCw class="h-4 w-4" /> Generate Random
				</button>

				<button
					on:click={clearColors}
					class="flex w-full items-center justify-center gap-3 rounded-2xl border border-black/10 py-4 font-mono text-[0.7rem] tracking-[0.2em] text-neutral-500 uppercase transition-all hover:bg-rose-500/5 hover:text-rose-500 dark:border-white/10"
				>
					<Trash2 class="h-4 w-4" /> Reset
				</button>
			</div>

			<!-- Palette Display -->
			<div class="animate-pop-up space-y-6 lg:col-span-2" style="--delay: 0.2s;">
				{#if colors.length > 0}
					<div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
						{#each colors as color, i}
							<div
								class="group relative aspect-square overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/5 transition-all hover:scale-[1.02]"
							>
								<div class="h-full w-full" style="background-color: {color}"></div>
								<button
									on:click={() => copyColor(color)}
									class="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white opacity-0 transition-opacity group-hover:opacity-100"
								>
									{#if copiedColor === color}
										<Check class="mb-2 h-6 w-6" />
										<span class="font-mono text-[0.6rem] tracking-widest uppercase">Copied!</span>
									{:else}
										<Copy class="mb-2 h-6 w-6" />
										<span class="font-mono text-[0.6rem] tracking-widest uppercase">{color}</span>
									{/if}
								</button>
								<div class="absolute right-4 bottom-4 left-4">
									<div
										class="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-center font-mono text-[0.6rem] text-white backdrop-blur-md"
									>
										{color}
									</div>
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<div
						class="flex-center flex aspect-video w-full flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-neutral-300 text-neutral-400 dark:border-neutral-700"
					>
						<Palette class="h-12 w-12" />
						<p class="font-mono text-[0.65rem] tracking-[0.3em] uppercase">
							No palette generated yet
						</p>
					</div>
				{/if}

				{#if file}
					<div
						class="flex items-center gap-4 rounded-2xl border border-black/5 bg-white/40 p-4 backdrop-blur-sm dark:bg-white/5"
					>
						<div class="h-12 w-12 overflow-hidden rounded-lg bg-neutral-200">
							<img
								src={URL.createObjectURL(file)}
								alt="Source"
								class="h-full w-full object-cover"
							/>
						</div>
						<div>
							<p class="font-mono text-[0.6rem] tracking-widest text-neutral-500 uppercase">
								Source Image
							</p>
							<p class="text-xs text-neutral-900 dark:text-neutral-100">{file.name}</p>
						</div>
					</div>
				{/if}
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
