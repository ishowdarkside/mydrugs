import { alertWindow } from "../../alertWindow.js";
class View extends alertWindow {
  #form = document.querySelector("#loginForm");

  handleLoginUser(handler) {
    this.#form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formInputs = new FormData(this.#form);
      const data = await handler(formInputs);
      console.log(data);
      if (data.status !== "success") {
        return this.handleError(data.message);
      } else window.location.href = "/main";
    });
  }
}

export default new View();
