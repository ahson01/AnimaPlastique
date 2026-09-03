<script lang="ts">
	import { onMount } from 'svelte';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import '../app.css';
	import { initializeCurrency } from '$lib/stores/currency';

	let { children }: { children: any } = $props();

	onMount(() => {
		initializeCurrency();
	});
</script>

<div class="app">
	<Header />

	<main>
		{@render children()}
	</main>

	<Footer />
</div>
