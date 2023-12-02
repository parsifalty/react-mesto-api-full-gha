const router = require("express").Router();
const usersRouter = require("./users");
const cardsRouter = require("./cards");
const signupRouter = require("./signup");
const singinRouter = require("./singin");
const auth = require("../middlewares/auth");

router.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

router.use(signupRouter);
router.use(singinRouter);

router.use(auth);

router.use("/users", usersRouter);
router.use("/cards", cardsRouter);

module.exports = router;
