<template>
  <div class="edit-user-form-wrapper">
    <div v-if="showModal" class="modal">
      <div class="modal-container">
        <div class="modal-header">
          <h2 class="modal-title">Modifier un utilisateur</h2>
        </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <input v-model="user.firstName" type="text" placeholder="Prénom" required />
              <input v-model="user.lastName" type="text" placeholder="Nom" required />
              <button type="submit" class="btn btn-primary">Modifier</button>
              <button @click="closeModal" type="button" class="btn btn-secondary">Fermer</button>
            </form>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      user:{
        type:Object,
        required: true,
      },
      showModal:{
        type:Boolean,
        required:true,
      },
    },
    data(){
      return {
        user: {
          firstName: '',
          lastName: '',
        },
      };
    },
    methods:{
      submitForm(){
        this.$emit('edit-user', this.user);
        this.closeModal();
      },
      closeModal(){
        this.$emit('close');
      }
    }
  }
</script>

<style scoped>

</style>