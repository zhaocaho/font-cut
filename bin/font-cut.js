const program = require('commander');
const FontTransfer = require('../utils/font-transfer');

program
  .version(require('../package.json').version)
  .usage('[options] <file or dir ...>')
  .option('-s, --source <path>', 'character file path or dir')
  .option('-f, --font <path>', 'origin font file path')
  .option('-o, --output <filepath>', 'filepath to output font files')
  .option('-n, --name <name>', 'name for new fonts')
  .option('-t, --type <font-type>', 'create font type', 'woff2')
  .parse();

const options = program.opts();

const fontTransfer = new FontTransfer(options);
fontTransfer.output();
