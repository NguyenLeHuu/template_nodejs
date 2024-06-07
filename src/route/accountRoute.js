const promiseRouter = require("express-promise-router");
const accountContronller = require("../controllers/accountContronller");

let route = promiseRouter();

// route.post("/login", accountContronller.login);
route.post("/register", accountContronller.store);
route.get("/", accountContronller.findAll);
route.get("/:id", accountContronller.find);
route.put("/:id", accountContronller.update);
route.delete("/:id", accountContronller.delete);

module.exports = route;