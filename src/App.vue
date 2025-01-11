<template>
  <div id="app">
    <h1>CRUD</h1>
    <UsersList/>
  </div>
</template>

<script>
/* Composants enfants */
import UsersList from "./components/UsersList.vue";

export default {
  name:'App',
  components: {
    UsersList
  }
};
</script>

<style>
/* */
</style>