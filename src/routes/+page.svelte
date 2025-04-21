<script lang="ts">
	import Icon from "@iconify/svelte";
	import Config from "$lib/config";
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
		<img src="/avatar.jpg" alt="my user avatar" transition:fly={{ y: 20, duration: 1000 }} />

		<section class="info">
			<h1 transition:fly={{ y: 20, duration: 1100, delay: 100 }}>{Config.title}</h1>
			<p transition:fly={{ y: 20, duration: 1200, delay: 200 }}>{Config.subtitle}</p>
			<ul class="links" transition:fly={{ y: 20, duration: 1000, delay: 300 }}>
				<li class="link">
					<a href="https://instagram.com/{Config.socials.instagram}"
						><Icon icon="lucide:instagram" /></a
					>
				</li>
				<li class="link">
					<a href="https://github.com/{Config.socials.github}"><Icon icon="lucide:github" /></a>
				</li>
				<li class="link">
					<a href="https://www.linkedin.com/in/{Config.socials.linkedin}/"
						><Icon icon="lucide:linkedin" /></a
					>
				</li>
				<li class="link">
					<a href="mailto:{Config.socials.email}"><Icon icon="lucide:mail" /></a>
				</li>
			</ul>
		</section>

		<section class="tech">
			<h2 transition:fly={{ y: 20, duration: 1000, delay: 350 }}>My Development Suite</h2>
			<div class="stack" transition:fly={{ y: 20, duration: 1000, delay: 400 }}>
				<div class="languages">
					<ul>
						{#each Config.skills.languages as { name, source }}
							<li><a href={source} target="_blank">{name}</a></li>
						{/each}
					</ul>
				</div>
				<div class="frameworks">
					<ul>
						{#each Config.skills.frameworks as { name, source }}
							<li><a href={source} target="_blank">{name}</a></li>
						{/each}
					</ul>
				</div>
				<div class="tools">
					<ul>
						{#each Config.skills.tools as { name, source }}
							<li><a href={source} target="_blank">{name}</a></li>
						{/each}
					</ul>
				</div>
			</div>
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
		transition: scale 0.25s !important;
		&:hover {
			scale: 1.08;
		}
	}

	a {
		color: inherit;
		display: inline-block;
		text-decoration: none;
	}

	.info {
		display: grid;
		gap: 1rem;
		width: clamp(25em, 75vw, 40em);

		p {
			color: var(--color-secondary);
		}
	}

	.links {
		list-style: none;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		font-size: clamp(1rem, 5vw, 1.5rem);
		color: var(--color-secondary);

		a {
			transition: scale 0.25s !important;

			&:hover,
			&:active,
			&:focus {
				scale: 1.2;
				outline: none;
			}
		}
	}

	.tech {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	h2 {
		font-size: 1.2em;
		font-weight: 400;
	}

	.stack {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 9vw;

		ul {
			list-style: none;
			display: grid;
			gap: 1em;
			font-size: 0.9em;
			font-family: "Fira Mono", sans-serif;
			color: var(--color-secondary);
		}
	}

	.languages ul {
		text-align: start;
	}

	.frameworks ul {
		text-align: center;
	}

	.tools ul {
		text-align: end;
	}
</style>
