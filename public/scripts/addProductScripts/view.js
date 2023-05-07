import { alertWindow } from "../../alertWindow.js";
class View extends alertWindow {
  #form = document.querySelector("#addProductForm");

  handleCreatingProduct(handler) {
    this.#form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formInputs = new FormData(this.#form);

      const data = await handler(formInputs);
      if (data.data.status === "success") {
        this.handleSuccess(data.data.message);
      }
    });
  }
}

export default new View();
