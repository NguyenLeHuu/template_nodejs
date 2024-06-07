const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const route = require("./src/route/index.js");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const swaggerUI = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

require("dotenv").config(); // get value from .env

let app = express();
app.use(helmet());
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());


// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // Giới hạn mỗi IP chỉ được gửi tối đa 100 request trong 15 phút
  message: "Quá nhiều yêu cầu từ IP này, vui lòng thử lại sau 15 phút",
  headers: true, // Bao gồm các header về giới hạn
});
app.use(limiter);

app.get("/", function (req, res) {
  res.set("Content-Type", "text/html; charset=utf-8");
  res.send("<h1>Hello World 2</h1>");
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

// var server = http.createServer(app);

app.listen(port, () => {
  console.log(`Server start port http://localhost:${port}`);
});