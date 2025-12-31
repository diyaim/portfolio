// Function to add the "navbarDark" class to the navbar on scroll
function handleNavbarScroll() {
    const header = document.querySelector(".navbar");
    window.onscroll = function () {
        const top = window.scrollY;
        if (top >= 100) {
            header.classList.add("navbarDark");
        } else {
            header.classList.remove("navbarDark");
        }
    };
}

// Function to handle navbar collapse on small devices after a click
function handleNavbarCollapse() {
    const navLinks = document.querySelectorAll(".nav-item");
    const menuToggle = document.getElementById("navbarSupportedContent");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            new bootstrap.Collapse(menuToggle).toggle();
        });
    });
}

function createSkillsFromJSON() {
  const grid = document.querySelector("#skills .skills-grid");
  if (!grid) return;

  fetch("data/skills.json")
    .then((res) => res.json())
    .then((skills) => {
      grid.innerHTML = "";

      skills.forEach((skill) => {
        const article = document.createElement("article");
         article.className = `skill-card ${skill.type}`;
        article.innerHTML = `
          <div class="skill-head">
            <i class="${skill.icon}" aria-hidden="true"></i>
            <h3>${skill.title}</h3>
          </div>
          <p>${skill.text}</p>
          <u class="skill-pills">
            ${skill.pills.map(p => `<li>${p}</li>`).join("")}
          </ul>
        `;
        grid.appendChild(article);
      });
    })
    .catch(err => console.error("Erreur skills :", err));
}

function createPortfolioFromJSON()  {
  const grid = document.querySelector("#portfolio .projects-grid");
  if (!grid) return;

  fetch("data/portfolio.json")
    .then((res) => {
      if (!res.ok) throw new Error("Impossible de charger data/portfolio.json");
      return res.json();
    })
    .then((projects) => {
      grid.innerHTML = "";

      projects.forEach((p) => {
        const article = document.createElement("article");
        article.className = `project-card ${p.class || ""}`.trim();

        const tagsHTML = (p.tags || []).map((t) => `<li>${t}</li>`).join("");
             const codeButtonHTML = p.codeUrl
          ? `<a class="btn btn-outline-secondary btn-pill" href="${p.codeUrl}" target="_blank" rel="noopener">${p.codeLabel || "Code"}</a>`
          : "";

        article.innerHTML = `
          <div class="project-thumb" aria-label="Voir le projet ${p.slug || p.title}">
            <img src="images/${p.image}" alt="Aperçu du projet ${p.title}" />
          </div>

          <div class="project-body">
            <h3 class="project-title">${p.title}</h3>
            <p class="project-desc">${p.desc}</p>

            <ul class="project-tags">
              ${tagsHTML}
            </ul>

            <div class="project-actions">
              <a class="btn btn-primary btn-pill" href="${p.projectPage}">Voir le projet</a>
              ${codeButtonHTML}
            </div>
          </div>
        `;

        grid.appendChild(article);
      });
    })
    .catch((err) => console.error("Projects error:", err));
}
// Call the functions to execute the code
handleNavbarScroll();
handleNavbarCollapse();
createSkillsFromJSON();
createPortfolioFromJSON();
