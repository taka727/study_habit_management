import { createRouter, createWebHistory } from 'vue-router';
import Home from '../../components/TaskManager.vue';
import History from '../../components/History.vue';
import Milestone from '../../components/Milestone.vue';
import Reading from '../../components/Reading.vue';
import Settings from '../../components/Settings.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/history', name: 'History', component: History },
  { path: '/milestone', name: 'Milestone', component: Milestone },
  { path: '/reading', name: 'Reading', component: Reading },
  { path: '/settings', name: 'Settings', component: Settings }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;