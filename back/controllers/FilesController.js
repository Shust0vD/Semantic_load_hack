class FileController {
  async uploadFiles(req, res, next) {
    const { file1, file2 } = req.body.files;

    return res.json({ file1, file2 });
  }
}

module.exports = new FileController();
