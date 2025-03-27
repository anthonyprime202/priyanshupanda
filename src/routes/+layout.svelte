<script lang="ts">
	import { fly } from 'svelte/transition';
	import '../app.scss';
	let { children } = $props();

	let showNav = $state(false);
	let hoveredNavPos = $state<number | null>(null);
	let navItems = $state([
		{ pos: 0, label: 'projects', href: '/projects' },
		{ pos: 1, label: 'about', href: '/about' },
		{ pos: 2, label: 'blogs', href: '/blogs' },
	]);
</script>

<nav>
	{#if showNav}
		<ul>
			{#each navItems as { pos, label, href } (pos)}
				<li
					in:fly|global={{ x: 20, duration: 250, delay: pos * 50 }}
					out:fly|global={{ x: 20, duration: 250 }}
					onmouseenter={() => (hoveredNavPos = pos)}
					onmouseleave={() => (hoveredNavPos = null)}
				>
					{#if hoveredNavPos === pos}
						<span class="hover-text-span" transition:fly|global={{ duration: 250, x: -20 }}>cd</span
						>
					{/if}

					<a {href}>{label}</a>
				</li>
			{/each}
		</ul>
	{/if}
	<button onclick={() => (showNav = !showNav)}>
		{#if showNav}
			<span class="hover-text-span" transition:fly|global={{ duration: 250, x: -20 }}>c</span>
		{/if}ls
	</button>
</nav>

{@render children()}

<style lang="scss">
	nav {
		position: absolute;
		right: 3em;
		bottom: 1em;
		text-align: end;
		font-size: 1.1em;
	}

	button {
		background: none;
		outline: none;
		border: none;
		color: inherit;
		font-size: inherit;
		cursor: pointer;
	}

	ul {
		display: flex;
		align-items: end;
		flex-direction: column;
	}

	li {
		list-style: none;
		position: relative;
		width: fit-content;
		&::after {
			content: '';
			background: var(--accent-color);
			width: 0;
			height: 2px;
			position: absolute;
			bottom: 4px;
			left: 0;
			transition: width 0.25s;
		}

		&:hover::after {
			width: 100%;
		}
	}

	li,
	button {
		padding-block: 0.3em;
	}
	
	a {
		color: inherit;
		text-decoration: none;
	}

	.hover-text-span {
		color: var(--accent-color);
	}
</style>
