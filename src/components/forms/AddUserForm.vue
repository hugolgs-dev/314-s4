<template>
  <div class="add-user-form-wrapper">
    <button @click="showModal = true">Ajouter un utilisateur</button>
    <div v-if="showModal" class="modal">
      <div class="modal-container">
        <div class="modal-header">
          <h2 class="modal-title" >Ajouter un utilisateur</h2>
        </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <input v-model="newUser.firstName" type="text" placeholder="Prénom" required />
                <input v-model="newUser.lastName" type="text" placeholder="Nom" required />
                <button type="submit" class="btn btn-primary">Ajouter</button>
                <button @click="closeModal" type="button" class="btn btn-secondary">Fermer</button>
              </div>
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