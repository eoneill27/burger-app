<script setup>
	import MenuGrid from '@/components/MenuGrid.vue';
	import { useMenusStore } from '@/stores/menus';
	import { useRouter, useRoute, RouterLink } from 'vue-router';

	const menus = useMenusStore();
</script>

<template>

	<section class="menu-header view-header">
		<div class="inner-column">
			<h1 class="heyyou-voice">Menu</h1>
		</div>
	</section>


	<div class="inner-column">
		<MenuGrid />	
	</div>


</template>

<style scoped>
	.menu-header {
		background-color: var(--main);
	}

</style>


