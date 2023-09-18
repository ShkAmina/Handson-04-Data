const route = require("express").Router();
const { register, login } = require("../Controller/userController")
route.post("/signup", register)
route.post("/login", login)
module.exports = route