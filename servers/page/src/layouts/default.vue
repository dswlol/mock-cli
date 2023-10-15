<template>
	<Navigation />
	<div class="root-container">
		<router-view v-slot="{ Component }">
			<transition name="fade" mode="out-in">
				<component :is="Component" />
			</transition>
		</router-view>
	</div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.25s ease;
}

.root-container {
	height: calc(100% - 80px);
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
