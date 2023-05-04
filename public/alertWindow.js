export class alertWindow {
  #alertWindow = document.querySelector("#alertWindow");

  handleSuccess(msg) {
    this.#alertWindow.textContent = msg;
    this.#alertWindow.classList.add("alert-success", "alert-show");
    setTimeout(() => {
      this.#alertWindow.classList.remove("alert-show");
      this.#alertWindow.classList.add("alert-hide");
    }, 1500);
  }

  handleError(msg) {
    this.#alertWindow.textContent = msg;
    this.#alertWindow.classList.add("alert-fail", "alert-show");
    setTimeout(() => {
      this.#alertWindow.classList.remove("alert-show");
      this.#alertWindow.classList.add("alert-hide");
    }, 2500);
  }
}
