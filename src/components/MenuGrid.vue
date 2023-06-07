<script setup>
	import {ref, reactive, computed } from 'vue';
	import { useMenusStore } from '@/stores/menus';
	import { RouterLink } from 'vue-router';

	const menus = useMenusStore();
	const list = menus.list;


</script>

<template>

	<ul class="menu-grid">
		<li v-for="menu in menus.list" class="menu-card">
			<RouterLink :to="`/menu/${menu.slug}`">{{ menu.name }}</RouterLink>
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
