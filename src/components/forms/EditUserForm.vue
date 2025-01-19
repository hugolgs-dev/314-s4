<template>
  <div class="modal-wrapper">
    <div v-if="showModal" class="modal">
      <div class="modal-container">
        <div class="modal-header">
          <h2 class="modal-title">Modifier un utilisateur</h2>
          <span @click="closeModal" type="button" class="modal-close">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>
          </span>
        </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm" class="form-users form-edit" >
              <label for="firstName">Prénom</label>
              <input v-model="user.firstName" type="text" name="firstName" placeholder="Prénom" required />
              <label for="lastName">Nom</label>
              <input v-model="user.lastName" type="text" name="lastName" placeholder="Nom" required />
              <button type="submit">Modifier</button>
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