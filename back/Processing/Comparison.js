const Diff = require("diff");

const Comparsion = (text1, text2) => {
  const diff = Diff.diffWords(text1, text2);

  return diff;
};

module.exports = { Comparsion };
