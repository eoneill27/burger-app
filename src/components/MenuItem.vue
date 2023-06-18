<script setup>
	import {ref, reactive, computed } from 'vue';
	import { useMenusStore } from '@/stores/menus';
	import { useUsersStore } from '@/stores/users';
	import { useOrdersStore } from '@/stores/orders';

	import { useRoute } from 'vue-router';
	import { collection, doc, addDoc } from 'firebase/firestore';
	import { useFirestore, useCollection, getCurrentUser } from 'vuefire';

	defineProps(['item']);

	const menus = useMenusStore();
	const users = useUsersStore();
	const orders = useOrdersStore();

	const route = useRoute();
	console.log(route.params);

	const db = useFirestore();
	const menuCats = menus.menusCollection;

	// await getCurrentUser();

	const ingredients = ref([]);

	const subMenuArray = useCollection(collection(db, 'food', route.params.slug, 'items'));
	console.log(subMenuArray);

	const detailsOpen = ref(false);
	const buttonSelect = ref('Select');

	function toggleDetails() {
		clearOrder(specialInstr, quantity);
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

	function clearOrder(specialInstr, quantity) {
		specialInstr = '';
		quantity = 0;
	
	}

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

		// clearOrder(specialInstr, quantity);
		// await clearOrder(specialInstr, quantity);
		toggleDetails();
		
	}


</script>
<template class="menuItem-grid">

	<button @click="toggleDetails" type="button" class="reading-voice">Select</button>
	<!-- <div class="details-modal"> -->
	<div :class="detailsClass" class="item-details">
		<div class="modal-content">
		<form id="customizeForm">
			<button @click="toggleDetails">Close</button>
			<fieldset >
			<!-- {{ingredients}} -->
				<legend class="info-voice">Customize your order:</legend>
				<div v-for="(ingredient) in item.ingredients" >
					<label class="reading-voice">{{ingredient}}</label>
					<input type="checkbox" :value="ingredient" v-model="ingredients" class="reading-voice">
				</div>
			</fieldset>

			<div class="form-field" id="instructions">
				<label for="specialInstr" class="info-voice">Special instructions:</label>
				<textarea  v-model="item.specialInstr" name="" id="specialInstr" cols="25" rows="10" class="reading-voice"></textarea>			
			</div>

			<p class="info-voice">Price: ${{item.price}}</p>

			<div class="form-field" id="quantity">
				<label for="itemQuant" class="info-voice">Quantity:</label>
				<input v-model="item.quant" id="itemQuant" type="number" min='1' class="reading-voice">
			</div>

			<button @click="addToCart(item.name, ingredients, item.specialInstr, item.quant, item.price)"  class="reading-voice" id="addButton" type="button">Add to cart
			</button>
		</form>

	</div>
	</div>
	<!-- </div> -->

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
		position: fixed;
		z-index: 1;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: rgb(0,0,0);
		background-color: rgba(0,0,0,0.4);
	}

	.modal-content {
	  background-color: #fefefe;
	  margin: 15% auto; 
	  padding: 20px;
	  border: 1px solid #888;
	  width: 60%; /* Could be more or less, depending on screen size */
	}

	.menuItem-card .details-open {

	}

	#instructions {
		margin-bottom: 15px;
	}

	#quantity {
		display: flex;
		padding: 10px 0;
	}
	#itemQuant {
		max-width: 80px;
	}

	#addButton {
		margin-top: 15px;
	}
</style>