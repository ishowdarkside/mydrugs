import { alertWindow } from "../../alertWindow.js";
class View extends alertWindow {
  #form = document.querySelector("#addProductForm");

  handleCreatingProduct(handler) {
    this.#form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formInputs = new FormData(this.#form);

      try {
        const data = await handler(formInputs);
        this.handleSuccess(data.data.message);
      } catch (err) {
        this.handleError(err.message);
      }
    });
  }
}

export default new View();
