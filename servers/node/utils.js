const fs = require('fs-extra');
const path = require('path');

const createFile =async (id)=> {
    const filePath = path.resolve(__dirname,`config/${id}`);
	fs.ensureFileSync(`${filePath}/index.json`);
	fs.writeJSONSync(`${filePath}/index.json`,{});
}


module.exports = {
    createFile
}
