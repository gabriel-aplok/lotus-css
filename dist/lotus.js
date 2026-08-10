// js/toast.ts
var stack = null;
function getStack() {
  if (stack && stack.isConnected) return stack;
  let el = document.querySelector("[data-toast-stack]");
  if (!el) {
    el = document.createElement("div");
    el.className = "toast-stack";
    el.setAttribute("data-toast-stack", "");
    document.body.appendChild(el);
  }
  stack = el;
  return el;
}
function toast(message, options = {}) {
  const { type = "default", title, duration = 4e3, onDismiss } = options;
  const host = getStack();
  const item = document.createElement("div");
  item.className = `toast-item${type !== "default" ? ` ${type}` : ""}`;
  item.setAttribute("role", "status");
  item.setAttribute("aria-live", "polite");
  if (title) {
    const titleEl = document.createElement("div");
    titleEl.className = "toast-title";
    titleEl.textContent = title;
    item.appendChild(titleEl);
  }
  const body = document.createElement("div");
  body.className = "toast-body";
  body.textContent = message;
  item.appendChild(body);
  const dismissBtn = document.createElement("button");
  dismissBtn.className = "toast-close";
  dismissBtn.type = "button";
  dismissBtn.setAttribute("aria-label", "Dismiss");
  dismissBtn.addEventListener("click", () => dismissToast(item, onDismiss));
  item.appendChild(dismissBtn);
  host.appendChild(item);
  requestAnimationFrame(() => item.classList.add("is-in"));
  if (duration > 0) {
    setTimeout(() => dismissToast(item, onDismiss), duration);
  }
  return item;
}
function dismissToast(item, onDismiss) {
  if (!item.isConnected) return;
  item.classList.remove("is-in");
  item.addEventListener("transitionend", () => item.remove(), { once: true });
  setTimeout(() => item.remove(), 400);
  onDismiss?.(item);
}
function initToasts(root = document) {
  root.querySelectorAll("[data-toast]").forEach((btn) => {
    btn.addEventListener("click", () => {
      toast(
        btn.getAttribute("data-toast-message") || btn.getAttribute("data-toast") || "Notification",
        {
          type: btn.getAttribute("data-toast-type") || "default",
          title: btn.getAttribute("data-toast-title") || void 0
        }
      );
    });
  });
}

// js/theme.ts
var STORAGE_KEY = "lotus-theme";
function storedTheme() {
  const value = localStorage.getItem(STORAGE_KEY);
  return value === "light" || value === "dark" || value === "auto" ? value : null;
}
function systemPrefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function currentTheme() {
  const root = document.documentElement;
  if (root.classList.contains("dark")) return "dark";
  if (root.classList.contains("light")) return "light";
  return "auto";
}
function resolvedTheme() {
  const theme = currentTheme();
  return theme === "auto" ? systemPrefersDark() ? "dark" : "light" : theme;
}
function setTheme(theme, persist = true) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
  if (persist) {
    if (theme === "auto") localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, theme);
  }
  document.dispatchEvent(
    new CustomEvent("lotus:themechange", { detail: { theme, resolved: resolvedTheme() } })
  );
}
function toggleTheme() {
  const next = resolvedTheme() === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}
function initTheme(root = document) {
  const stored = storedTheme();
  if (stored) setTheme(stored, false);
  root.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => toggleTheme());
  });
}

// js/dialog.ts
function openDialog(dialog) {
  if (!dialog) return;
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
}
function closeDialog(dialog) {
  if (!dialog) return;
  if (typeof dialog.close === "function") dialog.close();
  else dialog.removeAttribute("open");
}
function initDialogs(root = document) {
  root.querySelectorAll("[data-dialog-open]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-dialog-open");
      openDialog(id ? document.getElementById(id) : null);
    });
  });
  root.querySelectorAll("[data-dialog-close]").forEach((btn) => {
    btn.addEventListener("click", () => closeDialog(btn.closest("dialog")));
  });
  root.querySelectorAll("dialog").forEach((dlg) => {
    const isStatic = dlg.hasAttribute("data-dialog-static");
    if (!isStatic) {
      dlg.addEventListener("click", (event) => {
        if (event.target === dlg) closeDialog(dlg);
      });
    }
    dlg.addEventListener("cancel", (event) => {
      if (isStatic) event.preventDefault();
    });
  });
}

