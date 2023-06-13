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
	
	const form = reactive({
		email: "",
		name: "",
		password: "",
		passwordConf: "",
	});

	function passConfirm() {
		console.log(form.password);
		console.log(form.passwordConf);
		console.log(ui.pwValidation);

		if (form.password !== form.passwordConf) {
			console.log ('Your password does not match. Please double check.');

			ui.pwValidation = true;

		} else if (form.password === form.passwordConf) {

			console.log('Your passwords match');
			ui.pwValidation = false;
			users.signUp(form);
		}
	}

	function clear() {
		form.email = '',
		form.password = '',
		form.passwordConf = ''

	}
	// on successful sign up, send user to main page with validation message? 

</script>

<template>

	<form @submit.prevent="passConfirm" id="signup-form" autocomplete="off">
		<div class="form-field">
			<label class="reading-voice" for="name">Your name</label>
			<input v-model="form.name" class="reading-voice" id="name" type="text" required>
		</div>
		<div class="form-field">
			<label class="reading-voice" for="email">Email address</label>
			<input v-model="form.email" class="reading-voice" id="email" type="email" required>
		</div>
		<div class="form-field">
			<label class="reading-voice" for="signupPass">Password</label>
			<input v-model="form.password" class="reading-voice" id="signupPass" type="password" required>
		</div>
		<div class="form-field">
			<label class="reading-voice" for="signupLast">Confirm password</label>
			<input v-model="form.passwordConf" class="reading-voice" id="signupPassConf" type="password" required>
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