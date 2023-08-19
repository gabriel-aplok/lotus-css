// document.body.classList.add('dark');

function switchMode(element) {
	const bodyClass = document.body.classList;
	bodyClass.contains('dark') ? (element.innerHTML = '☀️', bodyClass.remove('dark')) : (element.innerHTML = '🌙', bodyClass.add('dark'));
}