// js/tabs.ts
function initTabs(root = document) {
  root.querySelectorAll("[data-tabs]").forEach((tabs) => {
    const buttons = tabs.querySelectorAll("[data-tab]");
    const activate = (btn) => {
      const target = btn.getAttribute("data-tab");
      buttons.forEach((b) => {
        const active = b === btn;
        b.classList.toggle("active", active);
        b.setAttribute("aria-selected", String(active));
      });
      root.querySelectorAll("[data-tab-panel]").forEach((panel) => {
        panel.hidden = panel.getAttribute("data-tab-panel") !== target;
      });
    };
    buttons.forEach((btn) => btn.addEventListener("click", () => activate(btn)));
    const initial = [...buttons].find((b) => b.classList.contains("active")) || buttons[0];
    if (initial) activate(initial);
  });
}

// js/accordion.ts
function initAccordions(root = document) {
  root.querySelectorAll("[data-accordion]").forEach((group) => {
    const multiple = group.hasAttribute("data-accordion-multiple");
    const items = group.querySelectorAll("[data-accordion-item]");
    if (!multiple) {
      const opened = [...items].filter((item) => item.hasAttribute("open"));
      opened.slice(1).forEach((item) => item.removeAttribute("open"));
    }
    items.forEach((item) => {
      item.addEventListener("toggle", () => {
        if (item.hasAttribute("data-disabled")) {
          item.removeAttribute("open");
          return;
        }
        if (multiple || !item.hasAttribute("open")) return;
        items.forEach((other) => {
          if (other !== item && other.hasAttribute("open")) other.removeAttribute("open");
        });
      });
    });
  });
}

// js/dropdown.ts
function initDropdowns(root = document) {
  document.addEventListener("click", (event) => {
    const target = event.target;
    root.querySelectorAll(".dropdown[open]").forEach((dd) => {
      if (!dd.contains(target)) dd.removeAttribute("open");
    });
  });
}

// js/carousel.ts
function initCarousels(root = document) {
  root.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const track = carousel.querySelector("[data-carousel-track]");
    if (!track) return;
    const vertical = carousel.classList.contains("is-vertical");
    const scroll = (direction) => {
      const size = vertical ? track.clientHeight : track.clientWidth;
      const amount = Math.max(size * 0.8, 200);
      track.scrollBy(vertical ? { top: direction * amount, behavior: "smooth" } : { left: direction * amount, behavior: "smooth" });
    };
    carousel.querySelectorAll("[data-carousel-prev]").forEach((btn) => {
      btn.addEventListener("click", () => scroll(-1));
    });
    carousel.querySelectorAll("[data-carousel-next]").forEach((btn) => {
      btn.addEventListener("click", () => scroll(1));
    });
  });
}

// js/select.ts
function initTableSelect(root = document) {
  root.querySelectorAll("[data-select-all]").forEach((toggle) => {
    const table = toggle.closest("table");
    if (!table) return;
    const items = () => [...table.querySelectorAll("[data-select-item]")];
    const refresh = () => {
      const list = items();
      const checked = list.filter((item) => item.checked).length;
      toggle.checked = checked > 0 && checked === list.length;
      toggle.indeterminate = checked > 0 && checked < list.length;
      list.forEach((item) => {
        const row = item.closest("tr");
        if (item.checked) {
          row?.setAttribute("data-state", "selected");
        } else {
          row?.removeAttribute("data-state");
        }
      });
    };
    toggle.addEventListener("change", () => {
      items().forEach((item) => {
        item.checked = toggle.checked;
      });
      refresh();
    });
    items().forEach((item) => {
      item.addEventListener("change", refresh);
    });
    refresh();
  });
}

// js/popover.ts
function initPopovers(root = document) {
  root.querySelectorAll("[data-popover-trigger]").forEach((trigger) => {
    const id = trigger.getAttribute("data-popover-trigger");
    const panel = id ? document.getElementById(id) : null;
    if (!panel) return;
    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      if (panel.classList.contains("open")) {
        closePopover(panel);
        return;
      }
      positionPopover(trigger, panel);
      panel.classList.add("open");
      document.addEventListener(
        "click",
        (outside) => {
          if (!panel.contains(outside.target)) closePopover(panel);
        },
        { once: true }
      );
    });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      root.querySelectorAll(".popover.open").forEach(closePopover);
    }
  });
}
function positionPopover(trigger, panel) {
  const rect = trigger.getBoundingClientRect();
  const panelRect = panel.getBoundingClientRect();
  const gap = readTokenPx("--space-2") ?? 8;
  let top = rect.bottom + gap;
  let left = rect.left;
  if (top + panelRect.height > window.innerHeight) {
    top = Math.max(gap, rect.top - panelRect.height - gap);
  }
  if (left + panelRect.width > window.innerWidth) {
    left = Math.max(gap, window.innerWidth - panelRect.width - gap);
  }
  panel.style.top = `${top}px`;
  panel.style.left = `${left}px`;
}
function readTokenPx(name) {
  const style = getComputedStyle(document.documentElement);
  const raw = style.getPropertyValue(name).trim();
  const value = parseFloat(raw);
  if (!Number.isFinite(value)) return null;
  return raw.endsWith("rem") ? value * parseFloat(style.fontSize) : value;
}
function closePopover(panel) {
  panel.classList.remove("open");
}

