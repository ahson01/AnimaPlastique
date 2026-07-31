<script lang="ts">
	type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

	let name = '';
	let email = '';
	let project_type = 'Landing page';
	let timeline = 'As soon as possible';
	let budget = 'Not sure yet';
	let details = '';
	let status: FormStatus = 'idle';
	let errorMessage = '';

	import { currency, formatPrice } from '$lib/stores/currency';

	let budgetOptions: { value: string; label: string }[];
	$: budgetOptions = [
		{ value: 'Not sure yet', label: 'Not sure yet' },
		{ value: 'Up to ₹4k', label: `Up to ${formatPrice(4000, $currency)}` },
		{
			value: '₹4k – ₹10k',
			label: `${formatPrice(4000, $currency)} – ${formatPrice(10000, $currency)}`
		},
		{
			value: '₹10k – ₹25k',
			label: `${formatPrice(10000, $currency)} – ${formatPrice(25000, $currency)}`
		},
		{ value: '₹25k+', label: `${formatPrice(25000, $currency)}+` }
	];

	function validate() {
		if (!name.trim()) {
			errorMessage = 'Please tell us your name.';
			return false;
		}
		if (!email.trim()) {
			errorMessage = 'Please add your email so we can reply.';
			return false;
		}
		if (!details.trim()) {
			errorMessage = 'Please share a few details about your project.';
			return false;
		}
		errorMessage = '';
		return true;
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!validate()) return;
		status = 'submitting';

		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name,
					email,
					project_type,
					timeline,
					budget,
					details
				})
			});

			const data = await res.json().catch(() => ({}));

			if (!res.ok || !data.success) {
				status = 'error';
				errorMessage =
					data?.error || 'Something went wrong while sending your message. Please try again later.';
				return;
			}

			status = 'success';
			name = '';
			email = '';
			project_type = 'Landing page';
			timeline = 'As soon as possible';
			budget = 'Not sure yet';
			details = '';
		} catch (e) {
			console.error(e);
			status = 'error';
			errorMessage = 'Something went wrong while sending your message. Please try again later.';
		}
	}
</script>

<svelte:head>
	<title>Contact · xkinetics.space</title>
	<meta
		name="description"
		content="Start a project with xkinetics.space – a web dev studio focused on clean, modern, scalable sites."
	/>
</svelte:head>

<section
	class="relative flex w-full justify-center overflow-hidden bg-[var(--bg)] text-[var(--text)]"
