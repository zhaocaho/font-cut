const fontCarrier = require('font-carrier');
const chalk = require('chalk');
const fs = require('fs');
const FontCollect = require('./font-collect');

class FontTransfer {
  constructor(options) {
    this.options = options;
    this.init();
  }

  init() {
    const { options } = this;
    this.checkOptions(options);
  }

  checkOptions(options) {
    if (!options.source) throw new Error('请填写源文件路径 --source <path>');
    if (!options.font) throw new Error('请填写字体路径 --font <path>');
    if (!options.output) throw new Error('请填写输出路径 --output <filepath>');
  }

  getCutString() {
    const { options } = this;

    const collect = new FontCollect();
    const chineseText = collect.collectChinese(options.source);

    console.log(chalk.yellow('成功提取的字符串:\r\n >>>>>>>>>>>>>>> '));
    console.log(chalk.green(chineseText));

    return chineseText;
  }

  getSourceFontGlyph(cutString) {
    const { options } = this;
    const fontParse = fontCarrier.transfer(options.font);

    return fontParse.getGlyph(cutString);
  }

  createCutFont() {
    const cutString = this.getCutString();
    const cutGlyph = this.getSourceFontGlyph(cutString);

    const font = fontCarrier.create();
    font.setGlyph(cutGlyph);

    return font;
  }

  writeFontFile(font) {
    return new Promise(resolve => {
      const { options } = this;
      fs.mkdir(options.output, () => {
        font.output({
          path: options.output + '/',
          types: ['woff2'],
        });
        resolve();
      });
    });
  }

  async output() {
    const font = this.createCutFont();
    await this.writeFontFile(font);
  }
}

module.exports = FontTransfer;
