import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';

export const useMenusStore = defineStore('menus', function () {

	const list = reactive([
		{
			slug: 'burgers',
			name: 'Burgers',
		},
		{
			slug: 'hotdogs',
			name: 'Hot dogs',
		},
		{
			slug: 'sides',
			name: 'Sides',
		},
		{
			slug: 'shakes',
			name: 'Shakes',
		},
		{
			slug: 'drinks',
			name: 'Drinks'
		}
	]);

	return { list };
});
