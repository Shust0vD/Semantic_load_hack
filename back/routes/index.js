const Router = require("express");
const router = new Router();
const filesRouter = require("./filesRouter");

router.use("/files", filesRouter);

module.exports = router;
