import { writable } from "svelte/store";

const storedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme): dark").matches;
const initialTheme = storedTheme ? storedTheme : (prefersDark ? "dark" : "light"); 

export const appTheme = writable(initialTheme);

appTheme.subscribe((value) => {
	localStorage.setItem("theme", value);
	document.documentElement.classList.toggle("dark", value === "dark");
})

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  appTheme.set(e.matches ? "dark" : "light");
});
