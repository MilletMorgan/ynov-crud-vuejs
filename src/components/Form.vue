<template>
  <form class="mx-auto" @submit.prevent="saveForm" :class="addClasses">
    <div class="card-body p-5">
      <img :src="user.avatarUrl"
           alt="profile"
           class="img-fluid rounded mx-auto d-block mb-5 img-profile-size"
      >

      <hr>

      <div class="row">
        <div class="col-md-12 col-lg-6 col-sm-12">
          <label class="mt-2">Nom</label>
          <input class="form-control" type="text" v-model="user.lastName">
          <label class="mt-2">email</label>
          <input class="form-control" type="email" v-model="user.email">
          <label class="mt-2">Age</label>
          <input class="form-control" type="date" v-model="user.birthDate">
          <label class="mt-2">Phone</label>
          <input class="form-control" type="text" v-model="user.phone">
        </div>
        <div class="col-md-12 col-lg-6 col-sm-12">
          <label class="mt-2">Prenom</label>
          <input class="form-control" type="tel" v-model="user.firstName">
          <label class="mt-2">Genre</label>
          <input class="form-control" type="text" v-model="user.gender">
          <label class="mt-2">Détails</label>
          <textarea class="form-control"  v-model="user.details"/>

          <label class="mt-2">Image url</label>
          <input class="form-control" type="text" v-model="user.avatarUrl">
        </div>
      </div>

      <div class="text-center mt-5">
        <button type="submit" class="btn btn-primary mr-2">
          SAVE
        </button>

        <button type="button" class="btn btn-danger" @click="closeForm">
          CANCEL
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Form',
  props: [ "initialValues" , "addClasses"],
  data() {
    return {
      user: this.initialValues,
    }
  },
  methods: {
    saveForm() {
      this.$emit("submit", this.user)
    },

    closeForm() {
      this.$emit("cancel")
    }
  }
}
</script>

<style>
.img-profile-size {
  height: 145px;
  margin-top: -75px
}
</style>
