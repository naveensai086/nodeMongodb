var express = require("express");
var router = express.Router();
const userService = require("../services/user.service");

router.get("/usersget", userService.getUsers);

router.post("/usersinsert", userService.insertuser);

router.post("/usersupdate", userService.updateuser);

router.post("/usersdelete", userService.deleteUsers);

module.exports = router;
