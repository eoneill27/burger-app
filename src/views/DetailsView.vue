<script setup>
	
	import { ref, computed } from 'vue';
	import { useMenusStore } from '@/stores/menus';
	import { useRouter, useRoute } from 'vue-router';
	import MenuCatGrid from '@/components/MenuCatGrid.vue';

	const menus = useMenusStore();

	const route = useRoute();
	console.log(route.params);


	const menuCats = menus.menusCollection;

	const catSlug = ref('');

	menuCats.forEach((category) => {
		if (category.slug === route.params.slug) {
		catSlug.value = route.params.slug;
		}
	})

	console.log(catSlug.value);


</script>

<template>

	<section class="cat-header view-header">
		<div class="inner-column">
			<h1 class="heyyou-voice">{{catSlug}}</h1>
		</div>
	</section>

	<div class="inner-column">
		<MenuCatGrid />	
	</div>
</template>

<style>
	.cat-header {
		background-color: var(--main);
	}
</style>



