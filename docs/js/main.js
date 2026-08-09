// LOTUS.css docs site

import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import scss from 'highlight.js/lib/languages/scss';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';

hljs.registerLanguage('xml', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);

// The framework's code module picks this up to highlight every <pre><code>.
window.hljs = hljs;

import { init, toast } from '../../js/index';

init();

// Live clock inside the demo nav.
const clock = document.getElementById('clock');
if (clock) {
	const tick = () => {
		const now = new Date();
		clock.textContent = now.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		});
	};
	tick();
	setInterval(tick, 1000);
}

// Toast demo — declarative buttons wired to the framework's toast() API.
document.querySelectorAll('[data-toast-demo]').forEach((btn) => {
	btn.addEventListener('click', () => {
		const type = btn.dataset.toastDemo;
		toast(btn.dataset.toastText || 'Hello from lotus.js', {
			type,
			title: btn.dataset.toastTitle,
		});
	});
});

// Carousel: label the demo track with its card count.
const carouselTrack = document.querySelector('[data-carousel-track]');
if (carouselTrack) {
	const cards = carouselTrack.querySelectorAll('.carousel-item');
	carouselTrack.setAttribute('aria-label', `${cards.length} cards — scroll or use the arrows`);
}
