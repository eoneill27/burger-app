import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';


import { collection, doc, getDocs, setDoc, addDoc, updateDoc } from 'firebase/firestore';
import { useFirestore, useCollection, useCurrentUser } from 'vuefire';

export const useOrdersStore = defineStore('orders', () => {

	const db = useFirestore();
	const current = useCurrentUser();

	// const currentOrder = useCollection(collection(db, 'users', current.uid, 'carts', 'cart1', 'items' ));

	// const order = currentOrder.value;



	return {  }
});