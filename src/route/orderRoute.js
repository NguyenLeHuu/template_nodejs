const promiseRouter = require("express-promise-router");
const orderContronller = require("../controllers/orderContronller");

let route = promiseRouter();

// route.post("/login", orderContronller.login);
route.post("/", orderContronller.store);
route.get("/", orderContronller.findAll);
route.get("/:id", orderContronller.find);
route.put("/:id", orderContronller.update);
route.delete("/:id", orderContronller.delete);

route.get("/get-cart/:id", orderContronller.getCartForHangHoa);
route.put("/add-product/:id", orderContronller.push);
route.put("/remove-product/:id", orderContronller.pull);

module.exports = route;