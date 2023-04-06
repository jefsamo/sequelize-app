const express = require("express");
const expresshandlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./config/database");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const _handlebars = require("handlebars");

db.authenticate()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(console.log("Error", err));
  });

const app = express();

app.engine(
  "handlebars",
  expresshandlebars.engine({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(_handlebars),
  })
);
app.set("view engine", "handlebars");
// app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.render("index", { layout: "landing" });
});
app.use("/gigs", require("./routes/gigs"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port http://127.0.0.1:${PORT}`);
});
