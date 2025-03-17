document.addEventListener("DOMContentLoaded", () => {
  const aboutBtn = document.getElementById("about-btn");
  const bioDesc = document.querySelectorAll(".bio-desc"); // All bio descriptions
  const labelMap = {
    whoami: { defaultText: "Web & Game Development", aboutText: "Who I Am" },
    skills: {
      defaultText: "Design & Front-End Development",
      aboutText: "What I Do",
    },
    community: {
      defaultText: "Community Engagement",
      aboutText: "How I Connect",
    },
    writing: {
      defaultText: "Technical Writing & Research",
      aboutText: "What I Write",
    },
    learning: { defaultText: "Courses & Learning", aboutText: "How I Learn" },
    download: { defaultText: "Download", aboutText: "Resources" },
  };

  const labels = Object.keys(labelMap).map((id) => document.getElementById(id));
  const navLinks = document.querySelectorAll(".menu-cell_link");

  function updateLabels() {
    if (aboutBtn.classList.contains("active")) {
      // If About is active, switch to "About" labels and hide nav links
      labels.forEach((label) => {
        if (label) label.textContent = labelMap[label.id].aboutText;
      });
      navLinks.forEach((link) => (link.style.display = "none"));
      bioDesc.forEach((desc) => (desc.style.display = "block"));
    } else {
      // If About is not active, reset labels to default and show nav links
      labels.forEach((label) => {
        if (label) label.textContent = labelMap[label.id].defaultText;
      });
      navLinks.forEach((link) => (link.style.display = "block"));
      bioDesc.forEach((desc) => (desc.style.display = "none"));
    }
  }

  // Observe class changes to "about-btn" to detect when it becomes active/inactive
  const observer = new MutationObserver(updateLabels);
  observer.observe(aboutBtn, { attributes: true, attributeFilter: ["class"] });

  // Initial call to set correct labels on page load
  updateLabels();
});