// js/sheet.ts
function initSheets(root = document) {
  root.querySelectorAll("[data-sheet-open]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-sheet-open");
      openDialog(id ? document.getElementById(id) : null);
    });
  });
  root.querySelectorAll("[data-sheet-close]").forEach((btn) => {
    btn.addEventListener("click", () => closeDialog(btn.closest("dialog")));
  });
}

// js/toggle.ts
function initToggles(root = document) {
  root.querySelectorAll(".toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const group = btn.closest(".toggle-group");
      if (group) {
        group.querySelectorAll(".toggle").forEach((other) => {
          other.setAttribute("aria-pressed", String(other === btn));
        });
      } else {
        const pressed = btn.getAttribute("aria-pressed") === "true";
        btn.setAttribute("aria-pressed", String(!pressed));
      }
    });
  });
}

// js/code.ts
var COPY_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
var CHECK_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`;
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
}
function addCopyButton(pre) {
  if (pre.classList.contains("has-copy") || pre.hasAttribute("data-no-copy")) return;
  const code = pre.querySelector("code");
  if (!code) return;
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "copy-button";
  btn.setAttribute("aria-label", "Copy code");
  btn.innerHTML = COPY_ICON;
  btn.addEventListener("click", async () => {
    await copyText(code.textContent ?? "");
    btn.innerHTML = CHECK_ICON;
    btn.classList.add("copied");
    btn.setAttribute("aria-label", "Copied");
    window.setTimeout(() => {
      btn.innerHTML = COPY_ICON;
      btn.classList.remove("copied");
      btn.setAttribute("aria-label", "Copy code");
    }, 2e3);
  });
  pre.classList.add("has-copy");
  pre.appendChild(btn);
}
function initCopy(root = document) {
  root.querySelectorAll("pre").forEach(addCopyButton);
}
function initHighlight(root = document) {
  const hljs = window.hljs;
  if (!hljs) return;
  root.querySelectorAll("pre code").forEach((el) => {
    if (el.classList.contains("hljs")) return;
    try {
      hljs.highlightElement(el);
    } catch {
    }
  });
}

// js/avatar.ts
function hideBroken(img) {
  const parent = img.parentElement;
  if (parent && !parent.hasAttribute("title") && img.alt) {
    parent.setAttribute("title", img.alt);
  }
  img.hidden = true;
}
function initAvatars(root = document) {
  root.querySelectorAll(".avatar img").forEach((img) => {
    if (img.complete && img.naturalWidth === 0) {
      hideBroken(img);
      return;
    }
    img.addEventListener("error", () => hideBroken(img), { once: true });
  });
}

// js/animate.ts
var observer = null;
function initAnimate(root = document) {
  document.documentElement.classList.add("js");
  const items = root.querySelectorAll("[data-animate]");
  if (!items.length) return;
  items.forEach((el) => {
    const delay = el.dataset.animateDelay;
    if (delay) el.style.setProperty("--animate-delay", `${delay}ms`);
  });
  if (typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((el) => el.classList.add("in-view"));
    return;
  }
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  items.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < viewportHeight && rect.bottom > 0) {
      el.classList.add("in-view");
    }
  });
  observer ?? (observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer?.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  ));
  items.forEach((el) => {
    if (!el.classList.contains("in-view")) observer.observe(el);
  });
}
function viewTransition(update) {
  const doc = document;
  if (doc.startViewTransition) {
    doc.startViewTransition(update);
  } else {
    update();
  }
}

// js/index.ts
var version = "0.5.0";
function init(root = document) {
  initTheme(root);
  initDialogs(root);
  initSheets(root);
  initTabs(root);
  initAccordions(root);
  initDropdowns(root);
  initCarousels(root);
  initTableSelect(root);
  initPopovers(root);
  initToggles(root);
  initCopy(root);
  initHighlight(root);
  initAvatars(root);
  initAnimate(root);
  initToasts(root);
}
if (!document.documentElement.hasAttribute("data-lotus-no-init")) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => init(), { once: true });
  } else {
    init();
  }
}
export {
  closeDialog,
  currentTheme,
  dismissToast,
  init,
  initAccordions,
  initAnimate,
  initAvatars,
  initCarousels,
  initCopy,
  initDialogs,
  initDropdowns,
  initHighlight,
  initPopovers,
  initSheets,
  initTableSelect,
  initTabs,
  initTheme,
  initToasts,
  initToggles,
  openDialog,
  resolvedTheme,
  setTheme,
  toast,
  toggleTheme,
  version,
  viewTransition
};
