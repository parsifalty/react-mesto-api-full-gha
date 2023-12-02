const router = require("express").Router();
const usersRouter = require("./users");
const cardsRouter = require("./cards");
const signupRouter = require("./signup");
const singinRouter = require("./singin");
const auth = require("../middlewares/auth");

router.use(signupRouter);
router.use(singinRouter);

router.use(auth);

router.use("/users", usersRouter);
router.use("/cards", cardsRouter);

module.exports = router;
