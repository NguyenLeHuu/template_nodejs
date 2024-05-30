const promiseRouter = require("express-promise-router");
const favoritePostController = require("../controllers/favoritePostController");

let route = promiseRouter();

route.post("/", favoritePostController.store);
route.get("/", favoritePostController.findAll);
route.get("/:id", favoritePostController.find);
route.put("/:id", favoritePostController.update);
route.delete("/:id", favoritePostController.delete);

module.exports = route;