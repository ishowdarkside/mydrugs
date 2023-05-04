class View {
  #form = document.querySelector("#registerForm");

  handleRegister(handler) {
    this.#form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      const data = await handler(formData);
      console.log(data);
    });
  }
}

export default new View();
