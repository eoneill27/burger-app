<script setup>
	import { ref, reactive, computed, onMounted } from 'vue';
	import { RouterLink } from 'vue-router';
	import { useUsersStore } from '@/stores/users';
	import { useInterfaceStore } from '@/stores/interface';

	import { collection, doc, getDocs, setDoc, addDoc, updateDoc } from 'firebase/firestore';
	import { useFirestore, useDocument, useCollection, getCurrentUser } from 'vuefire';

	const db = useFirestore();

	const users = useUsersStore();
	const ui = useInterfaceStore();

	await getCurrentUser();
	const currentOrder = useCollection(collection(db, 'users', users.current.uid, 'carts', 'cart1', 'items' ));

	console.log(currentOrder);
	const currentOrderArray = currentOrder.value;

	const subtotal = computed(function () {

		const total = ref(0);
	
		currentOrderArray.forEach(function(item) {
			console.log(item.subtotal);
			total.value += item.subtotal;
		})

		return total.value;
	})

	const tax = Number(subtotal.value * .12);

	console.log(tax);

</script>

<template>
	<section class="checkout-header view-header">
		<div class="inner-column">
			<h1 class="heyyou-voice">Your order</h1>
		</div>
	</section>
	<section class="checkout-headings">
		<div class="inner-column">
			<h2 class="attention-voice">Item</h2>
			<div class="quant-sub-headings">
				<h2 class="attention-voice">Quantity</h2>
				<h2 class="attention-voice">Price</h2>
			</div>
		</div>
	</section>
	<section class="order-details">
		<div class="inner-column">
			<ul>
				<li v-for="item in currentOrder" class="reading-voice cart-item">
					<div class="name-customize">
						<span class="info-voice">{{item.name}}</span>
						<span>{{item.ingredients}}</span>
					</div>
					<div class="quant-subtotal">
						<span>{{item.quantity}}</span>
						<span>${{item.subtotal}}</span>
					</div>
				</li>
			</ul>
		</div>
	</section>
	<section class="tax-total">
		<div class="inner-column">
			<p class="reading-voice">Subtotal: ${{subtotal}}</p>
			<p class="reading-voice">Tax: ${{tax}}</p>
			<p class="reading-voice">Total: ${{subtotal + tax}}</p>
			<button class="std-button reading-voice" id="checkoutButton" type="button">Check out</button>
		</div>
	</section>

	<div class="checkout-modal">
		
	</div>

</template>

<style>
	.checkout-header {
		background-color: var(--main);
	}

	.checkout-headings .inner-column {
		display: flex;
		justify-content: space-between;

	}
	.quant-sub-headings {
		display: flex;
		gap: 20px;

	}
	.cart-item {
		display: flex;
		justify-content: space-between;

	}
	.name-customize {
		display: flex;
		flex-direction: column;
	}

	.quant-subtotal {
		display: flex;
		gap: 50px;
	}

	.tax-total .inner-column {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	#checkoutButton {
		margin-top: 20px;
	}

</style>