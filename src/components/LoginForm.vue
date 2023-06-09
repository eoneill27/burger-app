<script setup>
	import { ref, reactive } from 'vue';
	import { useUsersStore } from '@/stores/users';

	const users = useUsersStore();

	const loginEmail = ref('');
	const loginPassword = ref('');


</script>

<template>
	<form @submit.prevent="users.logIn(loginEmail, loginPassword)" id="login-form">
		<div class="form-field">
			<label class="reading-voice" for="email">Email address</label>
			<input v-model="loginEmail" class="reading-voice" id="loginEmail" type="email">
		</div>
		<div class="form-field">
			<label class="reading-voice" for="password">Password</label>
			<input v-model="loginPassword" class="reading-voice" id="loginPassword" type="password">
		</div>

		<button class="std-button reading-voice">Log in</button>

		<p class="reading-voice">Need an account? <RouterLink to="/signup" class="signup-link">Sign up here.</RouterLink></p>
	</form>
</template>

<style>
	#login-form {
		margin-left: auto;
		margin-right: auto;
		max-width: 400px;
	}

	#login-form input {
		max-width: 350px;
	}

	button + P {
		margin-top: 20px;
	}

	.signup-link {
		font-weight: 700;
	}

	.signup-link:hover {
		color: var(--tertiary);
	}
</style>