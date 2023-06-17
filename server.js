const express = require("express");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const linkRoutes = require("./routes/link.routes");
const LinkModel = require("./models/links.model");
const linkController = require("./controller/link.controller");
require("dotenv").config({ path: "./config/.env" });
require("./config/db.js");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const cors = require("cors");
const cron = require("node-cron");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

//jwt
app.get("*", checkUser); // s'execute à chaque redirection pour vérifier le cookie
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

//routes
app.use("/api/user", userRoutes);
app.use("/api/link", linkRoutes);
app.get("/:short_url", linkController.redirectToLink);

//server
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
