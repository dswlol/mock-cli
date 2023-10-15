<script setup lang="ts">
import { getRoutes } from '~/plugins/router'
import { SwitchIcon } from 'vue-dark-switch'

const { t } = useI18n()

const routes = getRoutes()
	.filter((r) => !r.path.includes('notFound'))
	.map((r) => {
		let { path, name } = r
		if (path === '/') {
			return { path, name: 'home' }
		}

		if (!name) {
			name = path
		}

		return { path, name: name.toString().slice(1).replaceAll('/', '') }
	})
</script>

<template>
	<nav
		class="page-nav mx-auto h-80px max-w flex items-center justify-between p-4"
	>
		<span class="h-10 w-10 flex items-center justify-center">
			<SwitchIcon unmount-persets />
		</span>
	</nav>
</template>
<style lang="scss" scoped>
 .page-nav {
	background: var(--prism-background);
 }
</style>
