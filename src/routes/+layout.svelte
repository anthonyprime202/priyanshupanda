<script lang="ts">
	import "../app.scss";

	import { fly } from "svelte/transition";
	import { browser } from "$app/environment";
	import { onMount } from "svelte";
	import { page } from "$app/state";
	import type { Theme } from "$lib/types";
	import Icon from "@iconify/svelte";
	import Config from "$lib/config";

	let { children } = $props();

	// Nav part of the code
	let showNav = $state(false);
	let hoveredNavPos = $state<number | null>(null);
	let navItems = $state([
		{ pos: 0, label: "home", href: "/" },
		{ pos: 1, label: "projects", href: "/projects" },
		{ pos: 2, label: "about", href: "/about" },
		{ pos: 3, label: "blogs", href: "/blogs" },
	]);

	function getInitialTheme(): Theme {
		const storedTheme = browser && localStorage.getItem("theme");
		return !storedTheme ? "system" : storedTheme === "dark" ? storedTheme : "light";
	}

	let theme = $state<Theme>(getInitialTheme());
	let themeIcons = {
		dark: "lucide:moon",
		light: "lucide:sun",
		system: "lucide:sun-moon",
	};

	function toggleTheme() {
		theme = theme === "dark" ? "light" : theme === "light" ? "system" : "dark";
	}

	$effect(() => {
		let isDark = false;
		switch (theme) {
			case "dark":
			case "light":
				localStorage.setItem("theme", theme);
				isDark = theme === "dark";
				break;
			case "system":
				localStorage.removeItem("theme");
				isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
				break;
		}
		document.documentElement.classList.toggle("dark", isDark);
	});

	onMount(() => {
		window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
			if (theme === "system") {
				document.documentElement.classList.toggle("dark", e.matches);
			}
		});
		requestAnimationFrame(() => {
			// Delay until after first paint so that it doesn't give flashbang 💥
			document.documentElement.classList.add("theme-transition");
		});
	});
</script>

<svelte:head>
	<title>{Config.name}</title>
</svelte:head>

<button class="theme-button" onclick={toggleTheme}><Icon icon={themeIcons[theme]} /></button>

<nav>
	{#if showNav}
		<ul>
			{#each navItems as { pos, label, href }}
				<li
					class:hidden={href === page.url.pathname}
					in:fly|global={{ x: 20, duration: 250, delay: pos * 50 }}
					out:fly|global={{ x: 20, duration: 250 }}
					translate="yes"
					onmouseenter={() => (hoveredNavPos = pos)}
					onmouseleave={() => (hoveredNavPos = null)}
				>
					{#if hoveredNavPos === pos || href === page.url.pathname}
						<span class="hover-text-span" transition:fly|global={{ duration: 250, x: -20 }}>c{#if href === page.url.pathname}<span transition:fly|global={{ duration: 250, y: -20 }}>w</span>{/if}d</span
						>
					{/if}

					<a {href}>{label}</a>
				</li>
			{/each}
		</ul>
	{/if}
	<button class="nav-button" onclick={() => (showNav = !showNav)}>
		{#if showNav}
			<span class="hover-text-span" transition:fly|global={{ duration: 250, x: -20 }}>c</span>
		{/if}ls
	</button>
</nav>

{@render children()}

<style lang="scss">
	nav {
		position: absolute;
		right: 2.5em;
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
			content: "";
			background: var(--accent-color);
			width: 0;
			height: 2px;
			position: absolute;
			bottom: 4px;
			left: 0;
			transition: width 0.25s !important;
		}

		&:hover::after {
			width: 100%;
		}
	}

	li,
	.nav-button {
		padding-block: 0.3em;
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	.hover-text-span {
		color: var(--accent-color);
	}

	.theme-button {
		position: absolute;
		top: 2em;
		right: 2em;
		font-size: 1.3em;
	}
</style>