>
	<!-- soft background glows -->
	<div class="pointer-events-none absolute inset-0 -z-10">
		<!-- top-left light glow -->
		<div
			class="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,var(--glow-soft),transparent)] opacity-25
             blur-3xl"
		></div>

		<!-- bottom-right neutral shadow -->
		<div
			class="absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,var(--glow-muted),transparent)] opacity-30
             blur-3xl"
		></div>

		<!-- reddish accent gradient -->
		<div
			class="absolute right-0 bottom-0 h-[40rem] w-[40rem] translate-x-1/3 translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,var(--glow-accent),transparent)]
             opacity-40 blur-[120px]"
		></div>
	</div>

	<div class="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pt-18 pb-24 lg:pt-22">
		<!-- Header row -->
		<div class="max-w-3xl space-y-6">
			<p
				class="animate-pop-up bg-gradient-to-r from-emerald-400 to-green-500
           bg-clip-text font-mono text-[0.65rem] tracking-[0.35em] text-transparent uppercase"
			>
				xkinetics.space · contact
			</p>
			<h1
				class="rapid-text font-inter text-4xl leading-tight -tracking-[0.06em] text-balance
               text-[var(--text-strong)] sm:text-5xl lg:text-6xl"
			>
				<span class="reveal-line block">Tell us about the website</span>
				<span class="reveal-line block">you want to launch.</span>
			</h1>
		</div>

		<!-- Main grid -->
		<div class="flex flex-col gap-10 lg:flex-row">
			<!-- Contact form -->
			<div
				class="animate-pop-up w-full max-w-xl rounded-2xl border border-[var(--border)]
               bg-[var(--card-bg-soft)] p-6 shadow-lg backdrop-blur"
			>
				<form class="space-y-5" on:submit={handleSubmit}>
					<!-- Name -->
					<div class="space-y-1.5">
						<label
							for="name"
							class="block font-mono text-[0.65rem] tracking-[0.25em] text-[var(--text-muted)] uppercase"
						>
							Your name
						</label>
						<input
							id="name"
							name="name"
							type="text"
							placeholder="Who should we say hello to?"
							bind:value={name}
							class="block w-full rounded-lg border border-[var(--border)] bg-[var(--chip-bg)] px-3 py-2 text-sm
                     text-[var(--text-strong)] shadow-sm transition outline-none
                     placeholder:text-[var(--text-muted)]
                     focus:border-[var(--text-strong)] focus:ring-1 focus:ring-[var(--text-strong)]"
						/>
					</div>

					<!-- Email -->
					<div class="space-y-1.5">
						<label
							for="email"
							class="block font-mono text-[0.65rem] tracking-[0.25em] text-[var(--text-muted)] uppercase"
						>
							Email
						</label>
						<input
							id="email"
							name="email"
							type="email"
							placeholder="you@example.com"
							bind:value={email}
							required
							class="block w-full rounded-lg border border-[var(--border)] bg-[var(--chip-bg)] px-3 py-2 text-sm
                     text-[var(--text-strong)] shadow-sm transition outline-none
                     placeholder:text-[var(--text-muted)]
                     focus:border-[var(--text-strong)] focus:ring-1 focus:ring-[var(--text-strong)]"
						/>
					</div>

					<!-- Project type / timeline -->
					<div class="grid gap-4 sm:grid-cols-2">
						<div class="space-y-1.5">
							<label
								for="project_type"
								class="block font-mono text-[0.65rem] tracking-[0.25em] text-[var(--text-muted)] uppercase"
							>
								Project type
							</label>
							<select
								id="project_type"
								name="project_type"
								bind:value={project_type}
								class="block w-full rounded-lg border border-[var(--border)] bg-[var(--chip-bg)] px-3 py-2 text-sm
                       text-[var(--text-strong)] shadow-sm transition outline-none
                       focus:border-[var(--text-strong)] focus:ring-1 focus:ring-[var(--text-strong)]"
							>
								<option>Landing page</option>
								<option>Marketing site (multi-page)</option>
								<option>Product / app site</option>
								<option>Redesign of existing site</option>
								<option>Something else</option>
							</select>
						</div>

						<div class="space-y-1.5">
							<label
								for="timeline"
								class="block font-mono text-[0.65rem] tracking-[0.25em] text-[var(--text-muted)] uppercase"
							>
								Ideal timeline
							</label>
							<select
								id="timeline"
								name="timeline"
								bind:value={timeline}
								class="block w-full rounded-lg border border-[var(--border)] bg-[var(--chip-bg)] px-3 py-2 text-sm
                       text-[var(--text-strong)] shadow-sm transition outline-none
                       focus:border-[var(--text-strong)] focus:ring-1 focus:ring-[var(--text-strong)]"
							>
								<option>As soon as possible</option>
								<option>Within 1–2 weeks</option>
								<option>Within 1–2 months</option>
								<option>Just exploring options</option>
							</select>
						</div>
					</div>

					<!-- Budget -->
					<div class="space-y-1.5">
						<label
							for="budget"
							class="block font-mono text-[0.65rem] tracking-[0.25em] text-[var(--text-muted)] uppercase"
						>
							Approx. budget
						</label>
						<select
							id="budget"
							name="budget"
							bind:value={budget}
							class="block w-full rounded-lg border border-[var(--border)] bg-[var(--chip-bg)] px-3 py-2 text-sm
                     text-[var(--text-strong)] shadow-sm transition outline-none
                     focus:border-[var(--text-strong)] focus:ring-1 focus:ring-[var(--text-strong)]"
						>
							{#each budgetOptions as option}
								<option value={option.value}>{option.label}</option>
							{/each}
						</select>
					</div>

					<!-- Message -->
					<div class="space-y-1.5">
						<label
							for="details"
							class="block font-mono text-[0.65rem] tracking-[0.25em] text-[var(--text-muted)] uppercase"
						>
							Project details
						</label>
						<textarea
							id="details"
							name="details"
							rows="3"
							bind:value={details}
							placeholder="Share links, goals, pages you need..."
							class="block w-full rounded-lg border border-[var(--border)] bg-[var(--chip-bg)] px-3 py-2 text-sm
                     text-[var(--text-strong)] shadow-sm transition outline-none
                     placeholder:text-[var(--text-muted)]
                     focus:border-[var(--text-strong)] focus:ring-1 focus:ring-[var(--text-strong)]"
						></textarea>
					</div>

					<!-- Status + submit -->
					{#if errorMessage}
						<p class="text-xs text-red-500">{errorMessage}</p>
					{/if}

					{#if status === 'success'}
						<p class="text-xs text-emerald-500">
							Thanks! Your message has been sent. We’ll get back to you soon.
						</p>
					{/if}

					<button
						type="submit"
						class="interactable hover:bg-[color-mix(in_oklab,var(--text-strong) 85%,white)] inline-flex items-center justify-center rounded-full border border-[var(--text-strong)] bg-[var(--text-strong)]
                   px-4 py-2
                   text-xs font-medium tracking-[0.2em]
                   text-[var(--bg)] uppercase shadow-sm transition
                   disabled:cursor-not-allowed disabled:opacity-60"
						disabled={status === 'submitting'}
					>
						{#if status === 'submitting'}
							Sending…
						{:else}
							Send message
						{/if}
					</button>
				</form>
			</div>

			<!-- Side info panel -->
			<div class="space-y-6 text-xs sm:text-[0.75rem]">
				<div class="space-y-2">
					<p
						class="animate-pop-up bg-gradient-to-r from-emerald-400 to-green-500
               bg-clip-text font-mono text-[0.65rem] tracking-[0.25em] text-transparent uppercase"
					style="--delay: 0.05s;"
				>
					What to expect
					</p>
					<ul class="space-y-1.5 text-[var(--text-soft)]">
						<li class="animate-pop-up" style="--delay: 0.05s;">
							→ A quick email back with clarifying questions, if needed.
						</li>
						<li class="animate-pop-up" style="--delay: 0.07s;">
							→ Optional short call to align on goals, scope, and timeline.
						</li>
						<li class="animate-pop-up" style="--delay: 0.08s;">
							→ Clear pricing and a simple, no-surprise project outline.
						</li>
					</ul>
				</div>

				<div class="space-y-2">
					<p
						class="animate-pop-up bg-gradient-to-r from-emerald-400 to-green-500
               bg-clip-text font-mono text-[0.65rem] tracking-[0.25em] text-transparent uppercase"
					style="--delay :0.03s;"
				>
					Good fits
					</p>
					<ul class="space-y-1.5 text-[var(--text-soft)]">
						<li class="animate-pop-up" style="--delay: 0.05s;">
							→ You value clean, modern design and thoughtful UX.
						</li>
						<li class="animate-pop-up" style="--delay: 0.06s;">
							→ You want a site that feels light, fast, and future-proof.
						</li>
						<li class="animate-pop-up" style="--delay: 0.09s;">
							→ You’re okay with opinionated suggestions on structure.
						</li>
					</ul>
				</div>

				<div
					class="animate-pop-up rounded-2xl border border-[var(--border)]
                 bg-[var(--card-bg-soft)] p-4 text-xs shadow-md backdrop-blur"
				>
					<p
						class="font-mono text-[0.65rem] tracking-[0.25em] text-[var(--text-muted)]
               uppercase"
					>
						Direct contact
					</p>
					<div class="mt-3 space-y-1.5 text-[var(--text-soft)]">
						<p>
							Email:
							<span class="font-mono">hello@xkinetics.space</span>
						</p>
						<p>
							Preferred: a couple of links (if any), your rough timeline, and what “success” looks
							like for this site.
						</p>
					</div>
				</div>

				<p class="text-[0.7rem] text-[var(--text-muted)]">
					Not ready for a full project yet? You can still reach out for a small audit, suggestions
					on your current site, or help choosing a stack.
				</p>
			</div>
		</div>
	</div>
</section>

<style>
	/* Remove this block if you already set these vars globally
     in another route/layout. Otherwise this keeps Contact themed. */

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
		--glow-accent: rgba(52, 211, 153, 0.35);
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
		--glow-accent: rgba(16, 185, 129, 0.35);
		--glow-green: rgba(52, 211, 153, 0.22);
	}
</style>
