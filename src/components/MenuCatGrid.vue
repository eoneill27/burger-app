<script setup>
	import {ref, reactive, computed } from 'vue';
	import MenuItem from '@/components/MenuItem.vue';
	import { useMenusStore } from '@/stores/menus';
	import { useUsersStore } from '@/stores/users';
	import { useOrdersStore } from '@/stores/orders';
	import { useInterfaceStore } from '@/stores/interface';

	import { RouterLink, useRoute } from 'vue-router';
	import { collection, doc, getDocs, setDoc, addDoc, updateDoc } from 'firebase/firestore';
	import { useFirestore, useCollection, getCurrentUser } from 'vuefire';

	const menus = useMenusStore();
	const users = useUsersStore();
	const orders = useOrdersStore();
	const ui = useInterfaceStore();

	const route = useRoute();
	console.log(route.params);

	const db = useFirestore();
	const menuCats = menus.menusCollection;

	const catSlug = ref('');

	const subMenuArray = useCollection(collection(db, 'food', route.params.slug, 'items'));

	console.log(subMenuArray);

	await getCurrentUser();
	// const currentOrder = useCollection(collection(db, 'users', users.current.uid, 'carts', 'cart1', 'items' ));

	// const currentOrderArray = currentOrder.value;
	// console.log(currentOrderArray);

	// const count = ref(0);

	const ingredients = ref([]);

	async function addToCart(name, ingredients, specialInstr, quantity, price) {
		
		await getCurrentUser();

		const subtotal = Number(price * quantity);

		if (specialInstr) {
			specialInstr == specialInstr;
		} else {
			specialInstr = '';
		}

		await addDoc(collection(db, "users", users.current.uid, "carts", "cart1", "items"), {
					name: name,
					ingredients: ingredients,
					specialInstr: specialInstr,
					subtotal: subtotal,
					quantity: quantity
		});

		if (quantity > 1) {
			alert(`${quantity} ${name}s were added to your cart`);
		} else {
			alert(`1 ${name} was added to your cart`);		
		}
	}

</script>

<template>

	<ul class="menuItem-grid">

		<li v-for="item in subMenuArray" :key="item.id" class="menu-card">
			<MenuItem :item='item'/>

		</li>

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
	.details-closed {
		display: none;
	}

	.details-open {
		display: block;
	}

	#instructions {
		margin-bottom: 15px;
	}

	#quantity {
		display: flex;
		padding: 10px 0;
	}
	#itemQuant {
		max-width: 40px;
	}

	#addButton {
		margin-top: 15px;
	}
</style>
