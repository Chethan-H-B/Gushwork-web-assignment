/**
 * Mangalam HDPE Pipes – Product Page Script
 * Pure ES6+ Vanilla JavaScript
 */

/* ============================================================
   CAROUSEL DATA
============================================================ */
const carouselImages = [
  {
    src: "images/hdpe pipe.png",
    alt: "HDPE Pipe Installation – Workers handling orange fishnet pipes",
    fallbackBg: "linear-gradient(135deg, #8B4513 30%, #D2691E 100%)",
  },
  {
    src: "images/marrine-application.png",
    alt: "HDPE Coil Product Close-up",
    fallbackBg: "linear-gradient(135deg, #1a4040 30%, #2d8080 100%)",
  },
  {
    src: "images/industrial pipeline.jpg",
    alt: "HDPE Pipe in Marine Application",
    fallbackBg: "linear-gradient(135deg, #2a2a60 30%, #5050a0 100%)",
  },
  {
    src: "images/manufacturing plant.jpg",
    alt: "HDPE Pipe Manufacturing Process",
    fallbackBg: "linear-gradient(135deg, #404020 30%, #808040 100%)",
  },
  {
    src: "images/pipe fittings.jpg",
    alt: "HDPE Fittings and Accessories",
    fallbackBg: "linear-gradient(135deg, #402020 30%, #805050 100%)",
  },
  {
    src: "images/network installation.jpg",
    alt: "HDPE Pipe Network Installation",
    fallbackBg: "linear-gradient(135deg, #204020 30%, #508050 100%)",
  },
];

/* ============================================================
   MANUFACTURING PROCESS DATA
============================================================ */
const processSteps = [
  {
    title: "High-Grade Raw Material Selection",
    desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
    bullets: ["PE100 grade material", "Optimal molecular weight distribution"],
    img: "images/hdpe pipe.png",
  },
  {
    title: "Precision Extrusion Process",
    desc: "Our state-of-the-art extruders melt and homogenize HDPE pellets at controlled temperatures to ensure consistent melt flow and material properties.",
    bullets: ["Temperature-controlled zones", "Consistent melt flow index"],
    img: "images/HDPE-Pipe-Extrusion-Line-010.png",
  },
  {
    title: "Controlled Cooling",
    desc: "Rapid and uniform cooling in water troughs ensures dimensional stability and locks in the optimal molecular structure of the pipe.",
    bullets: ["Water trough cooling", "Controlled temperature gradient"],
    img: "images/cooling.jpg",
  },
  {
    title: "Precision Sizing",
    desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
    bullets: ["Vacuum sizing tanks", "Laser measurement systems"],
    img: "images/sizing.jpg",
  },
  {
    title: "Rigorous Quality Control",
    desc: "Every pipe undergoes comprehensive testing including dimensional checks, pressure testing, and material property verification.",
    bullets: ["Inline laser measurement", "Pressure testing at 1.5x rated PN"],
    img: "images/controller.jpg",
  },
  {
    title: "Marking & Identification",
    desc: "Clear and durable marking on every pipe includes manufacturer info, dimensions, pressure rating, and certification standards.",
    bullets: ["Inkjet printing system", "Includes all required standards info"],
    img: "images/Laser_Marking_on_PVC,_PE,_PP_HDPE_Pipes.png",
  },
  {
    title: "Automated Cutting",
    desc: "Precision cutting equipment ensures exact pipe lengths with clean, burr-free ends ready for fusion or mechanical jointing.",
    bullets: ["Automated length control", "Clean square cut ends"],
    img: "images/automated.png",
  },
  {
    title: "Packaging & Dispatch",
    desc: "Pipes are carefully bundled and coiled with protective wrapping to prevent damage during transport and storage.",
    bullets: ["UV-protected wrapping", "Coils or straight lengths available"],
    img: "images/packing.png",
  },
];

