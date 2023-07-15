import { cac } from 'cac'
import pkg from '../package.json'
import openServer from './openServer'
const cli = cac(pkg.name)

cli.command('ui', 'Lint files').option('--name <name>', 'Provide your name').action(openServer)
  // .command('lint [...args]', 'Lint files')
  // .option('--type <type>', 'Choose a project type', { // demo usage
  //   default: 'node',
  // })
  // .option('--name <name>', 'Provide your name')


cli.help()

cli.version(pkg.version)

cli.parse()
