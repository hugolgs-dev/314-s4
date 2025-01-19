<template>
  <div class="modal-wrapper">
    <button @click="showModal = true" class="add-user-btn" >Ajouter un utilisateur</button>
    <div v-if="showModal" class="modal">
      <div class="modal-container">
        <div class="modal-header">
          <h2 class="modal-title" >Ajouter un utilisateur</h2>
          <span @click="closeModal" type="button" class="modal-close">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>
          </span>
        </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm" class="form-users form-add">
              <label for="firstName">Prénom</label>
              <input v-model="newUser.firstName" type="text" name="firstName" placeholder="Prénom" required />
              <label for="lastName">Nom</label>
              <input v-model="newUser.lastName" type="text" name="lastName" placeholder="Nom" required />
              <button type="submit">Ajouter</button>
            </form>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        showModal: false,
        newUser:{
          firstName:'',
          lastName:'',
        },
      };
    },
    methods:{
      submitForm(){
        this.$emit('add-user', this.newUser);
        this.newUser.firstName = '';
        this.newUser.lastName = '';
        this.showModal = false;
      },
      closeModal(){
        this.showModal = false;
      }
    }
  }
</script>

<style scoped>

</style>