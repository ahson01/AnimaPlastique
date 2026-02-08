<script lang="ts">
	import { onMount } from 'svelte';
	import {
		QrCode,
		Download,
		Palette,
		Settings2,
		Image as ImageIcon,
		Type,
		Sparkles,
		Check,
		Copy,
		ArrowRight,
		Info
	} from 'lucide-svelte';
	import QRCodeStyling from 'qr-code-styling';

	let qrCode: QRCodeStyling;
	let canvasContainer: HTMLDivElement;

	// QR States
	let data = 'https://animaplastique.xyz';
	let dotsColor = '#e11d48'; // rose-600
	let bgColor = '#ffffff';
	let dotsType: any = 'rounded'; // 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded'
	let cornersType: any = 'extra-rounded'; // 'square' | 'dot' | 'rounded' | 'extra-rounded'
	let extension: 'png' | 'svg' = 'png';
	let logoFile: string | null = null;
	let logoSize = 0.4;
	let logoMargin = 10;

	let copied = false;

	onMount(() => {
		qrCode = new QRCodeStyling({
			width: 400,
			height: 400,
			type: 'svg',
			data: data,
			image: logoFile || '',
			dotsOptions: {
				color: dotsColor,
				type: dotsType
			},
			backgroundOptions: {
				color: bgColor
			},
			imageOptions: {
				crossOrigin: 'anonymous',
				margin: logoMargin,
				imageSize: logoSize
			},
			cornersSquareOptions: {
				type: cornersType,
				color: dotsColor
			},
			cornersDotOptions: {
				type: 'dot',
				color: dotsColor
			}
		});

		qrCode.append(canvasContainer);
	});

	$: if (
		qrCode &&
		(data || dotsColor || bgColor || dotsType || cornersType || logoFile || logoSize || logoMargin)
	) {
		qrCode.update({
			data: data,
			image: logoFile || '',
			dotsOptions: {
				color: dotsColor,
				type: dotsType
			},
			backgroundOptions: {
				color: bgColor
			},
			imageOptions: {
				margin: logoMargin,
				imageSize: logoSize
			},
			cornersSquareOptions: {
				type: cornersType,
				color: dotsColor
			}
		});
	}

	function handleLogoUpload(e: Event) {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (ev) => {
				logoFile = ev.target?.result as string;
			};
			reader.readAsDataURL(file);
		}
	}

	function download() {
		qrCode.download({ name: 'qr-code', extension: extension });
	}

	async function copyUrl() {
		await navigator.clipboard.writeText(data);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}

	const dotStyles = [
		{ id: 'rounded', label: 'Rounded' },
		{ id: 'dots', label: 'Dots' },
		{ id: 'classy', label: 'Classy' },
		{ id: 'square', label: 'Square' },
		{ id: 'extra-rounded', label: 'Smooth' }
	];

	const cornerStyles = [
		{ id: 'extra-rounded', label: 'Smooth' },
		{ id: 'rounded', label: 'Rounded' },
		{ id: 'dot', label: 'Dot' },
		{ id: 'square', label: 'Square' }
	];
</script>

<svelte:head>
	<title>QR Code Studio · Pro Tools - AnimaPlastique</title>
</svelte:head>

<section
	class="relative flex min-h-screen w-full justify-center overflow-hidden bg-neutral-50 dark:bg-neutral-950"
