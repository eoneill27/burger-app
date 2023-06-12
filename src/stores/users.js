import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { useFirestore, useCollection, useCurrentUser, useFirebaseAuth, useDocument} from 'vuefire';
import { collection, doc, addDoc, setDoc, getDoc} from 'firebase/firestore';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';

export const useUsersStore = defineStore('users', () => {
	

	const auth = getAuth();
	const authInstance = useFirebaseAuth();
	// the 2 things above are the same

	// 
	// const authUser = auth.currentUser;
	const current = useCurrentUser();
	const db = useFirestore();
	const userCollection = useCollection(collection(db, 'users'));
	// this is an array - can use v-for 'user in userCollection' :key='user.id'

	// const userRef = doc(db, 'users', auth.uid);
	// const userDoc = useDocument(userRef);

	function signUp(name, email, password) {

		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// signed in
				const user = userCredential.user;
				const uid = user.uid;
				console.log(user);
				setDoc(doc(db, "users", uid), {
					displayName: name,
					email: email,
					uid: uid,
				});

			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log (errorCode, errorMessage);
			})
	}

	function logIn(email, password) {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				//signed in
				const user = userCredential.user;
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				if (error.code === 'auth/user-not-found') {
					alert("We can't find your account. Have you signed up yet?")
				}
			});

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

	function updateUser(name) {
		updateProfile(auth.currentUser, {
		  displayName: name
		}).then(() => {
		  // Profile updated!
		  // ...
		}).catch((error) => {
		  // An error occurred
		  // ...
			console.log(error.message);
		});
	}

	return { db, auth, authInstance, current, signUp, logIn, updateUser, logOut };


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
