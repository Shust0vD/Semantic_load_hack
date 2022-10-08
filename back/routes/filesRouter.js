const Router = require("express");
const FilesController = require("../controllers/FilesController");
const router = new Router();

router.post("/upload", FilesController.uploadFiles);

module.exports = router;
