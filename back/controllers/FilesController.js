const { Comparsion } = require("../pythonDefs/Comparison");

class FileController {
  async uploadFiles(req, res, next) {
    const { file1, file2 } = req.body.files;

    const comp = Comparsion(file1, file2);

    return res.json(comp);
  }
}

module.exports = new FileController();
