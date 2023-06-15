<script setup>
	import {ref, reactive, computed } from 'vue';
	import { useMenusStore } from '@/stores/menus';
	import { useUsersStore } from '@/stores/users';
	import { RouterLink, useRoute } from 'vue-router';
	import { collection, doc, getDocs, setDoc, addDoc, updateDoc } from 'firebase/firestore';
	import { useFirestore, useCollection } from 'vuefire';


	const menus = useMenusStore();
	const users = useUsersStore();

	const route = useRoute();
	console.log(route.params);

	const db = useFirestore();
	const menuCats = menus.menusCollection;

	const catSlug = ref('');

	const subMenuArray = useCollection(collection(db, 'food', route.params.slug, 'items'));

	console.log(subMenuArray);


	const item = ref("item1");
	const count = ref(0);

	async function addToCart(name) {

		await setDoc(doc(db, "users", users.current.uid, "carts", "cart1", "items", `item${count.value++}`), {
				item: name
		});

		alert(`${name} added to your cart`);
	}

		

</script>

<template>

	<ul class="menuItem-grid">
		<li v-for="item in subMenuArray" class="menu-card">{{item.name}}<button @click="addToCart(item.name)" type="button">Add to cart</button></li>

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
