const promiseRouter = require("express-promise-router");
const authContronller = require("../controllers/authContronller");

let route = promiseRouter();

route.post("/login", authContronller.login);

module.exports = route;