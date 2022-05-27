const express = require("express");
const path = require("path");
const logger = require("./config/logger");
const { router } = require("./routes");
const HttpError = require("./utils/http-errors");
const config = require("./config/config");
const cors = require("cors");

// init
const app = express();

// middlewares
app.use(express.json({ extended: true })); // bodyparser
app.use(express.urlencoded({ extended: true })); // // handle form submissions/url encoded data
app.use(cors());
app.options("*", cors());

// or use longer version
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested, Content-Type, Accept, Authorization"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
//   next();
// });

// routes
app.use("/api", router);

// handle Could not GET errors... (optional feature)
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

// middleware executes only if any route encouters an error
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "../ui/dist/index.html"));
});

app.listen(config.port, () =>
  logger.info(`Server started on port ${config.port}`)
);
