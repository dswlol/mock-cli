import Tov from './presets'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [Tov()],
	server: {
		host: true,
		port: 4399,
		open: true,
		// http://localhost:5173/api/login -> http://www.test.com/login
		proxy: {
			//api是自行设置的请求前缀，任何请求路径以/api开头的请求将被代理到对应的target目标
			'/mockApi': {
				target: 'http://localhost:4388', //需要代理的域名，目标域名
				changeOrigin: true, //需要代理跨域
				// rewrite: (path) => path.replace(/^\/mockApi/, ''), //路径重写，把'/api'替换为''
			},
		},
	},
})
