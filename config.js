const path = require("path");
const { options } = require("./options");
const { merge, checkFileIsExists, setIgnore } = require("./utils/index");

// 用户配置
let userConf = null;
let defaultConfig = {
  ...options,
};

// 获取用户配置文件
const getUserConf = () => {
  // 存在时，直接使用缓存
  if (!!userConf) return userConf;

  // 校验：当前是否存在配置文件
  // const confPath = `${defaultConfig.dirRoot}/font-cutting.config.js`;
  const confPath = `${defaultConfig.dirRoot}/font-cutting.config.example.js`;
  console.log("confPath: ", confPath);
  if (!checkFileIsExists(confPath)) {
    defaultConfig.ignore = setDefaultIgnore();
    setIgnore(defaultConfig.ignore);
    return null;
  }

  // 重写配置文件
  const data = (userConf = require(confPath));
  data.ignore = setDefaultIgnore(data.ignore || []);
  defaultConfig = merge(defaultConfig, data);
  setIgnore(defaultConfig.ignore);
  console.log("defaultConfig: ", defaultConfig);
  return defaultConfig;
};

const setDefaultIgnore = (ignore = []) => {
  if (Array.isArray(ignore)) {
    ignore = ignore.map((e) => {
      return e.split("/").join(path.sep);
    });
    return ignore.concat(defaultConfig.defaultIgnore);
  } else {
    console.log("忽略文件配置有误");
    return process.exit(1);
  }
};

function getConfig() {
  return defaultConfig;
}

getUserConf();

module.exports = {
  getConfig,
};
