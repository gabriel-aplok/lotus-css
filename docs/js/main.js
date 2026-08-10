// LOTUS.css docs site

import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import scss from "highlight.js/lib/languages/scss";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";

hljs.registerLanguage("xml", xml);
hljs.registerLanguage("css", css);
hljs.registerLanguage("scss", scss);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("json", json);

// The framework's code module picks this up to highlight every <pre><code>.
window.hljs = hljs;

import { init } from "../../js/index";
import { renderSamples } from "./samples";

// Fill every <pre data-sample="..."> from samples.js first, then hand the
// page to the framework so copy buttons and highlighting cover them too.
renderSamples();
init();

// Live clock inside the demo nav.
const clock = document.getElementById("clock");
if (clock) {
  const tick = () => {
    const now = new Date();
    clock.textContent = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };
  tick();
  setInterval(tick, 1000);
}

// Carousel: label the demo track with its card count.
const carouselTrack = document.querySelector("[data-carousel-track]");
if (carouselTrack) {
  const cards = carouselTrack.querySelectorAll(".carousel-item");
  carouselTrack.setAttribute(
    "aria-label",
    `${cards.length} cards, scroll or use the arrows`,
  );
}

// Components sidebar: on small screens the 28-link list starts collapsed behind
// the sticky "Jump to a component" toggle so the content sits above the fold,
// and picking a destination closes the list again.
const componentNav = document.querySelector(".components-sidebar");
if (componentNav) {
  if (window.matchMedia("(max-width: 900px)").matches) {
    componentNav.removeAttribute("open");
  }
  // Only auto-close on small screens: on desktop the sidebar is always expanded
  // and the summary is hidden, so removing 'open' there would strand the nav.
  componentNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 900px)").matches) {
        componentNav.removeAttribute("open");
      }
    });
  });
}
