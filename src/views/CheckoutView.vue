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

</script>

<template>
	<section class="checkout-header view-header">
		<div class="inner-column">
			<h1 class="heyyou-voice">Your order</h1>
		</div>
	</section>
	<section>
		<ul>
			<li v-for="item in currentOrder" class="reading-voice">
				<span>{{item.name}}</span>
				<span>{{item.ingredients}}</span>
				<span>{{item.quantity}}</span>
				<span>${{item.subtotal}}</span>
			</li>
		</ul>
	</section>
</template>

<style>
	.checkout-header {
		background-color: var(--main);
	}
</style>