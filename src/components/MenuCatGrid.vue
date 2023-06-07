<script setup>
	import {ref, reactive, computed } from 'vue';
	import { useMenusStore } from '@/stores/menus';
	import { RouterLink, useRoute } from 'vue-router';
	import menuItems from '@/assets/data/menuItems.json';

	import { useFirestore, useCollection } from 'vuefire';
	import { collection } from 'firebase/firestore';

	const db = useFirestore();
	const burgers = useCollection(collection(db, 'burgers'));

	const route = useRoute();

	console.log(menuItems);
	const menuCat = route.params.slug;
	console.log(menuCat);

	const menuMatch = computed(function() {
		for(let i = 0; i < menuItems.length; i++) {
			if (menuItems[i].menuSlug === menuCat) {
				// return menuItems[i].menuItems;
				return menuItems[i].menuItems;
			}
		}
	})

</script>

<template>
	<ul>
		<li v-for="burger in burgers" :key="burger.id"> {{burger.name}}</li>
	</ul>
	<ul class="menuItem-grid">
		<li v-for="item in menuMatch" class="menu-card">{{item.name}}</li>

	</ul>
	
</template>

<style>

	.menuItem-grid {
		display: flex;
		flex-direction: column;
		gap: 30px;
	}
	.menuItem-card {
		max-width: 300px;
		max-height: 300px;
		aspect-ratio: 1;
		border: 2px solid var(--tertiary);
		box-shadow: -10px 10px var(--tertiary);
		padding: 10px;
	}

	@media (min-width: 500px) {
		.menuItem-grid {
			display: grid;
			grid-template-columns: 1fr 1fr;

		}
		.menuItem-card {
			max-width: 250px;
			max-height: 250px;
		}
	}

	@media (min-width: 700px) {
		.menuItem-grid {
			grid-template-columns: 1fr 1fr 1fr;
			gap: 40px;
		}
	}
</style>
