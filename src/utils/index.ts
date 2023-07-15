import { spawn } from 'child_process'
import path from 'path'

export const openMockPage = () => {
    const frontendPath = path.resolve(__dirname, '../../servers/page')

    const child = spawn('pnpm', ['dev'], {
        cwd: frontendPath,
        shell:'/bin/bash',
    })

    child.stdout.on('data', (data) => {
        console.log(`众安科技:${data}`)
    })

    child.stderr.on('data', (data) => {
        console.log(`众安科技:${data}`)
    })

    child.on('close', (code) => {
        console.log(`child process exited with code ${code}`)
    })
}

export const openNodePage = () => {
    const frontendPath = path.resolve(__dirname, '../../servers/node')

    const child = spawn('pnpm', ['app.js'], {
        cwd: frontendPath,
        shell:'/bin/bash',
    })

    child.stdout.on('data', (data) => {
        console.log(`众安科技:${data}`)
    })

    child.stderr.on('data', (data) => {
        console.log(`众安科技:${data}`)
    })

    child.on('close', (code) => {
        console.log(`child process exited with code ${code}`)
    })
}