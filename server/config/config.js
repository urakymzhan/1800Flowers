const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../../.env") });

console.log(process.env.NODE_ENV);

const port = process.env.PORT || 5000;
const env =
  process.env.NODE_ENV === "development" ? "development" : "production";

module.exports = {
  port,
  env,
};
