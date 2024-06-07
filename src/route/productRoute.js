const promiseRouter = require("express-promise-router");
const productContronller = require("../controllers/productContronller");

let route = promiseRouter();

// route.post("/login", productContronller.login);
route.post("/", productContronller.store);
route.get("/", productContronller.findAll);
route.get("/:id", productContronller.find);
route.put("/:id", productContronller.update);
route.delete("/:id", productContronller.delete);

module.exports = route;