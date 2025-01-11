import { createRouter, createWebHistory } from 'vue-router';
import UsersList from '@/components/UsersList.vue'; // Assurez-vous que le chemin est correct

const routes = [
    { path: '/users', name: 'Users', component: UsersList },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
