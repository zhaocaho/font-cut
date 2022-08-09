const fs = require('fs');
const path = require('path');
const _ = require('lodash');

class FontCollect {
  readText(fileName) {
    let buffer = fs.readFileSync(fileName);

    if (buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf) {
      buffer = buffer.prototype.slice(3);
    }

    return buffer.toString('utf-8');
  }

  getAllText(sourcePath) {
    let text = '';

    const getText = sourcePath => {
      if (!fs.statSync(sourcePath).isDirectory()) {
        text += this.readText(sourcePath);
      } else {
        fs.readdirSync(sourcePath).forEach(file => {
          const pathname = path.join(sourcePath, file);

          if (fs.statSync(pathname).isDirectory()) {
            getText(pathname);
          } else {
            text += this.readText(pathname);
          }
        });
      }
    };

    getText(sourcePath);

    return text;
  }

  collectChinese(sourcePath) {
    const text = this.getAllText(sourcePath);
    const chineseTextArray = text.match(/[\u4e00-\u9fa5]/g);

    return _.uniq(chineseTextArray).join('');
  }
}

module.exports = FontCollect;
