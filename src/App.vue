<!--
App.vue est le composant racine d'une application Vue
-->

<template>
  <div id="app"> <!-- Conteneur principal de l'application -->
    <h1>CRUD</h1>
    <UsersList/> <!-- Inclusion du composant UsersList -->
  </div>
</template>

<script>
/* Importation des composants enfants */
import UsersList from "./components/UsersList.vue";

export default {
  name:'App', // Nom du composant
  // Composants enfants
  components: {
    UsersList
  }
};
</script>

<style>
/* */
</style>