/* ============================================================
   DOM READY
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initCarousel();
  initStickyHeader();
  initHamburger();
  initFAQ();
  initProcessTabs();
  initAppCarousel();
  initModal();
  initAnimations();
});

/* ============================================================
   1. STICKY HEADER
============================================================ */
function initStickyHeader() {
  const header = document.getElementById("siteHeader");
  header.classList.add("visible");

  function updateHeader() {
    const scrollY = window.scrollY;
    const heroHeight =
      document.getElementById("heroProduct")?.offsetHeight || 400;

    if (scrollY > heroHeight * 0.3) {
      // Show header when scrolled past ~30% of the hero
      header.classList.add("visible");
    } else {
      header.classList.remove("visible");
    }
    lastScroll = scrollY;
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    },
    { passive: true },
  );
}

/* ============================================================
   2. HAMBURGER / MOBILE NAV
============================================================ */
function initHamburger() {
  const hamburger = document.getElementById("hamburgerBtn");
  const mobileNav = document.getElementById("mobileNav");

  hamburger?.addEventListener("click", () => {
    mobileNav.toggleAttribute("hidden");
    const isOpen = !mobileNav.hasAttribute("hidden");
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  // Close on link click
  mobileNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => mobileNav.setAttribute("hidden", ""));
  });
}

/* ============================================================
   3. IMAGE CAROUSEL WITH ZOOM
============================================================ */
let currentSlide = 0;

function initCarousel() {
  const track = document.getElementById("carouselTrack");
  const thumbContainer = document.getElementById("thumbnailStrip");
  const prevBtn = document.getElementById("carouselPrevBtn");
  const nextBtn = document.getElementById("carouselNextBtn");
  const zoomPreview = document.getElementById("zoomPreview");
  const zoomImg = document.getElementById("zoomImg");

  if (!track) return;

  // Build slides
  carouselImages.forEach((img, i) => {
    const slide = document.createElement("div");
    slide.className = "carousel-slide";
    slide.setAttribute("data-index", i);

    // Actual image with fallback
    const imgEl = document.createElement("img");
    imgEl.src = img.src;
    imgEl.alt = img.alt;
    imgEl.onerror = function () {
      // Use gradient background as fallback
      slide.style.background = img.fallbackBg;
      this.style.display = "none";
    };

    // Zoom lens element
    const lens = document.createElement("div");
    lens.className = "zoom-lens";
    const lensSize = 120;
    lens.style.width = lensSize + "px";
    lens.style.height = lensSize + "px";

    slide.appendChild(imgEl);
    slide.appendChild(lens);
    track.appendChild(slide);

    // ---- Zoom Logic ----
    setupZoom(slide, imgEl, lens, zoomPreview, zoomImg, lensSize);
  });

  // Build thumbnails
  carouselImages.forEach((img, i) => {
    const thumb = document.createElement("div");
    thumb.className = "thumb" + (i === 0 ? " active" : "");

    const tImg = document.createElement("img");
    tImg.src = img.src;
    tImg.alt = img.alt;
    tImg.onerror = function () {
      thumb.style.background = img.fallbackBg;
      this.style.display = "none";
    };

    thumb.appendChild(tImg);
    thumb.addEventListener("click", () => goToSlide(i));
    thumbContainer.appendChild(thumb);
  });

  // Button listeners
  prevBtn?.addEventListener("click", () => goToSlide(currentSlide - 1));
  nextBtn?.addEventListener("click", () => goToSlide(currentSlide + 1));

  // Auto-play
  let autoPlay = setInterval(() => goToSlide(currentSlide + 1), 4000);
  track.addEventListener("mouseenter", () => clearInterval(autoPlay));
  track.addEventListener("mouseleave", () => {
    autoPlay = setInterval(() => goToSlide(currentSlide + 1), 4000);
  });

  // Keyboard — prevent default so arrow keys don't also scroll the page
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goToSlide(currentSlide - 1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goToSlide(currentSlide + 1);
    }
  });

  // Touch/swipe
  let startX = 0;
  track.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
    },
    { passive: true },
  );
  track.addEventListener("touchend", (e) => {
    const delta = e.changedTouches[0].clientX - startX;
    if (Math.abs(delta) > 50)
      goToSlide(delta < 0 ? currentSlide + 1 : currentSlide - 1);
  });
}

/**
 * Navigate to a specific slide index
 */
