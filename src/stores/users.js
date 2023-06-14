import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import { useFirestore, useCollection, useCurrentUser, getCurrentUser, useFirebaseAuth, useDocument} from 'vuefire';
import { collection, doc, addDoc, setDoc, getDoc} from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
export const useUsersStore = defineStore('users', () => {
	
	const auth = getAuth();
	const authInstance = useFirebaseAuth();
	// the 2 things above are the same

	// const authUser = auth.currentUser;
	const current = useCurrentUser();
	// this returns a reactive variable - undefined value until user is loaded
	// const getCurrent = getCurrentUser();
	// this returns a promise of the current user

	const db = useFirestore();
	// db can be whatever you want. This is the whole instance of the Firestore.
	const userCollection = useCollection(collection(db, 'users'));
	// this is an array - can use v-for 'user in userCollection' :key='user.id'

	const router = useRouter();

	const uid = computed(() => current.value?.uid);

	const userDocPath = computed(function() {
		if(uid.value) {
			return doc(collection(db, 'users'), uid.value)
		} else {
			return '';
		}
	})

	const {
		data: docUser,
		pending,
		promise
	} = useDocument(userDocPath);

	const name = computed (() => docUser.value.displayName);

	async function createUserDoc(uid, form) {
		await setDoc(doc(db, "users", uid), {
			displayName: form.name,
			email: form.email,
			uid: uid
		})

		await getCurrentUser();

		// alert ('User doc created');
		router.push('/account');
	}

	async function signUp(form) {

		createUserWithEmailAndPassword(auth, form.email, form.password)
			.then((userCredential) => {
				// signed in
				const user = userCredential.user;
				const uid = user.uid;
				console.log(user);

				createUserDoc(uid, form);
				// setDoc(doc(db, "users", uid), {
				// 	displayName: form.name,
				// 	email: form.email,
				// 	uid: uid,
				// });

				
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

	return { 
		db, 
		auth, 
		authInstance, 
		current, 

		uid,
		name,
		docUser,

		signUp, 
		logIn, 
		updateUser, 
		logOut ,
	}

});


