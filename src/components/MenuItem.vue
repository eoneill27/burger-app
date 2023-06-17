<script setup>
	import {ref, reactive, computed } from 'vue';
	import { useMenusStore } from '@/stores/menus';
	import { useUsersStore } from '@/stores/users';

	import { useRoute } from 'vue-router';
	import { collection, doc, addDoc } from 'firebase/firestore';
	import { useFirestore, useCollection } from 'vuefire';

	const menus = useMenusStore();
	const users = useUsersStore();

	const route = useRoute();
	console.log(route.params);

	const db = useFirestore();
	const menuCats = menus.menusCollection;

	defineProps(['item']);

	const ingredients = ref([]);

	const subMenuArray = useCollection(collection(db, 'food', route.params.slug, 'items'));
	console.log(subMenuArray);

	const detailsOpen = ref(false);
	const buttonSelect = ref('Select');

	function toggleDetails() {
		detailsOpen.value = !detailsOpen.value;
	}

	const detailsClass = computed(function () {
		if(detailsOpen.value) {
			buttonSelect.value = 'Close';
			return 'details-open';
		} else {
			buttonSelect.value = 'Select';
			return 'details-closed';
		}
	})

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
<template class="menuItem-grid">

	<button @click="toggleDetails" type="button" class="reading-voice">{{buttonSelect}}</button>

	<div :class="detailsClass" class="item-details">
		<fieldset >
			{{ingredients}}
			<legend class="reading-voice">Customize your order:</legend>
			<div v-for="(ingredient) in item.ingredients" >
				<label class="reading-voice">{{ingredient}}</label>
				<input type="checkbox" :value="ingredient" v-model="ingredients" class="reading-voice">
			</div>
		</fieldset>

		<div class="form-field" id="instructions">
			<label for="specialInstr" class="reading-voice">Special instructions:</label>
			<textarea  v-model="item.specialInstr" name="" id="specialInstr" cols="25" rows="10" class="reading-voice"></textarea>			
		</div>

		<p class="reading-voice">Price: ${{item.price}}</p>

		<div class="form-field" id="quantity">
			<label for="itemQuant" class="reading-voice">Quantity:</label>
			<input v-model="item.quant" id="itemQuant" type="number" >
		</div>

		<button @click="addToCart(item.name, ingredients, item.specialInstr, item.quant, item.price)" type="button" class="reading-voice" id="addButton">Add to cart
		</button>
	</div>

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