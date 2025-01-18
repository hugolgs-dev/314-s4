<template>
  <div class="user-details">
    <div v-if="showModal" class="modal">
      <div class="modal-container">
        <div class="modal-header">
          <h2 class="modal-title">Détails de l'utilisateur</h2>
        </div>
          <div class="modal-body">
            <p>Prénom: {{ user.firstName }}</p>
            <p>Nom: {{ user.lastName }}</p>
            <button @click="closeModal" class="btn btn-primary">Fermer</button>
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
        required:true,
      },
      showModal:{
        type:Boolean,
        required:true
      },
    },
    methods:{
      closeModal(){
        this.$emit('close');
      },
    },
  };
</script>


<style scoped>

</style>