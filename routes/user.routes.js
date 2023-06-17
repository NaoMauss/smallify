const rooter = require("express").Router();
const { Router } = require("express");
const authController = require("../controller/auth.controller");
const userController = require("../controller/user.controller");

//authentification
rooter.post("/register", authController.signUp);
rooter.post("/login", authController.signIn);
rooter.get("/logout", authController.logout);

//user display: 'block',
rooter.get("/", userController.getAllUsers);
rooter.get("/:id", userController.userInfo);
rooter.put("/:id", userController.updateUser);
rooter.delete("/:id", userController.deleteUser);

module.exports = rooter;
