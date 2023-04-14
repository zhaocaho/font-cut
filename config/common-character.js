const chinesePunctuationList = "。？！，、；：“”‘’（）——-";

const englishAlphabet = "abcdefghijklmnopqrstuvwxyz";

const englishCapitalAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const englishPunctuationList = "`~!@#$%^&*()_-+={[}]|\\:;\"'?/>.<,}`";

const number = "0123456789";

const fullCommonCharacter =
  chinesePunctuationList +
  englishAlphabet +
  englishCapitalAlphabet +
  englishPunctuationList +
  number;

const character = {
  chinesePunctuationList,
  englishAlphabet,
  englishCapitalAlphabet,
  englishPunctuationList,
  number,
  fullCommonCharacter,
};

module.exports = character;
