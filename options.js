const DIR_ROOT = process.cwd();

const options = {
  // 执行命令目录路径
  dirRoot: DIR_ROOT,
  ignore: [], // 用户设置的忽略文件
  defaultIgnore: [], // 命令自动忽略的文件
};

module.exports = { options };
