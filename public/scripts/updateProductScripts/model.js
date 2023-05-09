export const updateProduct = async function (formData) {
  try {
    const productId = window.location.href.split("/").at(-1);

    const res = await axios.patch(`/api/products/${productId}`, formData);
    return res;
  } catch (err) {
    throw new Error(err.response.data.error.message);
  }
};
