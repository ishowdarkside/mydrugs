class View {
  #form = document.querySelector("#loginForm");

  handleLoginUser(handler) {
    this.#form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const formInputs = new FormData(this);
      const data = await handler(formInputs);
      console.log(data);
    });
  }
}

export default new View();
