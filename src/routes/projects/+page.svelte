<script lang="ts">
	import { onMount } from "svelte";
	import { fly } from "svelte/transition";

	let delayShow = $state(false);

	onMount(() => {
		setTimeout(() => {
			delayShow = true;
		}, 100);
	});
</script>

{#if delayShow}
	<main>
		<h1 transition:fly={{ y: 20, duration: 1000 }}>WORK IN PROGRESS ⚠️</h1>
	</main>
{/if}

<style>
	main {
		height: 100vh;
		width: 100%;
		display: grid;
		place-items: center;
	}
</style>
