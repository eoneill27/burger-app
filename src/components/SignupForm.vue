<script setup>
	import {ref, reactive} from 'vue';

	import { useInterfaceStore } from '@/stores/interface';
	import { useUsersStore } from '@/stores/users';

	import { v4 as uuidv4 } from 'uuid';

	const ui = useInterfaceStore();
	const users = useUsersStore();

	const user = reactive({
		email: "",
		firstName: "",
		lastName: "",
		birthday: "",
		password: "",
		passwordConf: "",
	});


	// const passwordValidation = ref('');


	// const noMessage = ref("Your password does not match. Please double check.");
	// let message = ref();

	function passConfirm() {
		console.log(user.password);
		console.log(user.passwordConf);
		console.log(ui.pwValidation);

		if (user.password !== user.passwordConf) {
			console.log ('Your password does not match. Please double check.');

			ui.pwValidation = true;

		} else if (user.password === user.passwordConf) {
			console.log('Your passwords match');
			ui.pwValidation = false;
			signUp();
		}
	}

	function signUp() {
		const userArray = ref([]);
		const userInfo = {
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			birthday: user.birthday,
			password: user.password,
			id: uuidv4()
		}

		users.add(userInfo);
		console.log(users.list);
		localStorage.setItem(userInfo.id, JSON.stringify(userInfo));
		clear();
	}

	function clear() {
		user.email = '',
		user.firstName = '',
		user.lastName = '',
		user.birthday = '',
		user.password = '',
		user.passwordConf = ''

	}
	// on successful sign up, send user to main page with validation message? 

</script>

<template>
	<form @submit.prevent="passConfirm" id="signup-form" autocomplete="off">
		<div class="form-field">
			<label class="reading-voice" for="email">Email address</label>
			<input v-model="user.email" class="reading-voice" id="signupEmail" type="email" required>
		</div>
		<div class="form-field">
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
		</div>
		<div class="form-field">
			<label class="reading-voice" for="signupPass">Password</label>
			<input v-model="user.password" class="reading-voice" id="signupPass" type="password" required>
		</div>
		<div class="form-field">
			<label class="reading-voice" for="signupLast">Confirm password</label>
			<input v-model="user.passwordConf" class="reading-voice" id="signupPassConf" type="password" required>
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