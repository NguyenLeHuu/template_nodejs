const promiseRouter = require("express-promise-router");
const postContronller = require("../controllers/postContronller");

let route = promiseRouter();

route.post("/", postContronller.store);
route.get("/", postContronller.findAll);
route.get("/:id", postContronller.find);
route.put("/:id", postContronller.update);
route.delete("/:id", postContronller.delete);

module.exports = route;