>
	<!-- Background Ornamentation -->
	<div class="pointer-events-none absolute inset-0 -z-10">
		<div
			class="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.6),transparent)] opacity-25 blur-3xl dark:opacity-20"
		></div>
		<div
			class="absolute right-0 bottom-0 h-[40rem] w-[40rem] translate-x-1/3 translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(180,30,40,0.4),transparent)] opacity-40 blur-[120px] dark:opacity-60"
		></div>
	</div>

	<div class="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pt-18 pb-24 lg:pt-22">
		<!-- Header Section -->
		<div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
			<div class="max-w-2xl space-y-5">
				<p
					class="animate-pop-up bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text font-mono text-[0.65rem] tracking-[0.35em] text-transparent uppercase"
				>
					Privacy-first · QR Code Studio
				</p>
				<h1
					class="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-neutral-50"
				>
					Design Premium QR Codes
				</h1>
				<p class="max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
					Generate beautiful, high-resolution QR codes with custom styling. Everything is processed
					locally in your browser for ultimate privacy.
				</p>
			</div>

			<div
				class="animate-pop-up flex items-center gap-3 rounded-full border border-black/5 bg-black/5 p-1 dark:border-white/5 dark:bg-white/5"
				style="--delay: 0.1s;"
			>
				<button
					on:click={() => (extension = 'png')}
					class="flex items-center gap-2 rounded-full px-5 py-2 font-mono text-[0.6rem] tracking-widest transition-all {extension ===
					'png'
						? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-neutral-50'
						: 'text-neutral-500'}">PNG</button
				>
				<button
					on:click={() => (extension = 'svg')}
					class="flex items-center gap-2 rounded-full px-5 py-2 font-mono text-[0.6rem] tracking-widest transition-all {extension ===
					'svg'
						? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-neutral-50'
						: 'text-neutral-500'}">SVG</button
				>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-10 lg:grid-cols-12">
			<!-- Editor Panel -->
			<div class="animate-pop-up space-y-6 lg:col-span-5" style="--delay: 0.15s;">
				<div
					class="space-y-8 rounded-3xl border border-black/10 bg-white/40 p-8 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/5"
				>
					<!-- Content Input -->
					<div class="space-y-4">
						<div class="flex items-center gap-2">
							<Type class="h-3.5 w-3.5 text-rose-500" />
							<label
								for="qr-data"
								class="font-mono text-[0.65rem] tracking-widest text-neutral-500 uppercase"
								>Input Content</label
							>
						</div>
						<div class="relative">
							<textarea
								id="qr-data"
								bind:value={data}
								rows="3"
								placeholder="Paste link or text here..."
								class="w-full resize-none rounded-2xl border border-black/5 bg-white/50 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-rose-500/20 dark:border-white/5 dark:bg-black/20"
							></textarea>
							<button
								on:click={copyUrl}
								class="absolute right-3 bottom-3 rounded-xl bg-black/5 p-2 transition-all hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10"
							>
								{#if copied}
									<Check class="h-3 w-3 text-green-500" />
								{:else}
									<Copy class="h-3 w-3 text-neutral-400" />
								{/if}
							</button>
						</div>
					</div>

					<!-- Styling Tabs -->
					<div class="space-y-6">
						<!-- Colors -->
						<div class="grid grid-cols-2 gap-6">
							<div class="space-y-3">
								<label
									class="flex flex-col gap-3 font-mono text-[0.6rem] tracking-widest text-neutral-500 uppercase"
								>
									Dots Color
									<div
										class="flex items-center gap-3 rounded-2xl border border-black/5 bg-white/30 p-2 dark:border-white/5 dark:bg-black/10"
									>
										<input
											type="color"
											bind:value={dotsColor}
											class="h-8 w-12 cursor-pointer overflow-hidden rounded-lg border-none bg-transparent"
										/>
										<span
											class="font-mono text-[0.7rem] text-neutral-600 uppercase dark:text-neutral-400"
											>{dotsColor}</span
										>
									</div>
								</label>
							</div>
							<div class="space-y-3">
								<label
									class="flex flex-col gap-3 font-mono text-[0.6rem] tracking-widest text-neutral-500 uppercase"
								>
									Background
									<div
										class="flex items-center gap-3 rounded-2xl border border-black/5 bg-white/30 p-2 dark:border-white/5 dark:bg-black/10"
									>
										<input
											type="color"
											bind:value={bgColor}
											class="h-8 w-12 cursor-pointer overflow-hidden rounded-lg border-none bg-transparent"
										/>
										<span
											class="font-mono text-[0.7rem] text-neutral-600 uppercase dark:text-neutral-400"
											>{bgColor}</span
										>
									</div>
								</label>
							</div>
						</div>

						<!-- Dot Styles -->
						<div class="space-y-3">
							<span class="block font-mono text-[0.6rem] tracking-widest text-neutral-500 uppercase"
								>Pattern Style</span
							>
							<div class="flex flex-wrap gap-2">
								{#each dotStyles as style}
									<button
										on:click={() => (dotsType = style.id)}
										class="rounded-xl border px-4 py-2 text-[0.65rem] transition-all {dotsType ===
										style.id
											? 'border-rose-500 bg-rose-500/10 text-rose-600'
											: 'border-black/5 bg-white/20 text-neutral-500 hover:bg-white/50 dark:border-white/5 dark:bg-white/5'}"
									>
										{style.label}
									</button>
								{/each}
							</div>
						</div>

						<!-- Corner Styles -->
						<div class="space-y-3">
							<span class="block font-mono text-[0.6rem] tracking-widest text-neutral-500 uppercase"
								>Corner Shape</span
							>
							<div class="flex flex-wrap gap-2">
								{#each cornerStyles as style}
									<button
										on:click={() => (cornersType = style.id)}
										class="rounded-xl border px-4 py-2 text-[0.65rem] transition-all {cornersType ===
										style.id
											? 'border-rose-500 bg-rose-500/10 text-rose-600'
											: 'border-black/5 bg-white/20 text-neutral-500 hover:bg-white/50 dark:border-white/5 dark:bg-white/5'}"
									>
										{style.label}
									</button>
								{/each}
							</div>
						</div>

						<!-- Logo Integration -->
						<div class="space-y-3 pt-2">
							<div class="flex items-center justify-between">
								<span class="font-mono text-[0.6rem] tracking-widest text-neutral-500 uppercase"
									>Logo Integration</span
								>
								{#if logoFile}
									<button
										on:click={() => (logoFile = null)}
										class="text-[0.6rem] text-rose-500 uppercase underline">Remove</button
									>
								{/if}
							</div>
							<div class="flex gap-4">
								<button
									on:click={() => document.getElementById('logo-upload')?.click()}
									class="flex aspect-square w-16 items-center justify-center rounded-2xl border border-black/5 bg-white/50 text-neutral-400 transition-all hover:border-rose-500/50 hover:text-rose-500 dark:border-white/5 dark:bg-black/20"
								>
									{#if logoFile}
										<img src={logoFile} alt="Logo" class="h-10 w-10 object-contain" />
									{:else}
										<ImageIcon class="h-6 w-6" />
									{/if}
								</button>
								<input
									type="file"
									id="logo-upload"
									class="hidden"
									accept="image/*"
									on:change={handleLogoUpload}
								/>

								<div class="flex flex-1 flex-col justify-center gap-3">
									<label class="space-y-1">
										<div
											class="flex justify-between font-mono text-[0.55rem] text-neutral-400 uppercase"
										>
											<span>Scale</span>
											<span>{(logoSize * 100).toFixed(0)}%</span>
										</div>
										<input
											type="range"
											min="0.1"
											max="0.5"
											step="0.05"
											bind:value={logoSize}
											class="w-full accent-rose-500"
										/>
									</label>
								</div>
							</div>
						</div>
					</div>

					<!-- Secondary Actions -->
					<div class="border-t border-black/5 pt-8 dark:border-white/5">
						<button
							on:click={download}
							class="group flex w-full items-center justify-center gap-3 rounded-2xl bg-neutral-900 py-4 font-mono text-[0.7rem] tracking-[0.2em] text-neutral-50 uppercase shadow-xl transition-all hover:-translate-y-1 dark:bg-neutral-50 dark:text-neutral-900"
						>
							<Download class="h-4 w-4" />
							Export as {extension.toUpperCase()}
						</button>
					</div>
				</div>
			</div>

			<!-- Preview Panel -->
			<div class="animate-pop-up flex flex-col gap-8 lg:col-span-7" style="--delay: 0.2s;">
				<div
					class="relative flex min-h-[400px] flex-1 flex-col items-center justify-center rounded-3xl border border-black/5 bg-white/20 p-8 dark:border-white/5 dark:bg-white/[0.02]"
				>
					<!-- Canvas Orbit Decoration -->
					<div class="absolute inset-0 -z-10 flex items-center justify-center opacity-30">
						<div
							class="h-[300px] w-[300px] animate-[spin_60s_linear_infinite] rounded-full border border-dashed border-rose-500/20"
						></div>
						<div
							class="absolute h-[400px] w-[400px] animate-[spin_90s_linear_infinite_reverse] rounded-full border border-dashed border-neutral-500/10"
						></div>
					</div>

					<div class="group relative">
						<!-- Glow Effect -->
						<div
							class="absolute -inset-10 -z-10 rounded-full bg-rose-500/10 blur-[100px] transition-all group-hover:bg-rose-500/20"
						></div>

						<div
							bind:this={canvasContainer}
							class="overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all duration-500 group-hover:scale-[1.02] dark:bg-white"
						>
							<!-- QR Canvas will be appended here -->
						</div>
					</div>

					<div class="mt-12 flex items-center gap-6">
						<div class="flex items-center gap-2">
							<Sparkles class="h-3 w-3 text-rose-500" />
							<span class="font-mono text-[0.6rem] tracking-widest text-neutral-500 uppercase"
								>Vector Quality</span
							>
						</div>
						<div class="h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
						<div class="flex items-center gap-2">
							<Settings2 class="h-3 w-3 text-rose-500" />
							<span class="font-mono text-[0.6rem] tracking-widest text-neutral-500 uppercase"
								>Real-time Update</span
							>
						</div>
					</div>
				</div>

				<!-- Educational Tip -->
				<div
					class="flex gap-4 rounded-3xl border border-neutral-200 bg-white/50 p-6 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/50"
				>
					<div
						class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500"
					>
						<Info class="h-5 w-5" />
					</div>
					<div class="space-y-1">
						<p class="font-mono text-[0.6rem] tracking-widest text-neutral-400 uppercase">
							Pro Tip
						</p>
						<p class="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
							High contrast between the dots and background ensures better readability. If using a
							logo, keep it centered and don't make it too large to avoid blocking critical data
							patterns.
						</p>
					</div>
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

	/* Custom Range Input Styling for Chrome */
	input[type='range'] {
		-webkit-appearance: none;
		appearance: none;
		background: transparent;
	}
	input[type='range']::-webkit-slider-runnable-track {
		width: 100%;
		height: 4px;
		background: rgba(0, 0, 0, 0.05);
		border-radius: 2px;
	}
	:global(.dark) input[type='range']::-webkit-slider-runnable-track {
		background: rgba(255, 255, 255, 0.05);
	}
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		height: 16px;
		width: 16px;
		border-radius: 50%;
		background: #e11d48;
		cursor: pointer;
		margin-top: -6px;
		border: 2px solid white;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
	}
</style>
