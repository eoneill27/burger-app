<script setup>
	import { ref, computed } from 'vue';
	import AllMenusGrid from '@/components/AllMenusGrid.vue';
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
		<AllMenusGrid />	
	</div>


</template>

<style scoped>
	.menu-header {
		background-color: var(--main);
	}

</style>


