import { alertWindow } from "../../alertWindow.js";
class View extends alertWindow {
  #form = document.querySelector("#registerForm");

  handleRegister(handler) {
    this.#form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(this.#form);
      const data = await handler(formData);

      if (data.status !== "success") return this.handleError(data.message);
      else if (data.status === "success") {
        this.handleSuccess(data.message);
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    });
  }
}

export default new View();
