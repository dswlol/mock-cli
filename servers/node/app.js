const Koa = require('koa')
const Router = require('koa-router');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const path = require('path')
const fs = require('fs-extra');
var Mock = require('mockjs')
const {SELF_API} = require('./common')
const { addFileConfig,createInitAmock, getProjectPath,addApiConf,addApiMock,getResponseMock,queryProjectUrls } = require('./controls')
// const {createFile} = require('./utils')

const filePath = path.resolve(__dirname,'config/index.json');
const confPath = path.resolve(__dirname,'config/conf.json');
const app = new Koa();
const router = new Router();

app.use(json())
app.use(bodyParser());

const updateConfigMain = async (pathname,body)=>{
  let file;
  try{
    fs.ensureFileSync(filePath);

    file = fs.readJSONSync(filePath);
  }catch(e){
    file = {}
  }
  file[pathname] = {
    data: body,
    method:'get'
  }
  fs.writeJSONSync(filePath,file);
}

const readConfigMain = (pathname)=>{
    let file;
    try{
      file = fs.readJSONSync(filePath);
    }catch(e){
      file = {}
    }
    console.log(file['/mockApi/_addMock'].data)
    return  file['/mockApi/_addMock'].data;
  }


app.use(async (ctx, next) => {
    if(SELF_API.includes(ctx.URL.pathname)){
        await next();
    }else{
      const {_mockprojectid} = ctx.header;
      console.log(_mockprojectid);
      const projectPath = getProjectPath(_mockprojectid,confPath);
      const mock = getResponseMock(projectPath,ctx.URL.pathname)
      //  ctx.body = {data:Mock.mock(readConfigMain(ctx.URL.pathname))}
       ctx.body = mock
    }
  });

router.post('/mockApi/_addMock',async(ctx)=>{
  const id = await addFileConfig(confPath,ctx.request.body);
  console.log('ksksks',id,ctx.request.body.path);
  createInitAmock(ctx.request.body?.path);
  ctx.body = {
    status:'ok',
    code:'10000',
    data:'',
    message:''
  };
})

router.get('/mockApi/_queryProductList',async(ctx)=>{
  let file;
  try{
    fs.ensureFileSync(confPath);
    file = fs.readJSONSync(confPath);

  }catch(e){
    file = {}
  }
  ctx.body = Object.keys(file).map((key)=>{
    return file[key];
  })
})

router.post('/mockApi/_addMockUrl',async(ctx)=>{
  const {projectId,apiUrl,apiName,isGroup,data} = ctx.request.body;
  console.log(projectId,apiUrl,apiName,isGroup)
  try{
    const projectPath = getProjectPath(projectId,confPath);
    //dataSource 代表数据存在哪里 01 代表默认 defayltApi.json文件;
    addApiConf(projectPath,{apiUrl,isGroup,dataSource:'01',name:apiName});
    addApiMock(projectPath,isGroup,{[apiUrl]:{name:apiName,data}})
  }catch(e){
    console.log(e)
  }
  ctx.body = {
    status:'ok',
    code:'10000',
    data:'',
    message:''
  };
})


router.post('/mockApi/_getProjectUrls',async(ctx)=>{
  const {projectId} = ctx.request.body;
  try{
    const projectPath = getProjectPath(projectId,confPath);
    //dataSource 代表数据存在哪里 01 代表默认 defayltApi.json文件;
    ctx.body = {
      status:'ok',
      code:'10000',
      data:queryProjectUrls(projectPath),
      message:''
    };
  }catch(e){
    console.log(e)
  }
})



app.use(router.routes())

app.listen(4388,()=>{
    console.log('服务开启啦')
})