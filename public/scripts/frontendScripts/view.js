class View {
  handleFilterBar() {
    const bar = document.querySelector(".section__products__filter-bar");

    document.querySelector("#closeBar").addEventListener("click", function (e) {
      e.preventDefault();
      bar.classList.add("hideBar");
      bar.classList.remove("showBar");
    });

    //open bar
    document.querySelector("#openBar").addEventListener("click", function (e) {
      e.preventDefault();
      bar.classList.remove("hideBar");
      bar.classList.add("showBar");
    });
  }

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
    document
      .querySelector(".hero__section .btn")
      .addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(".section__about").scrollIntoView();
      });
  }

  handleNavBar() {
    const hero = document.querySelector(".hero__section");
    const navbar = document.querySelector(".navbar");
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
          navbar.style.display = "none";
        } else navbar.style.display = "flex";
      });
    });
    observer.observe(hero);
  }
}

export default new View();
