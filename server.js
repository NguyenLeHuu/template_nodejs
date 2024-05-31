const http = require("http");

const express = require("express");

const bodyParser = require("body-parser");

const route = require("./src/route/index.js");

const cors = require("cors");

const swaggerUI = require("swagger-ui-express");

const swaggerFile = require("./swagger_output.json");

const run_mongo = require("./src/config/_mongodb.js")

// const initializeCron = require("./src/services/cron.js");

// initializeCron();

require("dotenv").config(); // get value from .env

let app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// const rateLimit = require('express-rate-limit');
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 phút
//   max: 100, // Giới hạn mỗi IP chỉ được gửi tối đa 100 request trong 15 phút
//   message: 'Quá nhiều yêu cầu từ IP này, vui lòng thử lại sau 15 phút',
//   headers: true, // Bao gồm các header về giới hạn
// });

// app.use(limiter);


app.get("/", function (req, res) {
  res.set("Content-Type", "text/html; charset=utf-8");
  res.send("<h1>Hello World</h1>");
});
app.use("/", route);
let port = process.env.PORT || 3000;

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    statusCode: 500,
    message: err.message,
  });
});

var server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server start port http://localhost:${port}`);
});


// const { Server } = require("socket.io");
// const io = new Server(server, {
//   cors: {
//   },
// });
// const initializeSocket = require("./src/services/Socket.io");
// initializeSocket(io);