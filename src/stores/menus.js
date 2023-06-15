import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';


import { collection, doc, getDocs } from 'firebase/firestore';
import { useFirestore, useCollection } from 'vuefire';

export const useMenusStore = defineStore('menus', function () {

	const db = useFirestore();

	const menusCollection = useCollection(collection(db, 'food'));

	return { db, menusCollection };
});