function goToSlide(index) {
  const track = document.getElementById("carouselTrack");
  const thumbs = document.querySelectorAll(".thumb");
  const total = carouselImages.length;

  // Wrap around
  currentSlide = ((index % total) + total) % total;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Update thumbnails
  thumbs.forEach((t, i) => t.classList.toggle("active", i === currentSlide));

  // Scroll ONLY the thumbnail strip horizontally — do NOT use scrollIntoView()
  // because that scrolls the entire page, not just the strip container.
  const activeThumb = thumbs[currentSlide];
  if (activeThumb) {
    const strip = activeThumb.parentElement;
    if (strip) {
      const scrollTarget =
        activeThumb.offsetLeft -
        strip.offsetWidth / 2 +
        activeThumb.offsetWidth / 2;
      strip.scrollTo({ left: scrollTarget, behavior: "smooth" });
    }
  }
}

/**
 * Setup zoom magnifier for a carousel slide
 */
function setupZoom(slide, imgEl, lens, zoomPreview, zoomImg, lensSize) {
  const zoomFactor = 3;

  function moveLens(e) {
    const rect = slide.getBoundingClientRect();
    let x = (e.clientX || (e.touches && e.touches[0].clientX) || 0) - rect.left;
    let y = (e.clientY || (e.touches && e.touches[0].clientY) || 0) - rect.top;

    // Clamp lens inside slide
    x = Math.max(lensSize / 2, Math.min(x, rect.width - lensSize / 2));
    y = Math.max(lensSize / 2, Math.min(y, rect.height - lensSize / 2));

    lens.style.left = x - lensSize / 2 + "px";
    lens.style.top = y - lensSize / 2 + "px";

    // Update zoom preview background position
    // Calculate the percentage position within the image
    const pctX = ((x - lensSize / 2) / (rect.width - lensSize)) * 100;
    const pctY = ((y - lensSize / 2) / (rect.height - lensSize)) * 100;

    zoomImg.style.transform = `scale(${zoomFactor})`;
    zoomImg.style.transformOrigin = `${pctX}% ${pctY}%`;
    zoomImg.src = imgEl.src || "";
  }

  slide.addEventListener("mousemove", (e) => {
    lens.style.display = "block";
    zoomPreview.style.display = "block";
    moveLens(e);
  });

  slide.addEventListener("mouseleave", () => {
    lens.style.display = "none";
    zoomPreview.style.display = "none";
    zoomImg.style.transform = "";
  });
}

/* ============================================================
   4. FAQ ACCORDION
============================================================ */
function initFAQ() {
  const items = document.querySelectorAll(".faq-item");

  items.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const icon = item.querySelector(".faq-icon");

    question?.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all
      items.forEach((i) => {
        i.classList.remove("active");
        const ic = i.querySelector(".faq-icon");
        if (ic) ic.textContent = "⌄";
      });

      // Open clicked if it wasn't active
      if (!isActive) {
        item.classList.add("active");
        if (icon) icon.textContent = "⌃";
      }
    });
  });
}

/* Module-level reference so processNavPrev / processNavNext can call it directly */
let renderStepGlobal = () => {};

/* ============================================================
   5. MANUFACTURING PROCESS TABS
============================================================ */
function initProcessTabs() {
  const tabs = document.querySelectorAll(".process-tab");
  const content = document.getElementById("processStepContent");

  if (!content) return;

  function renderStep(stepIndex) {
    const step = processSteps[stepIndex];
    if (!step) return;

    content.innerHTML = `
      <div class="process-text">
        <h3>${step.title}</h3>
        <p>${step.desc}</p>
        <ul class="process-bullets">
          ${step.bullets
            .map(
              (b) => `
            <li>
              <span class="check-icon">✓</span>
              ${b}
            </li>
          `,
            )
            .join("")}
        </ul>
      </div>
      <div class="process-img-wrap">
        <img src="${step.img}" alt="${step.title}"
          onerror="this.style.display='none'" />
        <div class="process-img-nav">
          <button onclick="processNavPrev(${stepIndex})" aria-label="Previous">←</button>
          <button onclick="processNavNext(${stepIndex})" aria-label="Next">→</button>
        </div>
      </div>
    `;

    // Animate in
    content.style.opacity = "0";
    content.style.transform = "translateY(10px)";
    requestAnimationFrame(() => {
      content.style.transition = "opacity 0.35s ease, transform 0.35s ease";
      content.style.opacity = "1";
      content.style.transform = "translateY(0)";
    });
  }

  // Expose renderStep so the global processNavPrev/Next helpers can call it directly
  renderStepGlobal = renderStep;

  // Initial render
  renderStep(0);

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      renderStep(parseInt(tab.dataset.step));
    });
  });
}

