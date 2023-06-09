import { reactive } from 'vue';
import { defineStore } from 'pinia';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';



export const useUsersStore = defineStore('users', () => {
	
	const auth = getAuth();

	function signUp(email, password) {

		createUserWithEmailAndPassword(auth, email, password)
			. then((userCredential) => {
				// signed in
				const user = userCredential.user;
				console.log(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log (errorCode, errorMessage);
			})
	}

	return { auth, signUp};


	// const list = reactive([]);

	// function add(user) {
	// 	list.push(user);
	// }

	// function clear(user) {
	// 	user = '';
	// }

	// return { list, add, clear };
});

// function initialize() {
// 	if(data.getItem('game')) {
// 		// local storage is set up - great
// 	} else {
// 		data.setItem('game', JSON.stringify({score: 0}));
// 	}
// }
