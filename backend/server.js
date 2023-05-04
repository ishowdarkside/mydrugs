const app = require("./app");
const mongoose = require("mongoose");
const DB = process.env.DB_CONNECT_LINK.replace(
  "<password>",
  process.env.DB_PASSWORD
);
mongoose
  .connect(DB)
  .then(() => console.log("Successfully connected to database"))
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening app on port ${port}`);
});