// Exposed for inline onclick in process image nav buttons
// NOTE: We call renderStep() directly instead of dispatching a synthetic click event.
// Dispatching `new Event('click')` had no cancelable flag and caused page-top jumps
// because the event lacked a proper target, triggering default browser scroll behaviour.
window.processNavPrev = function (current) {
  const newStep = (current - 1 + processSteps.length) % processSteps.length;
  const allTabs = document.querySelectorAll(".process-tab");
  allTabs.forEach((t) => {
    t.classList.remove("active");
    t.setAttribute("aria-selected", "false");
  });
  const targetTab = allTabs[newStep];
  if (targetTab) {
    targetTab.classList.add("active");
    targetTab.setAttribute("aria-selected", "true");
  }
  renderStepGlobal(newStep);
};

window.processNavNext = function (current) {
  const newStep = (current + 1) % processSteps.length;
  const allTabs = document.querySelectorAll(".process-tab");
  allTabs.forEach((t) => {
    t.classList.remove("active");
    t.setAttribute("aria-selected", "false");
  });
  const targetTab = allTabs[newStep];
  if (targetTab) {
    targetTab.classList.add("active");
    targetTab.setAttribute("aria-selected", "true");
  }
  renderStepGlobal(newStep);
};

/* ============================================================
   6. APPLICATIONS CAROUSEL
============================================================ */
let appOffset = 0;

function initAppCarousel() {
  const track = document.getElementById("appCarouselTrack");
  const prevBtn = document.getElementById("appCarouselPrevBtn");
  const nextBtn = document.getElementById("appCarouselNextBtn");

  if (!track) return;

  const cards = track.querySelectorAll(".app-card-dark");
  const cardWidth = 300; // approximate card width + gap

  prevBtn?.addEventListener("click", () => {
    appOffset = Math.max(appOffset - cardWidth, 0);
    track.style.transform = `translateX(-${appOffset}px)`;
  });

  nextBtn?.addEventListener("click", () => {
    const maxOffset = (cards.length - getVisibleCards()) * cardWidth;
    appOffset = Math.min(appOffset + cardWidth, maxOffset);
    track.style.transform = `translateX(-${appOffset}px)`;
  });
}

function getVisibleCards() {
  if (window.innerWidth < 600) return 1;
  if (window.innerWidth < 900) return 2;
  return 3;
}

/* ============================================================
   7. MODAL (Request a call back)
============================================================ */
function initModal() {
  const overlay = document.getElementById("callbackModalOverlay");
  const closeBtn = document.getElementById("callbackModalCloseBtn");

  // Open on "Get Custom Quote" button if needed (optional CTA)
  // For now expose as global so any button can trigger it
  window.openModal = function () {
    overlay?.classList.add("active");
    overlay?.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  window.closeModal = function () {
    overlay?.classList.remove("active");
    overlay?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  closeBtn?.addEventListener("click", window.closeModal);
  overlay?.addEventListener("click", (e) => {
    if (e.target === overlay) window.closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") window.closeModal();
  });
}

/* ============================================================
   8. SCROLL ANIMATIONS (IntersectionObserver)
============================================================ */
function initAnimations() {
  const targets = document.querySelectorAll(
    ".benefit-card, .portfolio-card, .testimonial-card, .faq-item, .resource-row, .specs-table",
  );

  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Staggered delay based on element order
          const delay = (Array.from(targets).indexOf(entry.target) % 6) * 80;
          entry.target.style.animationDelay = delay + "ms";
          entry.target.classList.add("fade-in-up");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  targets.forEach((el) => {
    el.style.opacity = "0";
    observer.observe(el);
  });
}

/* ============================================================
   9. WINDOW RESIZE
============================================================ */
window.addEventListener("resize", () => {
  // Reset app carousel offset on resize
  appOffset = 0;
  const track = document.getElementById("appCarouselTrack");
  if (track) track.style.transform = "translateX(0)";
});
