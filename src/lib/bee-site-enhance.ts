/**
 * Progressive enhancements layered on top of the published Bee Home Creators site:
 *  - every image becomes clickable and opens in a lightbox
 *  - each employee phone number gets a WhatsApp action next to the call action
 *  - a DTCP / RERA compliance line is appended at the bottom of the page
 */

const LIGHTBOX_ID = "bee-lightbox";

function ensureLightbox(): HTMLDivElement {
  let box = document.getElementById(LIGHTBOX_ID) as HTMLDivElement | null;
  if (box) return box;

  box = document.createElement("div");
  box.id = LIGHTBOX_ID;
  box.className = "bee-lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.innerHTML =
    '<button type="button" class="bee-lightbox__close" aria-label="Close image">&times;</button>' +
    '<img class="bee-lightbox__img" alt="" />';

  const close = () => {
    box!.classList.remove("is-open");
    document.body.style.overflow = "";
  };
  box.addEventListener("click", (event) => {
    if (event.target === box || (event.target as HTMLElement).closest(".bee-lightbox__close")) {
      close();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });

  document.body.appendChild(box);
  return box;
}

function openLightbox(src: string, alt: string) {
  const box = ensureLightbox();
  const img = box.querySelector<HTMLImageElement>(".bee-lightbox__img")!;
  img.src = src;
  img.alt = alt;
  box.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function enhanceImages(root: ParentNode) {
  root.querySelectorAll<HTMLImageElement>("#root img").forEach((img) => {
    if (img.dataset["beeZoom"]) return;
    img.dataset["beeZoom"] = "true";
    img.classList.add("bee-zoomable");
    img.setAttribute("tabindex", "0");
    img.setAttribute("role", "button");
    img.setAttribute("title", "Click to view larger");
    const open = () => openLightbox(img.currentSrc || img.src, img.alt || "");
    img.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      open();
    });
    img.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  });
}

function enhancePhones(root: ParentNode) {
  root.querySelectorAll<HTMLAnchorElement>('#root a[href^="tel:"]').forEach((link) => {
    if (link.dataset["beeWhatsapp"]) return;
    // Header and footer already ship their own WhatsApp action.
    const scope = link.closest(".team-card, .team-info, header, .footer");
    if (scope && (scope.tagName === "HEADER" || scope.classList.contains("footer"))) return;
    link.dataset["beeWhatsapp"] = "true";

    const digits = (link.getAttribute("href") || "").replace(/[^\d]/g, "");
    if (digits.length < 10) return;
    const intl = digits.length === 10 ? `91${digits}` : digits;

    const wa = document.createElement("a");
    wa.className = "bee-whatsapp-link";
    wa.href = `https://wa.me/${intl}`;
    wa.target = "_blank";
    wa.rel = "noreferrer";
    wa.setAttribute("aria-label", `Chat on WhatsApp with ${intl}`);
    wa.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.94.52 3.76 1.42 5.32L2 22l4.98-1.58a9.8 9.8 0 0 0 5.06 1.4h.01c5.43 0 9.83-4.4 9.83-9.84C21.88 6.4 17.47 2 12.04 2Zm0 17.96h-.01a8.1 8.1 0 0 1-4.13-1.14l-.3-.18-3.06.97.98-2.99-.19-.31a8.13 8.13 0 1 1 6.71 3.65Zm4.47-6.09c-.24-.12-1.45-.72-1.67-.8-.22-.08-.39-.12-.55.12-.16.25-.63.8-.78.97-.14.16-.29.18-.53.06-.24-.12-1.03-.38-1.97-1.22-.73-.65-1.22-1.45-1.36-1.69-.14-.24-.02-.37.11-.49.11-.11.24-.29.36-.43.12-.14.16-.25.24-.41.08-.16.04-.31-.02-.43-.06-.12-.55-1.33-.75-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.24-.85.83-.85 2.03s.87 2.35.99 2.51c.12.16 1.71 2.62 4.15 3.67.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.45-.59 1.65-1.17.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z"/></svg>' +
      "<span>WhatsApp</span>";

    const parent = link.parentElement;
    if (!parent) return;
    if (parent.querySelector(".bee-whatsapp-link")) return;
    const group = document.createElement("div");
    group.className = "bee-contact-actions";
    parent.insertBefore(group, link);
    group.appendChild(link);
    group.appendChild(wa);
  });
}

function enhanceCompliance() {
  if (document.querySelector(".bee-compliance")) return;
  const footer = document.querySelector("#root .footer");
  if (!footer) return;
  const strip = document.createElement("div");
  strip.className = "bee-compliance";
  strip.innerHTML =
    "<span>DTCP APPROVED LAYOUT</span><span aria-hidden='true'>•</span><span>RERA REGISTERED PROJECT</span>";
  footer.appendChild(strip);
}

export function enhanceBeeSite(): () => void {
  const run = () => {
    if (!document.querySelector("#root")) return;
    enhanceImages(document);
    enhancePhones(document);
    enhanceCompliance();
  };

  run();
  const observer = new MutationObserver(() => run());
  observer.observe(document.body, { childList: true, subtree: true });

  return () => observer.disconnect();
}
