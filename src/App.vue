<!--
App.vue est le composant racine d'une application Vue
-->

<template>
    <router-view/> <!-- Inclusion du composant UsersList -->
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