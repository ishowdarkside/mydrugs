export const createProduct = async function (formData) {
  const res = await axios.post("/api/products", formData);

  return res;
};
