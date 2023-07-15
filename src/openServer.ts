import { openMockPage, openNodePage } from './utils'

interface optionType { [k: string]: any }

const openServer = (args: Array<string>, options: optionType) => {
    openMockPage();
    openNodePage();
}

export default openServer