<script setup>
	
	import { ref, computed } from 'vue';
	import { useMenusStore } from '@/stores/menus';
	import { useRouter, useRoute } from 'vue-router';
	import MenuItem from '@/components/MenuItem.vue';
	import { useFirestore, useCollection } from 'vuefire';
	import { collection } from 'firebase/firestore';

	const menus = useMenusStore();
	const db = useFirestore();
	const route = useRoute();
	console.log(route.params);

	const menuCats = menus.menusCollection;

	const catSlug = ref('');

	menuCats.forEach((category) => {
		if (category.slug === route.params.slug) {
		catSlug.value = route.params.slug;
		}
	})

	const subMenuArray = useCollection(collection(db, 'food', route.params.slug, 'items'));

</script>

<template>

	<section class="cat-header view-header">
		<div class="inner-column">
			<h1 class="heyyou-voice">{{catSlug}}</h1>
		</div>
	</section>

	<div class="inner-column">
		<ul class="menuItem-grid">
			<li v-for="item in subMenuArray" :key="item.id" class="menu-card">
				<h3 class="info-voice">{{item.name}}</h3>
				<MenuItem :item="item"/>
			</li>
		</ul>
	</div>
</template>

<style>
	.cat-header {
		background-color: var(--main);
	}
</style>



