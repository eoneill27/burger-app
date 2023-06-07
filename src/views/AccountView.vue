<script setup>
	
	import LoginForm from '@/components/LoginForm.vue';
	import { RouterLink } from 'vue-router';
</script>

<template>
	<section class="account-header view-header">
		<div class="inner-column">
			<h1 class="heyyou-voice">Your account</h1>
		</div>
	</section>

<!-- this should only show up if the user is not already logged in -->
	<section class="login">
		<div class="inner-column">
			<LoginForm/>
		</div>
	</section>

<!-- if the user is logged in - show account details  -->


</template>


<style>
	.account-header {
		background-color: var(--tertiary);
	}
</style>