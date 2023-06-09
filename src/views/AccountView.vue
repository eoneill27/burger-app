<script setup>
	
	import LoginForm from '@/components/LoginForm.vue';
	import { RouterLink } from 'vue-router';
	import { useUsersStore } from '@/stores/users';

	const users = useUsersStore();

	console.log(users.current);

</script>

<template>
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
			<p class="reading-voice">Welcome, {{users.current.email}}</p>
		</div>
	</section>

<!-- if the user is logged in - show account details  -->


</template>


<style>
	.account-header {
		background-color: var(--tertiary);
	}
</style>