<script setup>
	
	import { ref, computed } from 'vue';
	import { useMenusStore } from '@/stores/menus';
	import { useRouter, useRoute } from 'vue-router';
	import MenuCatGrid from '@/components/MenuCatGrid.vue';

	const menus = useMenusStore();

	const list = menus.list;

	const router = useRouter();
	const route = useRoute();
	console.log(route.params);
	const menuId = route.params.slug;

	const menuCat = computed(function() {
		for (let i = 0; i < list.length; i++) {
			if (list[i].slug === menuId) {
				console.log(list[i].name);
				return list[i].name;
			}
		}
	})

</script>

<template>

	<section class="cat-header view-header">
		<div class="inner-column">
			<h1 class="heyyou-voice">{{menuCat}}</h1>
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



