const promiseRouter = require("express-promise-router");
const configContronller = require("../controllers/configContronller");

let route = promiseRouter();

route.post("/", configContronller.store);
route.get("/", configContronller.findAll);
route.get("/:id", configContronller.find);
route.put("/:id", configContronller.update);
route.delete("/:id", configContronller.delete);

module.exports = route;