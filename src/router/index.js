import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AccountView from '../views/AccountView.vue';
import CheckoutView from '../views/CheckoutView.vue';
import DealsView from '../views/DealsView.vue';
import LoginView from '../views/LoginView.vue';
import MenuView from '../views/MenuView.vue';
import RewardsView from '../views/RewardsView.vue';
import SignupView from '../views/SignupView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/account',
			name: 'account',
			component: AccountView,
		},
		{
			path: '/checkout',
			name: 'checkout',
			component: CheckoutView,
		},
		{
			path: '/deals',
			name: 'deals',
			component: DealsView,
		},
		{
			path: '/login',
			name: 'login',
			component: LoginView,
		},
		{
			path: '/menu',
			name: 'menu',
			component: MenuView,
		},
		{
			path: '/rewards',
			name: 'rewards',
			component: RewardsView
		},
		{
			path: '/signup',
			name: 'signup',
			component: SignupView,
		}
		// {
		// 	path: '/about',
		// 	name: 'about',
		// 	// route level code-splitting
		// 	// this generates a separate chunk (About.[hash].js) for this route
		// 	// which is lazy-loaded when the route is visited.
		// 	component: () => import('../views/AboutView.vue'),
		// },
		// {
		// 	path: '/monsters',
		// 	name: 'monsters',
		// 	component: MonstersView,
		// },
		// {
		// 	path: '/exercises',
		// 	name: 'exercises',
		// 	component: ExercisesView,
		// },
		// {
		// 	path: '/exercises/:id',
		// 	name: 'detail',
		// 	component: DetailView,
		// },
		// {
		// 	path: '/monsters/:slug',
		// 	name: 'monster detail',
		// 	component: MonsterDetailView,
		// },
	],
});

export default router;

// a param is denoted by a colon
// when a route is matched, the value of its params will be exposed as this.$route.params
// therefore, we can render the current user ID by updating User's template
