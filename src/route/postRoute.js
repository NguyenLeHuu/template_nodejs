const promiseRouter = require("express-promise-router");
const postContronller = require("../controllers/postContronller");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.post("/",multer.Multer.array("image"), postContronller.store);
route.get("/", postContronller.findAll);
route.get("/:id", postContronller.find);
route.put("/:id", postContronller.update);
route.put("/comments/:id", postContronller.updateCmt);
route.delete("/:id", postContronller.delete);

module.exports = route;