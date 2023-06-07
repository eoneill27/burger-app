<script setup>
	import { ref, reactive } from 'vue';

	const loginEmail = ref('');
	const loginPassword = ref('');

	const user = reactive(
		{
			userId: loginEmail,
			userPassword: loginPassword
		}
	)

	const userArray = reactive([
		{
			userId: 'oneill.emily@gmail.com',
			userPassword: 'goldfish'
		},
		{
			userId: 'ann.broadberry@gmail.com',
			userPassword: 'dungbeetle'
		}
	])

	function test() {
		const loginInfo = {
			userId: user.userId,
			userPassword: user.userPassword
		}

		console.log(loginInfo);

		for (let i = 0; i < userArray.length; i++) {
			if ((loginInfo.userId === userArray[i].userId) && (loginInfo.userPassword === userArray[i].userPassword)) {
				console.log(userArray[i].userId, userArray[i].userPassword);

			} 
		}

		user.userId = '';
		user.userPassword = '';
	}

</script>

<template>
	<form @submit.prevent="test" id="login-form">
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