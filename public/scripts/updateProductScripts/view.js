import { alertWindow } from "../../alertWindow.js";
class View extends alertWindow {
  #form = document.querySelector("#editProductForm");

  handleUpdating(handler) {
    this.#form.addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData(this.#form);
        const data = await handler(formData);

        this.handleSuccess(data.data.message);
        setTimeout(() => {
          location.reload(true);
        }, 2000);
      } catch (err) {
        this.handleError(err.message);
      }
    });
  }
}

export default new View();
