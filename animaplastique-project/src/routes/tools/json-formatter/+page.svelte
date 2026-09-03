<script lang="ts">
	import { Code2, Copy, Trash2, Check, AlertCircle, Maximize2, Minimize2 } from 'lucide-svelte';
	import GlowBackdrop from '$lib/components/GlowBackdrop.svelte';

	let input = '';
	let output = '';
	let error = '';
	let copied = false;

	function formatJSON() {
		error = '';
		try {
			if (!input.trim()) {
				output = '';
				return;
			}
			const parsed = JSON.parse(input);
			output = JSON.stringify(parsed, null, 2);
		} catch (err) {
			error = (err as Error).message;
			output = '';
		}
	}

	function minifyJSON() {
		error = '';
		try {
			if (!input.trim()) {
				output = '';
				return;
			}
			const parsed = JSON.parse(input);
			output = JSON.stringify(parsed);
		} catch (err) {
			error = (err as Error).message;
			output = '';
		}
	}

	async function copyToClipboard() {
		if (!output) return;
		await navigator.clipboard.writeText(output);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}

	function clearAll() {
		input = '';
		output = '';
		error = '';
	}
</script>

<svelte:head>
	<title>Free Online JSON Formatter | xkinetics</title>
	<meta name="description" content="Format, validate, and beautify JSON data online." />
</svelte:head>

<section
	class="relative isolate flex min-h-screen w-full justify-center overflow-hidden bg-[var(--bg)] dark:bg-neutral-950"
>
	<GlowBackdrop />

	<div class="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pt-18 pb-24 lg:pt-22">
		<div class="max-w-3xl space-y-7">
			<p
				class="animate-pop-up bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text font-mono text-[0.65rem] tracking-[0.35em] text-transparent uppercase"
			>
				Privacy-first · JSON Formatter
			</p>
			<p class="max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
				Clean, format, and validate your JSON data instantly. Processing is 100% client-side.
			</p>
		</div>

		<div class="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
			<div class="animate-pop-up flex flex-col gap-4" style="--delay: 0.1s;">
				<div
					class="flex items-center justify-between font-mono text-[0.65rem] tracking-[0.2em] text-neutral-500 uppercase"
				>
					<span>Input JSON</span>
					<button
						on:click={clearAll}
						class="flex items-center gap-1 transition-colors hover:text-emerald-500"
					>
						<Trash2 class="h-3 w-3" /> Clear
					</button>
				</div>
				<textarea
					bind:value={input}
					placeholder="Paste your JSON here..."
					class="min-h-[400px] flex-1 resize-none rounded-2xl border border-black/10 bg-white/40 p-6 font-mono text-sm shadow-inner backdrop-blur-md transition-all outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-white/5"
				></textarea>

				<div class="flex gap-3">
					<button
						on:click={formatJSON}
						class="flex-1 rounded-full bg-neutral-900 py-3 font-mono text-[0.7rem] tracking-[0.2em] text-neutral-50 uppercase shadow-md transition-all hover:-translate-y-0.5 dark:bg-neutral-50 dark:text-neutral-900"
					>
						<Maximize2 class="mr-2 inline-block h-4 w-4" /> Format
					</button>
					<button
						on:click={minifyJSON}
						class="flex-1 rounded-full border border-black/10 py-3 font-mono text-[0.7rem] tracking-[0.2em] text-neutral-900 uppercase transition-all hover:bg-black/5 dark:border-white/10 dark:text-neutral-50 dark:hover:bg-white/5"
					>
						<Minimize2 class="mr-2 inline-block h-4 w-4" /> Minify
					</button>
				</div>
			</div>

			<div class="animate-pop-up flex flex-col gap-4" style="--delay: 0.2s;">
				<div
					class="flex items-center justify-between font-mono text-[0.65rem] tracking-[0.2em] text-neutral-500 uppercase"
				>
					<span>Formatted Output</span>
					{#if output}
						<button
							on:click={copyToClipboard}
							class="flex items-center gap-1 transition-colors hover:text-green-500"
						>
							{#if copied}
								<Check class="h-3 w-3" /> Copied
							{:else}
								<Copy class="h-3 w-3" /> Copy
							{/if}
						</button>
					{/if}
				</div>
				<div
					class="relative min-h-[400px] flex-1 overflow-hidden rounded-2xl border border-black/10 bg-white/60 dark:bg-black/20"
				>
					<textarea
						readOnly
						value={output}
						placeholder="Result will appear here..."
						class="h-full w-full resize-none bg-transparent p-6 font-mono text-sm outline-none {error
						? 'text-red-500'
						: 'text-neutral-900 dark:text-neutral-50'}"
					></textarea>

					{#if error}
						<div
							class="absolute right-6 bottom-6 left-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800/50 dark:bg-red-950/30"
						>
							<AlertCircle class="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" />
							<p class="font-mono text-xs leading-relaxed text-red-600 dark:text-red-400">
								{error}
							</p>
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
