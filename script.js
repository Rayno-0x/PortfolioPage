const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const dropdownToggle = document.getElementById("pagesToggle");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll(".nav-link:not(.dropdown-toggle), .dropdown-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

dropdownToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  if (window.innerWidth <= 992) {
    const dropdown = dropdownToggle.closest(".dropdown");
    const isOpen = dropdown.classList.toggle("open");
    dropdownToggle.setAttribute("aria-expanded", isOpen);
  }
});

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-link:not(.dropdown-toggle)");

window.addEventListener("scroll", () => {
  let current = "home";
  sections.forEach((section) => {
    if (section.hidden) return;
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });
  navItems.forEach((item) => {
    item.classList.toggle("active", item.getAttribute("href") === `#${current}`);
  });
});

const caseStudies = {
  mediafeed: {
    title: 'MediaFeed <span class="text-gradient">Platform</span>',
    desc: "A dynamic media-sharing application with simulated user authentication, integrated audio playback, and a responsive photo gallery.",
    image: "assets/mediafeed.webp",
    imageAlt: "MediaFeed Platform interface",
    live: "https://media-feed-ten.vercel.app/",
    code: "https://github.com/Rayno-0x",
    content: [
      {
        heading: "Overview",
        body: "MediaFeed brings music and photography together in one place. Users can discover and play audio while browsing a rich, highly responsive photo gallery, all wrapped in a clean interface that works smoothly on every device.",
      },
      {
        heading: "Key Features",
        list: [
          "Simulated user authentication flow",
          "Integrated audio playback controls",
          "Highly responsive photo gallery",
          "Accessible, mobile-first layout",
        ],
      },
      {
        heading: "Outcome",
        body: "A polished, production-ready frontend that demonstrates a complete user journey from sign-in to browsing content and feels fast and natural to use.",
      },
    ],
    details: [
      ["Client", "Personal Project"],
      ["Role", "Full-Stack Developer"],
      ["Year", "2026"],
      ["Platform", "Web"],
      ["Stack", "HTML, CSS, JavaScript"],
    ],
    tags: ["HTML", "CSS", "JavaScript"],
  },
  fibotask: {
    title: 'Fibo<span class="text-gradient">Task</span>',
    desc: "A dual-function web app combining a task management system with a dynamic Fibonacci sequence generator, built on Python & Django with a PostgreSQL database.",
    image: null,
    imageAlt: "",
    live: null,
    code: "https://github.com/Rayno-0x/FiboTask",
    content: [
      {
        heading: "Overview",
        body: "FiboTask solves two problems at once: keeping tasks organised and exploring the Fibonacci sequence. Tasks are stored in a relational PostgreSQL database, while the generator computes Fibonacci sequences on demand.",
      },
      {
        heading: "Key Features",
        list: [
          "Task management system with persistent storage",
          "Dynamic Fibonacci sequence generation",
          "PostgreSQL database for reliable data persistence",
          "Modular Django project structure",
        ],
      },
      {
        heading: "Outcome",
        body: "A functional full-stack demo showing database-backed CRUD working together with algorithmic generation in one clean interface.",
      },
    ],
    details: [
      ["Client", "Personal Project"],
      ["Role", "Backend Developer"],
      ["Year", "2026"],
      ["Platform", "Web"],
      ["Stack", "Python, Django, PostgreSQL"],
    ],
    tags: ["Python", "Django", "PostgreSQL"],
  },
};

const projectSection = document.getElementById("project");
const caseTitle = document.getElementById("case-study-title");
const caseDesc = document.getElementById("case-study-desc");
const caseLive = document.getElementById("case-study-live");
const caseCode = document.getElementById("case-study-code");
const caseHero = document.getElementById("case-study-hero");
const caseImg = document.getElementById("case-study-img");
const caseContent = document.getElementById("case-study-content");
const caseDetails = document.getElementById("case-study-details");
const caseTags = document.getElementById("case-study-tags");

function renderContent(blocks) {
  return blocks
    .map((block) => {
      const body = block.list
        ? `<ul class="feature-list">${block.list
            .map((item) => `<li>${item}</li>`)
            .join("")}</ul>`
        : `<p>${block.body}</p>`;
      return block.heading ? `<h3>${block.heading}</h3>${body}` : body;
    })
    .join("");
}

function openProject(id) {
  const project = caseStudies[id];
  if (!project) return;

  caseTitle.innerHTML = project.title;
  caseDesc.textContent = project.desc;

  caseLive.href = project.live || "#";
  caseLive.style.display = project.live ? "" : "none";
  caseCode.href = project.code || "#";

  if (project.image) {
    caseImg.src = project.image;
    caseImg.alt = project.imageAlt;
    caseHero.hidden = false;
  } else {
    caseHero.hidden = true;
  }

  caseContent.innerHTML = renderContent(project.content);
  caseDetails.innerHTML = project.details
    .map(([key, value]) => `<dt>${key}</dt><dd>${value}</dd>`)
    .join("");
  caseTags.innerHTML = project.tags
    .map((tag) => `<span>${tag}</span>`)
    .join("");

  projectSection.hidden = false;
  projectSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeProject() {
  projectSection.hidden = true;
  document
    .getElementById("projects")
    .scrollIntoView({ behavior: "smooth", block: "start" });
}

document.querySelectorAll(".project-media").forEach((media) => {
  media.addEventListener("click", () => openProject(media.dataset.project));
  media.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openProject(media.dataset.project);
    }
  });
});

document.getElementById("back-to-projects").addEventListener("click", closeProject);

document.getElementById("nav-single-project").addEventListener("click", (e) => {
  e.preventDefault();
  openProject("mediafeed");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !projectSection.hidden) {
    closeProject();
  }
});

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll(".skill").forEach((skill) => skillObserver.observe(skill));

const journeyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        journeyObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document
  .querySelectorAll(".journey-step")
  .forEach((step) => journeyObserver.observe(step));

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  formStatus.textContent = "Sending...";
  formStatus.className = "form-status sending";
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  try {
    const data = Object.fromEntries(new FormData(contactForm).entries());
    const res = await fetch(contactForm.action, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();

    if (res.status === 200 && json.success) {
      formStatus.textContent = "Thanks! Your message has been sent. I'll get back to you soon.";
      formStatus.className = "form-status success";
      contactForm.reset();
    } else {
      formStatus.textContent = json.message || "Something went wrong. Please try again.";
      formStatus.className = "form-status error";
    }
  } catch (error) {
    formStatus.textContent = "Network error. Please try again.";
    formStatus.className = "form-status error";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
});
