import { spawn } from 'child_process'
import path from 'path'

const openHtml = () => {
    const frontendPath = path.resolve(__dirname, '../../servers/page')

    const child = spawn('pnpm', ['dev',], {
        cwd: frontendPath,
        shell:'/bin/bash',
    })

    child.stdout.on('data', (data) => {
        console.log(`众安科技门户:${data}`)
    })

    child.stderr.on('data', (data) => {
        console.log(`众安科技:${data}`)
    })

    child.on('close', (code) => {
        console.log(`child process exited with code ${code}`)
    })
}

export const openMockPage = () => {
    openHtml();
    // const frontendPath = path.resolve(__dirname, '../../servers/page')

    // const install = spawn('pnpm', ['i'], {
    //     cwd: frontendPath,
    //     shell:'/bin/bash',
    // })

    // install.stdout.on('data', (data) => {
    //     console.log(`众安科技下载完毕:${data}`)
    //     openHtml();
    // })
}

export const openNodePage = () => {
    const frontendPath = path.resolve(__dirname, '../../servers/node')
    // console.log('frontendPath',frontendPath)
    const child = spawn('node', ['app.js'], {
        cwd: frontendPath,
        shell:'/bin/bash',
    })

    child.stdout.on('data', (data) => {
        console.log(`众安科技后端1:${data}`)
    })

    child.stderr.on('data', (data) => {
        console.log(`众安科技后端2:${data}`)
    })

    child.on('close', (code) => {
        console.log(`众安科技后端3 child process exited with code ${code}`)
    })
}