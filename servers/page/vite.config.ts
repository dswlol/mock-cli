import Tov from './presets'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [Tov()],
	server: {
		host: true,
		port: 4399,
		open: true
	}
})
