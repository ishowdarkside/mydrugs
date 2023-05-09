export const createProduct = async function (formData) {
  try {
    const res = await axios.post("/api/products", formData);
    return res;
  } catch (err) {
    //console.log(err.response.data.error.message.split(":").shift().join(" "));
    throw new Error(err.response.data.message);
  }
};
