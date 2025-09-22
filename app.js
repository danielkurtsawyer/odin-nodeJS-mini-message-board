const express = require("express");
const path = require("node:path");

const app = express();
const PORT = 3000;
const assetsPath = path.join(__dirname, "public");
const indexRouter = require("./routes/indexRouter");

app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);

// Every thrown error in the application or the previous middleware function calling `next` with an error as an argument will eventually go to this middleware function
app.use((err, req, res, next) => {
  console.error(err);
  // We can now specify the `err.statusCode` that exists in our custom error class and if it does not exist it's probably an internal server error
  res.status(err.statusCode || 500).send(err.message);
});

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server running on port ${PORT}`);
});
