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
    <ul v-else>
      <li v-for="user in users" :key="user.id">
        {{ user.firstName }} - {{ user.lastName }}
        <button @click="showUserDetails(user.id)">Afficher</button>
        <button @click="editUser(user)">Modifier</button>
        <button @click="deleteUser(user.id)">Supprimer</button>
      </li>
    </ul>

    <!-- Ajouter un utilisateur -->
    <h2>Ajouter un utilisateur</h2>
    <form @submit.prevent="createUser">
      <div class="form-group">
        <input v-model="newUser.firstName" type="text" placeholder="Prénom" required />
        <input v-model="newUser.lastName" type="text" placeholder="Nom" required />
        <button type="submit" class="btn btn-primary">Ajouter</button>
      </div>
    </form>

    <!-- Modifier utilisateur -->
    <div v-if="editingUser">
      <h2>Modifier l'utilisateur</h2>
      <form @submit.prevent="updateUser">
        <div class="form-group">
          <input v-model="editingUser.firstName" placeholder="Prénom" type="text" required />
          <input v-model="editingUser.lastName" placeholder="Nom" type="text" required />
          <button type="submit" class="btn btn-primary">Modifier</button>
        </div>
      </form>
    </div>

    <!-- Modal des détails d'un utilisateur -->
    <div v-if="userDetails">
      <h2>Détails de l'utilisateur</h2>
      <p>Prénom: {{ userDetails.firstName }}</p>
      <p>Nom: {{ userDetails.lastName }}</p>
      <button @click="closeUserDetails" class="btn btn-primary">Fermer</button>
    </div>

  </div>
</template>

<!-- Logique de l'application -->
<script>
// Importation du module contenant les méthodes HTTP
import api from '../api.js';

export default {
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
      editingUser: {}, // Pour modifier un utilisateur
      userDetails: {}, // Pour afficher les détails d'un utilisateur
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
    async getOneUser(id) {
      try {
        const response = await api.getOneUser(id);
        this.userDetails = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur:', error);
      }
    },

    /* Méthode pour ajouter un nouvel utilisateur */
    async createUser() {
      try {
        const response = await api.createUser(this.newUser);
        this.users.push(response.data);
        this.newUser.firstName = '';
        this.newUser.lastName = '';
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
    showUserDetails(id) {
      this.getOneUser(id);
    },

    /* Méthode pour fermer le modal */
    closeUserDetails() {
      this.userDetails = {};
    },

    /* Méthode pour instancier l'édition d'un utilisateur */
    editUser(user) {
      this.editingUser = { ...user };
    }
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
