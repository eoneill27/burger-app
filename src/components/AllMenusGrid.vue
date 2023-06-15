<script setup>
	import {ref, reactive, computed } from 'vue';
	import { useMenusStore } from '@/stores/menus';
	import { RouterLink, useRoute } from 'vue-router';
	import { useFirestore, useCollection } from 'vuefire';
	import { collection, doc, getDocs } from 'firebase/firestore';

	const menus = useMenusStore();

	console.log(menus.menusCollection);

</script>

<template>

	<ul class="menu-grid">
		<li v-for="category in menus.menusCollection" :key="category.id" class="menu-card">
			<RouterLink :to="`/menu/${category.slug}`">{{category.menuName}}</RouterLink>
		</li>
	</ul>
	
</template>

<style>

	.menu-grid {
		display: flex;
		flex-direction: column;
		gap: 30px;
	}
	.menu-card {
		max-width: 300px;
		max-height: 300px;
		aspect-ratio: 1;
		border: 2px solid var(--tertiary);
		box-shadow: -10px 10px var(--tertiary);
		padding: 10px;
	}

	@media (min-width: 500px) {
		.menu-grid {
			display: grid;
			grid-template-columns: 1fr 1fr;

		}
		.menu-card {
			max-width: 250px;
			max-height: 250px;
		}
	}

	@media (min-width: 700px) {
		.menu-grid {
			grid-template-columns: 1fr 1fr 1fr;
			gap: 40px;
		}
	}
</style>
