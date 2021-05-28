<template>
  <form class="card shadow w-50 mx-auto" @submit.prevent="saveForm">
    <div class="card-body p-5">
      <img :src="user.avatarUrl" alt="profile" class="img-fluid rounded mx-auto d-block mb-5"
           style="margin-top: -100px">

      <hr>

      <div class="row">
        <div class="col-md-12 col-lg-6 col-sm-12">
          <label class="mt-2">Nom</label>
          <input class="form-control" type="text" v-model="user.lastName">
          <label class="mt-2">email</label>
          <input class="form-control" type="email" v-model="user.email">
          <label class="mt-2">Age</label>
          <input class="form-control" type="date" v-model="user.birthDate">
        </div>
        <div class="col-md-12 col-lg-6 col-sm-12">
          <label class="mt-2">Prenom</label>
          <input class="form-control" type="text" v-model="user.firstName">
          <label class="mt-2">Genre</label>
          <input class="form-control" type="text" v-model="user.gender">
          <label class="mt-2">Détails</label>
          <textarea class="form-control"  v-model="user.details"/>
        </div>
      </div>

      <div class="text-center mt-5">
        <button type="submit" class="btn btn-primary ">
          SAVE
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'EditForm',
  props: [ "initialValues" ],
  data() {
    return {
      user: this.initialValues
    }
  },
  methods: {
    saveForm() {
      this.$emit("submit", this.user)
    }
  }
}
</script>
