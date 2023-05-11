class View {
  handleViewFilters() {
    const listItems = document.querySelectorAll(".container-filters li");
    listItems.forEach((el) => {
      el.addEventListener("click", function (e) {
        listItems.forEach((el) => el.classList.remove("active"));
        e.target.classList.add("active");
      });
    });
  }

  handleHeroScroll() {
    const btn = document.querySelector(".hero__section .btn");
    if (!btn) return;
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const aboutSection = document.querySelector(".section__about");
      const productSection = document.querySelector(".section__products");
      if (aboutSection) aboutSection.scrollIntoView();
      else productSection.scrollIntoView();
    });
  }

  handleNavBar() {
    const hero = document.querySelector(".hero__section");
    if (!hero) return;
    const navbar = document.querySelector(".navbar");
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navbar.style.display = "none";
        } else navbar.style.display = "flex";
      });
    });
    observer.observe(hero);
  }

  handleScrollToCatalog() {
    const btn = document.querySelector(".btn-scrollToCatalog");
    if (!btn) return;
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(".section__products").scrollIntoView();
    });
  }
}

export default new View();
