const fontCarrier = require("font-carrier");
const chalk = require("chalk");
const character = require("../config/common-character");
const { mergeDefaultConfig } = require("./index");
const { getConfig } = require("../config");

const fs = require("fs");
const FontCollect = require("./font-collect");

class FontTransfer {
  constructor(options) {
    this.options = mergeDefaultConfig(options, getConfig());
    this.init();
  }

  init() {
    const { options } = this;
    this.checkOptions(options);
  }

  checkOptions(options) {
    if (!options.source) throw new Error("请填写源文件路径 --source <path>");
    if (!options.font) throw new Error("请填写字体路径 --font <path>");
    if (!options.output) throw new Error("请填写输出路径 --output <filepath>");
  }

  getCutString() {
    const { options } = this;
    const collect = new FontCollect(options);
    const chineseText = collect.collectChinese();
    console.log(chalk.yellow("成功提取的字符串:\r\n >>>>>>>>>>>>>>> "));
    console.log(chalk.green(chineseText));

    return chineseText;
  }

  getSourceFontGlyph(cutString) {
    const { options } = this;
    const fontParse = fontCarrier.transfer(options.font);

    return fontParse.getGlyph(cutString);
  }

  justCutFont(cutString) {
    const { options } = this;
    const font = fontCarrier.transfer(options.font);
    font.min(cutString + character.fullCommonCharacter);
    return font;
  }

  createCutFont() {
    const cutString = this.getCutString();
    let font = null;
    if (this.options.action == "transfer") {
      // 自定义字体样式
      const cutGlyph = this.getSourceFontGlyph(cutString);
      font = fontCarrier.create();

      //字体信息调整
      const fontface = font.getFontface();
      console.log("fontface: ", fontface);
      Object.assign(fontface.options, {
        fontFamily: "iconfont", // 字体族名称
        fontWeight: "400",
        fontStretch: "normal",
        unitsPerEm: "1024",
        ascent: "812", //字体的上偏移量，默认是 812
        descent: "-212", //字体的下偏移量，默认是 -212
      });
      font.setFontface(fontface);

      font.setGlyph(cutGlyph);
    } else {
      // 仅进行字体精简
      font = this.justCutFont(cutString);
    }
    return font;
  }

  writeFontFile(font) {
    return new Promise((resolve) => {
      const { options } = this;
      let dirPath;

      if (options.output.charAt(options.output.length - 1) === "/") {
        dirPath = options.output;
      } else {
        dirPath = options.output + "/";
      }

      fs.mkdir(dirPath, () => {
        font.output({
          path: dirPath + options.name,
          types: options.type.split("/"),
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
