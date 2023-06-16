import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';


import { collection, doc, getDocs, setDoc, addDoc, updateDoc } from 'firebase/firestore';
import { useFirestore, useCollection, useCurrentUser } from 'vuefire';




export const useMenusStore = defineStore('menus', function () {

	const db = useFirestore();
	const current = useCurrentUser();

	const menusCollection = useCollection(collection(db, 'food'));





	return { db, menusCollection };
});
