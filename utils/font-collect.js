const fs = require("fs");
const path = require("path");
const _ = require("lodash");

class FontCollect {
  constructor(options) {
    this.options = options;
  }

  readText(fileName) {
    let buffer = fs.readFileSync(fileName);

    if (buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf) {
      buffer = buffer.prototype.slice(3);
    }

    return buffer.toString("utf-8");
  }

  getAllText(sourcePath) {
    let text = "";
    const getText = (sourcePath) => {
      const isPathExist = this.options.ignore.includes(sourcePath);
      if (!fs.statSync(sourcePath).isDirectory()) {
        if (!isPathExist) {
          text += this.readText(sourcePath);
        }
      } else {
        if (!isPathExist) {
          fs.readdirSync(sourcePath).forEach((file) => {
            const pathname = path.join(sourcePath, file);
            const isPathExist = this.options.ignore.includes(pathname);
            if (fs.statSync(pathname).isDirectory()) {
              getText(pathname);
            } else {
              if (!isPathExist) {
                text += this.readText(pathname);
              }
            }
          });
        }
      }
    };

    getText(sourcePath);

    return text;
  }

  collectChinese() {
    const text = this.getAllText(this.options.source);
    const chineseTextArray = text.match(/[\u4e00-\u9fa5]/g);
    return _.uniq(chineseTextArray).join("");
  }
}

module.exports = FontCollect;
