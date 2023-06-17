import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useInterfaceStore = defineStore('interface', function () {
	const mainMenuOpen = ref(false);
	const detailsOpen = ref(false);
	const buttonSelect = ref('Select');

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

	function toggleDetails() {
		detailsOpen.value = !detailsOpen.value;
	}

	const detailsClass = computed(function () {
		if(detailsOpen.value) {
			buttonSelect.value = 'Close';
			return 'details-open';
		} else {
			buttonSelect.value = 'Select';
			return 'details-closed';
		}
	})

	return { mainMenuOpen, toggleMenu, menuClass, detailsOpen, toggleDetails, detailsClass, pwValidation, buttonSelect };
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