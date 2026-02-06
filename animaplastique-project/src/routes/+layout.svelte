<script lang="ts">
	import Header from './Header.svelte';
	import '../app.css';
	import { currency } from '$lib/stores/currency';

	let { children, data }: { children: any; data: { currency: any } } = $props();

	$effect(() => {
		if (data.currency) {
			currency.set(data.currency);
		}
	});
</script>

<div class="app">
	<Header />

	<main>
		{@render children()}
	</main>
</div>
