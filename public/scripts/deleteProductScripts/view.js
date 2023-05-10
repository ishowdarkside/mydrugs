//import { alertWindow } from "../../alertWindow";
class View {
  #parentElement = document.querySelector(".deleteProductsPanel");

  handleDeleteProduct(handler) {
    this.#parentElement.addEventListener("click", (e) => {
      const productElement = e.target.closest(
        ".section__products__product-wrapper"
      );
      if (!productElement) return;
      const productId = productElement.dataset.identifier;
      this.handlePopup(
        productElement.querySelector(".title").textContent,
        handler,
        productId
      );
    });
  }

  handlePopup(productName, handler, productId) {
    const html = `
    <div class='overlay'>
    <div class='deleteAlert'>
    <span>Are you sure you want to delete ${productName}<span>
    <div class="alertBtns-wrapper mt-small"><button id="deleteProduct" class='btn btn--black'>Yes</button><button id="cancelDelete" class='btn btn--white'>Cancel</button>
    </div></div>
    `;

    document.querySelector("body").insertAdjacentHTML("beforeend", html);
    this.handleButtons(handler, productId);
  }

  handleButtons(handler, productId) {
    //Handle Close button
    document
      .querySelector("#cancelDelete")
      .addEventListener("click", function (e) {
        document.querySelector(".overlay").remove();
      });

    //Handle Delete button
    document
      .querySelector("#deleteProduct")
      .addEventListener("click", async function (e) {
        const res = await handler(productId);

        location.reload(true);
      });
  }
}

export default new View();
