export const deleteProduct = async function (productId) {
  const res = await fetch(`/api/products/${productId}`, {
    method: "DELETE",
  });
};
