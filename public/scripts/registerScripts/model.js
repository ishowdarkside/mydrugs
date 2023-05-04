export const registerUser = async function (formData) {
  const res = await fetch("/api/users/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      passwordConfirm: formData.get("passwordConfirm"),
    }),
  });

  const data = await res.json();
  return data;
};
