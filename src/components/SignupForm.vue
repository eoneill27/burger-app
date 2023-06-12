<script setup>
	import { ref, reactive } from 'vue';
	import { useInterfaceStore } from '@/stores/interface';
	import { useUsersStore } from '@/stores/users';
	import { v4 as uuidv4 } from 'uuid';

	import {collection, doc, addDoc, setDoc } from 'firebase/firestore';
	import { getAuth } from 'firebase/auth';

	import { useRouter, useRoute } from 'vue-router';
	const router = useRouter();
	const route = useRoute();

	const ui = useInterfaceStore();
	const users = useUsersStore();



	// function makeUser() {
	// 	getAuth()
	// 		.createUser({
	// 			email: userDoc.email,
	// 			displayName: userDoc.name
	// 		})
	// 		.then((userRecord) => {
	// 			console.log(userRecord.uid);
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// }


	
	const userDoc = reactive({
		email: "",
		name: "",
		password: "",
		passwordConf: "",
	});

	const docData = reactive({
		displayName: userDoc.name,
		email: userDoc.email,
		// uid: users.current.uid
	})
	

	function addUser() {
	
			addDoc(collection(users.db, 'users'), {
				displayName: userDoc.name,
				email: userDoc.email,
				uid: users.current.uid
			});
		// getAuth()
		// 	.getUser(users.current.uid)
		// 	.then((userRecord) => {
		// 		console.log(userRecord);

		// 	})
		// 	.catch((error) => {
		// 		console.log('Error fetching user data:', error);
		// 	});

		// addDoc(collection(users.db, 'users'), userRecord);
		// setDoc(doc(users.db, 'users', users.current.uid), userRecord);
	}
	// function addUser() {

	// 	setDoc(doc(users.db, "users", users.current.uid) {
	// 		displayName: userDoc.name,
	// 		email: userDoc.email,
	// 		uid: users.current.uid
	// 	});
		
		
	
			// addDoc(collection(users.db, 'users'), {
			// 	displayName: userDoc.name,
			// 	email: userDoc.email,
			// 	uid: uid
			// });
		
	// }

	function updateInfo() {
					getAuth()
  				.updateUser(users.authUser.uid, {
    				email: 'modifiedUser@example.com',
    				phoneNumber: '+11234567890',
   				emailVerified: true,
					password: 'newPassword',
					displayName: 'Jane Doe',
					photoURL: 'http://www.example.com/12345678/photo.png',
					disabled: true,
				})
  				.then((userRecord) => {
			    // See the UserRecord reference doc for the contents of userRecord.
			    console.log('Successfully updated user', userRecord.toJSON());
				})
				.catch((error) => {
    				console.log('Error updating user:', error);
				});
	}

	function createUserDoc() {
		setDoc(doc(users.db, "users", users.current.uid), {
			displayName: userDoc.name,
			email: userDoc.email,
			uid: users.current.uid
		});

		console.log("profile updated");
	}

	const user = reactive({
		displayName: "",
		email: ""
	});

	function passConfirm() {
		console.log(userDoc.password);
		console.log(userDoc.passwordConf);
		console.log(ui.pwValidation);

		if (userDoc.password !== userDoc.passwordConf) {
			console.log ('Your password does not match. Please double check.');

			ui.pwValidation = true;

		} else if (userDoc.password === userDoc.passwordConf) {

			console.log('Your passwords match');
			ui.pwValidation = false;
			users.signUp(userDoc.name, userDoc.email, userDoc.password);
			
			router.push('/account');
	}
	
	}

	function clear() {
		userDoc.email = '',
		userDoc.password = '',
		userDoc.passwordConf = ''

	}
	// on successful sign up, send user to main page with validation message? 

</script>

<template>

	<form @submit.prevent="passConfirm" id="signup-form" autocomplete="off">
		<div class="form-field">
			<label class="reading-voice" for="name">Your name</label>
			<input v-model="userDoc.name" class="reading-voice" id="name" type="text" required>
		</div>
		<div class="form-field">
			<label class="reading-voice" for="email">Email address</label>
			<input v-model="userDoc.email" class="reading-voice" id="email" type="email" required>
		</div>

	
<!-- 		<div class="form-field">
			<label class="reading-voice" for="signupFirst">First name</label>
			<input v-model="user.firstName" class="reading-voice" id="signupFirst" type="text" required>
		</div>
		<div class="form-field">
			<label class="reading-voice" for="signupLast">Last name</label>
			<input v-model="user.lastName" class="reading-voice" id="signupLast" type="text" required>
		</div>
		<div class="form-field">
			<label class="reading-voice" for="password">Birthday</label>
			<input v-model="user.birthday" class="reading-voice" id="signupBirth" type="date">
		</div> -->
		<div class="form-field">
			<label class="reading-voice" for="signupPass">Password</label>
			<input v-model="userDoc.password" class="reading-voice" id="signupPass" type="password" required>
		</div>
		<div class="form-field">
			<label class="reading-voice" for="signupLast">Confirm password</label>
			<input v-model="userDoc.passwordConf" class="reading-voice" id="signupPassConf" type="password" required>
		</div>
		<p v-if="ui.pwValidation" class="reading-voice">Your password does not match. Please double check.</p>

		<button class="std-button reading-voice">Sign up</button>
	</form>
</template>

<style>


	#signup-form {
		margin-left: auto;
		margin-right: auto;
		max-width: 400px;
	}

	#signup-form input {
		max-width: 350px;
	}

	.pwValidation {
		display: block;
	}
</style>