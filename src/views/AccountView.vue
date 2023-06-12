<script async setup>
	import { ref, reactive, computed, onMounted } from 'vue';
	import LoginForm from '@/components/LoginForm.vue';
	import { RouterLink } from 'vue-router';
	import { useUsersStore } from '@/stores/users';
	import { getAuth, updateProfile } from 'firebase/auth';

	import { useDocument, useFirebaseAuth, useCurrentUser, useIsCurrentUserLoaded, getCurrentUser } from 'vuefire';
	import {collection, doc, addDoc, setDoc, getDoc } from 'firebase/firestore';

	const users = useUsersStore();

	const edit = ref(false);

	function toggleEdit() {
		edit.value = !edit.value;
	}

	const editClass = computed(function () {
		if (edit.value) {
			console.log('editing');
		} else {
			console.log('not-editing');
		}
	});

	// function createUserDoc() {
	// 	setDoc(doc(users.db, "users", users.current.uid), {
	// 		displayName: user.displayName,
	// 		email: users.current.email,
	// 		uid: users.current.uid
	// 	});

	// 	// toggleEdit();
	// 	console.log("profile updated");
	// }

	const user = reactive({
		displayName: "",
		email: ""
	});


	const userLoaded = useIsCurrentUserLoaded();
	const currentUser = await getCurrentUser();


	// onMounted(async() => {

		const {
			data: userDeets,
			pending,
			error,
			promise
		} = useDocument(doc(users.db, 'users', currentUser.uid));

		console.log(userDeets);	

	

// })





	// onMounted(async() => {
	// 	const currentUser = await getCurrentUser();
	// 	if (currentUser) {
	// 		const {
	// 			data: userDeets,
	// 			pending,
	// 			error,
	// 			promise
	// 		} = getDoc(doc(users.db, 'users', users.current.uid));

	// 	console.log(userDeets)
	// 	} return currentUser;
	// })
	// const {
	// 	data: userDeets,
	// 	pending,
	// 	error,
	// 	promise
	// } = useDocument(doc(users.db, 'users', authStuff.uid));

	// const docRef = doc(users.db, 'users', users.current.uid);

	// const docSnap = await getDoc(docRef);

	// if(docSnap.exists()) {
	// 	console.log("Document data:", docSnap.data());
	// } else {
	// 	console.log("No such document!");
	// }




// 	const userDoc = useDocument(docRef);
	


// const docData = docSnap.data();


	// const id = users.auth.currentUser.uid;
	// const docUser = (doc(users.db, 'users', id));

</script>

<template>

	<p v-if="users.current">
		
<!-- 		{{users.current.uid}}
		{{userDeets.displayName}}
		{{userDeets.email}} -->
	
	</p>
		

	<section class="account-header view-header">
		<div class="inner-column">
			<h1 class="heyyou-voice">Your account</h1>
		</div>
	</section>

<!-- this should only show up if the user is not already logged in -->
	<section class="login" v-if="!users.current">
		<div class="inner-column">
			<LoginForm/>
		</div>
	</section>

	<section class="logged-in-account" v-if="users.current">
		<div class="inner-column">

			<button @click="users.logOut" type="button" class="std-button reading-voice">Log out</button>


			<div class="user-info" >
				<ul>
					<li class="reading-voice" id="userName"><p v-if="!edit">Name: {{userDeets.displayName}} </p><button @click="toggleEdit()" type="button" v-if="!edit">Edit</button>
						<template v-if="edit">
							<input v-model="user.displayName" type='text'>
							<button @click="createUserDoc()">Update</button>
							<button type="button" @click="toggleEdit()">Cancel edit</button>
						</template>
					</li>
					<li class="reading-voice" id="userEmail">Email: {{users.current.email}} </li>
					<li class="reading-voice" id="userUID">UID: {{users.current.uid}} </li>
				</ul>
			</div>
		</div>
	</section>

<!-- if the user is logged in - show account details  -->

</template>


<style>
	.account-header {
		background-color: var(--tertiary);
	}

	.user-info {
		--space: 20px;

		background-color: var(--paper);
		display: grid;
		gap: var(--space);
		padding: var(--space);
		border: 3px solid var(--highlight);
		margin-top: var(--space);
		max-width: 500px;
		box-shadow: -7px 7px var(--highlight);
	}
</style>