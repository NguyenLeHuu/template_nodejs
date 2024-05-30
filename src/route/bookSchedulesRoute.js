const promiseRouter = require("express-promise-router");
const bookSchedulesContronller = require("../controllers/bookSchedulesContronller");

let route = promiseRouter();

route.post("/", bookSchedulesContronller.store);
route.get("/", bookSchedulesContronller.findAll);
route.get("/:id", bookSchedulesContronller.find);
route.put("/:id", bookSchedulesContronller.update);
route.delete("/:id", bookSchedulesContronller.delete);

module.exports = route;