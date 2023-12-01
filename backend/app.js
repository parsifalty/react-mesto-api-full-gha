const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const NotFoundError = require("./errors/NotFoundError");
const cors = require("cors");
const dotenv = require("dotenv");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3000, DB_URL = "mongodb://0.0.0.0:27017/mestodb" } = process.env;
const app = express();

app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use("/", require("./routes/index"));

app.use(errorLogger);

app.use("*", () => {
  throw new NotFoundError("страница не найдена");
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла обишка" : message,
  });
  next(err);
});

app.listen(PORT, () => {});
