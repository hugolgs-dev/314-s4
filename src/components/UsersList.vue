<!--
Composant vue.js pour la liste des utilisateurs
-->

<!-- Contenu HTML généré dynamiquement -->
<template>
  <div>
    <h1>Liste d'utilisateurs</h1>

    <!-- Message de chargement -->
    <div v-if="loading">
      <h2>Chargement des utilisateurs...</h2>
    </div>

    <!-- Message d'erreur -->
    <div v-else-if="error" class="error-message">
      Erreur lors du chargement des utilisateurs.
    </div>

    <!-- Liste des utilisateurs -->
    <ul v-else class="card-container">
      <li v-for="user in users" :key="user.id" class="card-item">
        <div class="card-img"></div>
        <div class="card-name">
          <span>{{ user.firstName }}</span>
          <span>{{ user.lastName }}</span>
        </div>
        <button @click="showUserDetails(user.id)" class="card-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-square" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
          </svg>
        </button>
        <button @click="editUser(user)" class="card-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
          </svg>
        </button>
        <button @click="deleteUser(user.id)" class="card-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
          </svg>
        </button>
      </li>
    </ul>

    <!-- Ajouter un utilisateur -->
    <div class="add-user-btn">
      <AddUserForm @add-user="createUser" />
    </div>


    <!-- Modifier utilisateur -->
    <EditUserForm
        v-if="editingUser"
        :user="editingUser"
        :show-modal="!!editingUser"
        @edit-user="updateUser"
        @close="editingUser = null"
    />

    <!-- Afficher détails d'un utilisateur -->
    <UserDetails
        v-if="showDetails"
        :user="selectedUser"
        :show-modal="showDetails"
        @close="closeUserDetails"
    />

  </div>
</template>

<!-- Logique de l'application -->
<script>
// Importation du module contenant les méthodes HTTP
import api from '../api.js';
import AddUserForm from "@/components/forms/AddUserForm.vue";
import EditUserForm from "@/components/forms/EditUserForm.vue";
import UserDetails from "@/components/infos/UserDetails.vue";

export default {
  components: { AddUserForm, EditUserForm, UserDetails },
  /* Définition des données */
  data() {
    return {
      users: [], // Initialisation liste des utilisateurs
      loading: false, // Indicateur du chargement
      error: false, // Indicateur d'erreur
      newUser: { // Pour ajouter un nouvel utilisateur
        firstName: '',
        lastName: '',
      },
      editingUser: null, // Pour modifier un utilisateur
      showDetails: false,
      selectedUser: null,

    };
  },
  /*
  * Méthode du cycle de vie ("lifecycle hook")
  * ==> exécute le composant lorsqu'il est monté dans le DOM
  * https://www.w3schools.com/vue/ref_lh_mounted.php
  */
  mounted() {
    this.getUsers(); // Appel de la méthode getUsers() pour récupérer les utilisateurs
  },

  /* Définition des méthodes */
  methods: {
    /* Méthode pour récupérer la liste des utilisateurs */
    async getUsers() {
      this.loading = true;
      this.error = false;
      try {
        const response = await api.getUsers();
        this.users = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },

    /* Méthode pour obtenir les infos d'un utilisateur */
    async showUserDetails(id) {
      try {
        const response = await api.getOneUser(id); // Fetch user details by ID
        this.selectedUser = response.data; // Assign response to selectedUser
        this.showDetails = true;
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur:', error);
      }
    },

    closeUserDetails() {
      this.showDetails = false;
      this.selectedUser = null;
    },

    /* Méthode pour ajouter un nouvel utilisateur */
    async createUser(user) {
      try {
        const response = await api.createUser(user);
        this.users.push(response.data);
      } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
      }
    },

    /* Méthode pour modifier un utilisateur */
    async updateUser() {
      try {
        const response = await api.updateUser(this.editingUser.id, this.editingUser);
        const index = this.users.findIndex(user => user.id === this.editingUser.id);
        this.users.splice(index, 1, response.data);
        this.editingUser = {};
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      }
    },

    /* Méthode pour supprimer un utilisateur */
    async deleteUser(id) {
      try {
        await api.deleteUser(id);
        this.users = this.users.filter(user => user.id !== id);
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      }
    },

    /* Méthode pour afficher les informations d'un utilisateur*/


    /* Méthode pour instancier l'édition d'un utilisateur */
    editUser(user) {
      this.editingUser = { ...user };
    },
  }
};
</script>

<style scoped>
.error-message {
  color: red;
  font-weight: bold;
  text-align: center;
}

form input {
  margin: 5px;
}
</style>
