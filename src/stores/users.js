import { reactive } from 'vue';
import { defineStore } from 'pinia';

export const useUsersStore = defineStore('users', () => {
	const list = reactive([]);

	function add(user) {
		list.push(user);
	}

	function clear(user) {
		user = '';
	}

	return { list, add, clear };
});

// function initialize() {
// 	if(data.getItem('game')) {
// 		// local storage is set up - great
// 	} else {
// 		data.setItem('game', JSON.stringify({score: 0}));
// 	}
// }
