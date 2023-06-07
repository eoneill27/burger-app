<script setup>
	import {ref, reactive} from 'vue';
	import SignupForm from '@/components/SignupForm.vue';

</script>

<template>
	<section class="signup-header view-header">
		<div class="inner-column">
			<h1 class="heyyou-voice">Sign up</h1>
		</div>
	</section>

	<section class="signup">
		<div class="inner-column">
			<SignupForm />
		</div>
	</section>
</template>

<style>
	.signup-header {
		background-color: var(--tertiary);
	}
</style>