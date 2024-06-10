const promiseRouter = require("express-promise-router");
const accountContronller = require("../controllers/accountContronller");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.post("/register", accountContronller.store);
route.post("/login", accountContronller.login);
route.get("/", accountContronller.findAll);
route.get("/:id", accountContronller.find);
route.put("/:id", multer.Multer.single("image"), accountContronller.update);
route.delete("/:id", accountContronller.delete);

route.get("/favorite-post/:id", accountContronller.getFavoritePost);
route.post("/favorite-post/:id", accountContronller.storeFavoritePost);
route.put("/favorite-post/:id", accountContronller.deleteFavoritePost);
module.exports = route;