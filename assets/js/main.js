function switchMode(element) {
	const bodyClass = document.body.classList;
	bodyClass.contains('dark') ? (element.innerHTML = '☀️', bodyClass.remove('dark')) : (element.innerHTML = '🌙', bodyClass.add('dark'));
}

const toggleTheme = document.querySelector(".toggle-theme");
const moon = toggleTheme.firstElementChild;
const sun = toggleTheme.lastElementChild;

if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
	if (localStorage.getItem("theme") === null) {
		localStorage.setItem("theme", "light");
	}
} else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
	if (localStorage.getItem("theme") === null) {
		localStorage.setItem("theme", "dark");
	}
}

if (localStorage.getItem("theme") === "light") {
	document.body.classList.remove("dark");
	moon.style.display = "none";
	sun.style.display = "inline-block";
} else {
	document.body.classList.add("dark");
	moon.style.display = "inline-block";
	sun.style.display = "none";
}

toggleTheme.addEventListener("click", () => {
	document.body.classList.toggle("dark");

	if (document.body.classList.contains("dark")) {
		localStorage.setItem("theme", "dark");
		moon.style.display = "inline-block";
		sun.style.display = "none";
	} else {
		localStorage.setItem("theme", "light");
		moon.style.display = "none";
		sun.style.display = "inline-block";
	}
});