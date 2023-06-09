import { reactive } from 'vue';
import { defineStore } from 'pinia';

import { useCurrentUser } from 'vuefire';
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth';



export const useUsersStore = defineStore('users', () => {
	
	const auth = getAuth();
	const current = useCurrentUser();

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

	function logOut() {
		signOut(auth)
			.then(() => {
				//sign out successful
			})
			.catch ((error) => {
				console.log(error);
			});
	}

	return { auth, current, signUp, logOut };


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
