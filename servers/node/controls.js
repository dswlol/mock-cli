const fs = require('fs-extra');
const mockjs = require('mockjs')

const addFileConfig = (path,body)=>{
    let file;
    try{
    fs.ensureFileSync(path);

    file = fs.readJSONSync(path);
    }catch(e){
      file = {}
    }
    let id = +new Date() + parseInt(Math.random(1,100)*100);
    file[id] = {
        id,
        ...body
    }
    fs.writeJSONSync(path,file);
    return id;
}

// 初始话项目amock 配置资源
const createInitAmock = (path)=> {
    const filePath = `${path}/amock/index.json`;
    // console.log('创建初始化项目配置文件 filePath===',filePath,fs.pathExistsSync(filePath))
    if(!fs.pathExistsSync(filePath)){
       fs.ensureFileSync(filePath);
	   fs.writeJSONSync(filePath,{main:[],group:{}});
    }
    const defaultApi = `${path}/amock/defaultApi.json`;
    if(!fs.pathExistsSync(defaultApi)){
        fs.ensureFileSync(defaultApi);
        fs.writeJSONSync(defaultApi,{});
    }
}

// 初始话项目amock 配置资源
const getProjectPath = (projectId,confPath)=> {
    let file;
    try{
    fs.ensureFileSync(confPath);
    file = fs.readJSONSync(confPath);
    return file[projectId].path;
    }catch(e){
      file = {}
    }
}

// 给项目加入url 配置
const addApiConf = (path,urlInfo)=> {
    const filePath = `${path}/amock/index.json`;
    let file;
    try{
    fs.ensureFileSync(filePath);

    file = fs.readJSONSync(filePath);
    }catch(e){
      file = {}
    }
    console.log(file)
    if(urlInfo.isGroup){
        console.log('待开发分组')
    }else{
        if(!file?.main){
            file.main = []
        }
        file.main.push(urlInfo);
    }
    console.log('filefile',file)
    fs.writeJSONSync(filePath,file);
}

// 给项目加入url的mock数据
const addApiMock = (path,isGroup,urlInfo)=> {
    const filePath =isGroup ? `${path}/amock/defaultApi.json`: `${path}/amock/defaultApi.json`;
    let file;
    try{
    fs.ensureFileSync(filePath);

    file = fs.readJSONSync(filePath);

    file = {...file,...urlInfo}
    }catch(e){
      file = {}
    }
    fs.writeJSONSync(filePath,file);
}

const getResponseMock = (path,url)=> {
    const filePath = `${path}/amock/index.json`;
    let file;
    try{
    fs.ensureFileSync(filePath);

    file = fs.readJSONSync(filePath);
    console.log(url,'filefile',file)
    const temp = file.main.find((item)=>item.apiUrl===url);
    console.log(temp,'temptemptemp');
    const mockPath = `${path}/amock/defaultApi.json`

    fs.ensureFileSync(mockPath);
    mockFile = fs.readJSONSync(mockPath);
    return mockjs.mock(mockFile[url]||[])
    // if(temp.dataSource !== '01'){

    // }
    }catch(e){
      console.log(e)
    }
}

const queryProjectUrls = (path)=> {
    const filePath = `${path}/amock/index.json`;
    let file;
    try{
    fs.ensureFileSync(filePath);

    file = fs.readJSONSync(filePath);

    return file.main||[]
    }catch(e){
      console.log(e)
    }
}



module.exports = {
    addFileConfig,
    createInitAmock,
    getProjectPath,
    addApiConf,
    addApiMock,
    getResponseMock,
    queryProjectUrls
}