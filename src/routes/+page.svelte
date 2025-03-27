<script lang="ts">
	import Icon from '@iconify/svelte';
	import Config from '$lib/config';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let delayShow = $state(false);

	onMount(() => {
		setTimeout(() => {
			delayShow = true;
		}, 100);
	});
</script>

{#if delayShow}
	<main>
		<img src="/avatar.jpg" alt="my user avatar" transition:fly={{ y: 20, duration: 1000 }} />

		<section class="info">
			<h1 transition:fly={{ y: 20, duration: 1100, delay: 100 }}>Hello! This is {Config.name}</h1>
			<p transition:fly={{ y: 20, duration: 1200, delay: 200 }}>
				Hello! I'm Priyanshu Panda. Also known as Anthony Prime on many platforms. Below are some of
				my contacts &gt;_&lt;
			</p>
			<ul class="links" transition:fly={{ y: 20, duration: 1000, delay: 300 }}>
				<li class="link">
					<a href="https://instagram.com/{Config.instagram}"><Icon icon="lucide:instagram" /></a>
				</li>
				<li class="link">
					<a href="https://github.com/{Config.github}"><Icon icon="lucide:github" /></a>
				</li>
				<li class="link">
					<a href="https://www.linkedin.com/in/{Config.linkedin}/"
						><Icon icon="lucide:linkedin" /></a
					>
				</li>
				<li class="link"><a href="mailto:{Config.email}"><Icon icon="lucide:mail" /></a></li>
			</ul>
		</section>
	</main>
{/if}

<style lang="scss">
	$shadow: #00000088;

	main {
		height: 100dvh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2.5rem;
		text-align: center;
		margin-top: -3rem;
	}

	img {
		width: clamp(10rem, 38vw, 13rem);
		border-radius: 100%;
		box-shadow: 0 0 10px 2px $shadow;
		transition: scale 0.25s;
		&:hover {
			scale: 1.09;
		}
	}

	section {
		display: grid;
		gap: 1rem;
		max-width: 30em;

		p {
			color: var(--color-secondary);
		}
	}

	ul {
		list-style: none;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		font-size: clamp(1rem, 5vw, 1.5rem);
		color: var(--color-secondary);
	}

	a {
		display: inline-block;
		transition: scale 0.25s;
		color: inherit;

		&:hover,
		&:active,
		&:focus {
			scale: 1.2;
			outline: none;
		}
	}
</style>
