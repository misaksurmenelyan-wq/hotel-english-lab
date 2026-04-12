const tabs = document.querySelectorAll(".role-tab");
const panels = document.querySelectorAll(".role-panel");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.role;

    tabs.forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-selected", "false");
    });

    panels.forEach((panel) => {
      const isTarget = panel.dataset.panel === target;
      panel.classList.toggle("is-active", isTarget);
      panel.hidden = !isTarget;
    });

    tab.classList.add("is-active");
    tab.setAttribute("aria-selected", "true");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

document.querySelectorAll(".reveal").forEach((item) => {
  observer.observe(item);
});
