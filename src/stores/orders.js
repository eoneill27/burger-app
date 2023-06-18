import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';


import { collection, doc, getDocs, setDoc, addDoc, updateDoc } from 'firebase/firestore';
import { useFirestore, useCollection, useCurrentUser, getCurrentUser } from 'vuefire';

export const useOrdersStore = defineStore('orders', () => {

	const db = useFirestore();
	const current = useCurrentUser();


	async function addToCart(name, ingredients, specialInstr, quantity, price) {
		
		// await getCurrentUser();

		const subtotal = Number(price * quantity);
		await getCurrentUser();
		if (specialInstr) {
			specialInstr == specialInstr;
		} else {
			specialInstr = '';
		}

		await addDoc(collection(db, "users", current.uid, "carts", "cart1", "items"), {
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



	return { addToCart }
});