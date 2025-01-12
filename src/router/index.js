/*
  Fichier pour configurer le routing de l'application en utilisant vue-router
 */

/*
createRouter => créer une instance de routeur
utilise l'API history pour gérer les routes
*/
import { createRouter, createWebHistory } from 'vue-router';
import UsersList from '@/components/UsersList.vue'; // importation du composant

// Déclaration des routes
const routes = [
    { path: '/users', name: 'Users', component: UsersList },
];

// Création de l'instance du routeur
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
