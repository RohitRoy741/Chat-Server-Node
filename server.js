const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });
app.set("key", process.env.KEY);
const uri = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
const port = process.env.PORT;
mongoose.connect(uri).then(() => console.log("Database connected"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
