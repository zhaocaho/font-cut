# font-cut

搜集项目中的中文自己根据字体文件提取出想要的字体文件

[![npm version](https://badge.fury.io/js/font-cut.svg)](http://badge.fury.io/js/font-cut)

# 安装

    npm install font-cut

# 功能

- 支持从 .css .html .js .vue 文件中裁剪中文字体。
- 支持 utf-8 编码
- 支持导出的格式 ['ttf', 'eot', 'woff', woff2, 'svg']

# 注意

只能使用 ttf svg 格式的字体进行切割

命令行 生成多个字体文件用 / 分开

# 使用

## 命令行

font-cutting -h

    Options:

    <!-- 版本 -->
    -V, --version output the version number

    <!-- 需要切割的资源路径 -->
    -s, --source <path> character file path or dir

    <!-- 被切割的字体文件路径 -->
    -f, --font <path> origin font file path

    <!-- 输出切割后的字体目录 -->
    -o, --output <filepath> filepath to output font files

    <!-- 切割后字体的名称,默认为font-->
    -n, --name <name>        name for new fonts (default: "font")

    <!-- 切割后的字体type,默认为woff2,生成多个字体文件用 / 分开  -->
    -t, --type <font-type>   create font type。 suppert:["ttf", "eot", "woff", "woff2", "svg"] (default: "woff2")


    -h, --help display help for command

## 示例

$ font-cut -f ./test/font/handfont.ttf -s ./test/test-text -o ./new-font -n myfont -t ttf/woff/svg


## 感谢

> <https://github.com/purplebamboo/font-carrier> 提供字体底层操作支持

> <https://github.com/JailBreakC/font-collector> 根据 JailBreakC 的代码库升级过后的使用