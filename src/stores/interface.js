import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useInterfaceStore = defineStore('interface', function () {
	const mainMenuOpen = ref(false);

	const pwValidation = ref(false);

	function toggleMenu() {
		mainMenuOpen.value = !mainMenuOpen.value;
	}

	const menuClass = computed(function () {
		if (mainMenuOpen.value) {
			return 'menu-open';
		} else {
			return 'menu-closed';
		}
	});

	return { mainMenuOpen, toggleMenu, menuClass, pwValidation };
});

// import { reactive } from 'vue';
// import { defineStore } from 'pinia';

// export const useMonstersStore = defineStore('monsters', () => {
// 	const list = reactive([]);

// 	function add(monster) {
// 		list.push(monster);
// 	}

// 	function clear() {
// 		localStorage.clear();
// 	}

// 	return { list, add, clear };
// });