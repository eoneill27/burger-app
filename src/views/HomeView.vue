<script setup>

	import AllMenusGrid from '@/components/AllMenusGrid.vue';
	

</script>

<template>
	<section class="home-header view-header">
		<div class="inner-column">
			<h1 class="heyyou-voice">Burgers are our business</h1>
		</div>
	</section>

	<section class="home-menu">
		<div class="inner-column">
			<h2 class="attention-voice">Menu</h2>
			<AllMenusGrid class="menu-component" />
		</div>
	</section>

</template>

<style scoped>
	.home-header {
		background-color: var(--highlight);
		padding-top: 250px;
	}

	.home-menu {
		margin-top: 50px;
	}

	.home-menu h2 {
		text-transform: uppercase;
		letter-spacing: 0.1rem;
	}

	.menu-component {
		margin-top: 30px;
	}
</style>