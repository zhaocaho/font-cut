const extend = require("extend2");
const fs = require("fs");

// 查看文件/文件夹是否存在
function checkFileIsExists(path) {
  return fs.existsSync(path);
}

function merge(...args) {
  return extend(true, {}, ...args);
}

function setIgnore(ignoreList) {
  ignore = ignoreList;
}

function mergeDefaultConfig(origin, data = {}) {
  return merge(origin, data);
}

module.exports = {
  checkFileIsExists,
  merge,
  setIgnore,
  mergeDefaultConfig,
};
