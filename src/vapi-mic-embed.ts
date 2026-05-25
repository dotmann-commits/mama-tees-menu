import Vapi from "@vapi-ai/web";

type VapiInstance = InstanceType<typeof Vapi>;

declare global {
  interface Window {
    __mamaTeeVapiMicLoaded?: boolean;
  }
}

const PUBLIC_KEY = import.meta.env.VITE_VAPI_PUBLIC_KEY;
const ASSISTANT_ID = import.meta.env.VITE_VAPI_ASSISTANT_ID;

let vapi: VapiInstance | null = null;
let isCalling = false;

function showToast(message: string) {
  let toast = document.getElementById("mama-tee-vapi-toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "mama-tee-vapi-toast";

    Object.assign(toast.style, {
      position: "fixed",
      left: "50%",
      bottom: "32px",
      transform: "translateX(-50%)",
      zIndex: "999999",
      padding: "12px 18px",
      borderRadius: "999px",
      border: "1px solid rgba(212,154,80,0.45)",
      background: "rgba(12,6,4,0.94)",
      color: "#f0c27a",
      fontSize: "13px",
      letterSpacing: "0.08em",
      boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
      pointerEvents: "none",
      transition: "opacity 250ms ease"
    });

    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = "1";

  window.setTimeout(() => {
    toast && (toast.style.opacity = "0");
  }, 3500);
}

function setupVapi() {
  if (vapi) return vapi;

  vapi = new Vapi(PUBLIC_KEY);

  vapi.on("call-start", () => {
    isCalling = true;
    updateMicVisual(true);
    showToast("Connected — Ada is listening.");
  });

  vapi.on("call-end", () => {
    isCalling = false;
    updateMicVisual(false);
    showToast("Call ended.");
  });

  vapi.on("error", () => {
    isCalling = false;
    updateMicVisual(false);
    showToast("Call failed. Please try again.");
  });

  return vapi;
}

function scoreMicCandidate(el: HTMLElement) {
  const rect = el.tBoundingClientRect();
  const style = window.getComputedStyle(el);

  let score = 0;

  if (el.querySelector("svg")) score += 40;
  if (rect.width >= 60 && rect.height >= 60) score += 30;
  if (Math.abs(rect.width - rect.height) < 25) score += 20;
  if (
    style.borderRadius.includes("%") ||
    parseFloat(style.borderRadius) >= 40
  ) {
    score += 20;
  }

  const text = (el.textContent || "").toLowerCase();

  if (
    text.includes("home") ||
    text.includes("menu") ||
    text.includes("about") ||
    text.includes("contact")
  ) {
    score -= 100;
  }

  return score;
}

function findMicButton() {
  const candidates = Array.from(
    document.querySelectorAll<HTMLElement>(
      "button, a, div, [role='button']"
    )
  );

  return candidates
    .filter((el) => {
      const rect = el.getBoundingClientRect();
      return rect.width > 40 && rect.height > 40;
    })
    .map((el) => ({
      el,
      score: scoreMicCandidate(el)
    }))
    .sort((a, b) => b.score - a.score)[0]?.el;
}

function updateMicVisual(active: boolean) {
  const mic = findMicButton();

  if (!mic) return;

  mic.style.cursor = "pointer";
  mic.style.transition = "all 250ms ease";

  if (active) {
    mic.style.boxShadow = "0 0 70px rgba(212,154,80,0.42)";
    mic.style.transform = "scale(1.05)";
  } else {
    mic.style.boxShadow = "";
    mic.style.transform = "";
  }
}

function bindMic() {
  const mic = findMicButton();

  if (!mic) return;

  if (mic.dataset.vapiBound === "true") return;

  mic.dataset.vapiBound = "true";

  mic.style.cursor = "pointer";

  mic.addEventListener(
    "click",
    async (event) => {
      event.preventDefault();
      event.stopPropagation();

      const client = setupVapi();

      try {
        if (isCalling) {
          client.stop();
          return;
        }

        showToast("Starting voice assistant...");
        await client.start(ASSISTANT_ID);
      } catch {
        isCalling = false;
        updateMicVisual(false);
        showToast("Could not start call.");
      }
    },
    true
  );
}

function boot() {
  if (window.__mamaTeeVapiMicLoaded) return;

  window.__mamaTeeVapiLoaded = true;

  bindMic();

  const observer = new MutationObserver(() => {
    bindMic();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
