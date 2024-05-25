const promiseRouter = require("express-promise-router");
const LoginController = require("../controllers/LoginController");

let route = promiseRouter();

route.post("/", LoginController.checkUserInDB);
route.get("/a", LoginController.login);

module.exports = route;