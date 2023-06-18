const rooterLink = require("express").Router();
const { Router } = require("express");
const linkController = require("../controller/link.controller");
const rooter = require("./user.routes");

rooterLink.post("/createlink", linkController.createLink);

module.exports = rooterLink;
