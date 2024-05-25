const express = require("express");

let router = express();

const accountRoute = require("./accountRoute");

router.use("/account", accountRoute);
// router.use("/favorite-room", accountRoute);
// router.use("/book-schedules", accountRoute);
// router.use("/post", accountRoute);

module.exports = router;