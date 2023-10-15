import { openMockPage, openNodePage } from './utils'

interface optionType { [k: string]: any }

const openServer = (args: Array<string>, options: optionType,dir:string) => {
    console.log(args,'llll}}}',options,'dir',dir)
    openMockPage();
    openNodePage();
}

export default openServer