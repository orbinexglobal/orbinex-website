document.addEventListener("DOMContentLoaded", function () {
  var body = document.body;
  var navToggle = document.querySelector("[data-nav-toggle]");
  var navMenu = document.querySelector("[data-nav-menu]");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Navigation ── */
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      navMenu.classList.toggle("is-open", !isOpen);
      body.classList.toggle("nav-open", !isOpen);
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("is-open");
        body.classList.remove("nav-open");
      });
    });
  }

  /* ── Scroll reveal with stagger ── */
  var revealItems = document.querySelectorAll("[data-reveal]");
  if (revealItems.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach(function (item) {
        item.classList.add("is-visible");
      });
    } else {
      var revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

      revealItems.forEach(function (item, index) {
        item.setAttribute("data-reveal-delay", String(index % 4));
        revealObserver.observe(item);
      });
    }
  }

  /* ── Counter animation ── */
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    var animateCounter = function (element) {
      var target = Number(element.getAttribute("data-count")) || 0;
      if (reduceMotion) {
        element.textContent = String(target);
        return;
      }

      var start = 0;
      var duration = 1100;
      var startTime;

      var tick = function (timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 4);
        var value = Math.round(start + (target - start) * eased);
        element.textContent = String(value);
        if (progress < 1) {
          window.requestAnimationFrame(tick);
        }
      };

      window.requestAnimationFrame(tick);
    };

    if (reduceMotion || !("IntersectionObserver" in window)) {
      counters.forEach(animateCounter);
    } else {
      var counterObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.35 });

      counters.forEach(function (counter) {
        counterObserver.observe(counter);
      });
    }
  }

  /* ── Parallax orbs on mouse move ── */
  if (!reduceMotion) {
    var orbs = document.querySelectorAll(".hero-orb, .page-orb");
    if (orbs.length) {
      var targetX = 0, targetY = 0, currentX = 0, currentY = 0;

      document.addEventListener("mousemove", function (e) {
        targetX = (e.clientX / window.innerWidth - 0.5) * 30;
        targetY = (e.clientY / window.innerHeight - 0.5) * 20;
      });

      var lerpOrbs = function () {
        currentX += (targetX - currentX) * 0.04;
        currentY += (targetY - currentY) * 0.04;
        orbs.forEach(function (orb, i) {
          var factor = i % 2 === 0 ? 1 : -0.7;
          orb.style.transform = "translate3d(" +
            (currentX * factor).toFixed(2) + "px, " +
            (currentY * factor).toFixed(2) + "px, 0)";
        });
        requestAnimationFrame(lerpOrbs);
      };
      requestAnimationFrame(lerpOrbs);
    }
  }

  /* ── Header opacity on scroll ── */
  var header = document.querySelector(".site-header");
  if (header) {
    var lastScroll = 0;
    window.addEventListener("scroll", function () {
      var scrollY = window.pageYOffset;
      if (scrollY > 80) {
        header.style.borderBottomColor = "rgba(255,255,255,0.08)";
      } else {
        header.style.borderBottomColor = "rgba(255,255,255,0.03)";
      }
      lastScroll = scrollY;
    }, { passive: true });
  }

  /* ── Process page tabs ── */
  var processData = [
    {
      kicker: "Phase 01",
      title: "Discovery",
      description: "We align on goals, audience, priorities, and practical constraints before anything is designed.",
      focus: "Clarify what matters most so the project is shaped around real priorities rather than assumptions.",
      note: "Direct communication, clear questions, and an honest view of what the project should include.",
      points: [
        "Business goals and audience alignment",
        "Priority pages and success criteria",
        "Technical and content constraints review"
      ]
    },
    {
      kicker: "Phase 02",
      title: "Proposal and agreement",
      description: "You receive a clear scope, timeline, and pricing structure so the engagement starts with confidence.",
      focus: "Remove ambiguity early and make sure both sides are aligned before production begins.",
      note: "Expect straightforward scope, pricing clarity, and a clean agreement to move forward.",
      points: [
        "Defined deliverables and timeline",
        "Clear commercial structure",
        "Shared understanding of the engagement"
      ]
    },
    {
      kicker: "Phase 03",
      title: "Design direction",
      description: "The visual system and page structure are shaped into a reviewable direction before the build continues.",
      focus: "Create a premium, credible direction that matches the business while staying practical to implement.",
      note: "You review a focused direction instead of getting buried in unnecessary variation.",
      points: [
        "Layout and hierarchy exploration",
        "Visual tone and interaction direction",
        "Refinement based on feedback"
      ]
    },
    {
      kicker: "Phase 04",
      title: "Build and refinement",
      description: "The approved direction is turned into a performant experience with visible progress and focused iteration.",
      focus: "Translate the design into lightweight, maintainable code without losing polish.",
      note: "Progress stays visible, and refinements stay tied to the agreed direction.",
      points: [
        "Responsive implementation",
        "Accessibility and performance checks",
        "Focused quality refinement"
      ]
    },
    {
      kicker: "Phase 05",
      title: "Launch and handoff",
      description: "Once approved, the site is delivered in a launch-ready state with clean files and clear next steps.",
      focus: "Finish with a deployment-ready asset that feels complete, not provisional.",
      note: "You receive a polished result plus the clarity needed to publish and maintain it.",
      points: [
        "Final review and approval",
        "GitHub Pages-friendly file delivery",
        "Launch guidance and handoff clarity"
      ]
    },
    {
      kicker: "Phase 06",
      title: "Optional support",
      description: "Post-launch help is available for updates, refinements, and steady improvement over time.",
      focus: "Keep the digital presence aligned as the business evolves without creating unnecessary overhead.",
      note: "Support remains practical, flexible, and centered on useful changes.",
      points: [
        "Content and layout updates",
        "Ongoing refinements where needed",
        "Guidance for future improvements"
      ]
    }
  ];

  var processSteps = document.querySelectorAll("[data-process-step]");
  var processPanel = document.querySelector("[data-process-panel]");

  if (processSteps.length && processPanel) {
    var kicker = document.getElementById("process-kicker");
    var title = document.getElementById("process-title");
    var description = document.getElementById("process-description");
    var focus = document.getElementById("process-focus");
    var note = document.getElementById("process-note");
    var points = document.getElementById("process-points");

    var updateProcess = function (index) {
      var step = processData[index];
      processSteps.forEach(function (item, itemIndex) {
        var active = itemIndex === index;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", String(active));
        if (active) {
          processPanel.setAttribute("aria-labelledby", item.id);
        }
      });

      kicker.textContent = step.kicker;
      title.textContent = step.title;
      description.textContent = step.description;
      focus.textContent = step.focus;
      note.textContent = step.note;
      points.innerHTML = step.points.map(function (point) {
        return "<li>" + point + "</li>";
      }).join("");
    };

    processSteps.forEach(function (step) {
      step.addEventListener("click", function () {
        updateProcess(Number(step.getAttribute("data-step-index")) || 0);
      });

      step.addEventListener("keydown", function (event) {
        var currentIndex = Number(step.getAttribute("data-step-index")) || 0;
        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
          event.preventDefault();
          var nextIndex = (currentIndex + 1) % processSteps.length;
          processSteps[nextIndex].focus();
          updateProcess(nextIndex);
        }
        if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
          event.preventDefault();
          var previousIndex = (currentIndex - 1 + processSteps.length) % processSteps.length;
          processSteps[previousIndex].focus();
          updateProcess(previousIndex);
        }
      });
    });

    updateProcess(0);
  }

  /* ── Contact form ── */
  var contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) {
    var status = contactForm.querySelector("[data-form-status]");
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var formData = new FormData(contactForm);
      var name = (formData.get("name") || "").toString().trim();
      var email = (formData.get("email") || "").toString().trim();
      var company = (formData.get("company") || "").toString().trim();
      var service = (formData.get("service") || "").toString().trim();
      var message = (formData.get("message") || "").toString().trim();

      var subject = encodeURIComponent("Project inquiry from " + name);
      var bodyLines = [
        "Name: " + name,
        "Email: " + email,
        "Company: " + (company || "Not provided"),
        "Service needed: " + service,
        "",
        "Project details:",
        message
      ];

      var mailto = "mailto:contact.orbinex@gmail.com?subject=" + subject + "&body=" + encodeURIComponent(bodyLines.join("\n"));
      window.location.href = mailto;

      if (status) {
        status.textContent = "Email draft created. If nothing opened, email contact.orbinex@gmail.com directly.";
      }
    });
  }
});
