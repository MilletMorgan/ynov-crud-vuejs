<template>
  <div class="container mt-5">
    <div v-if="!showEditForm" class="card shadow w-50 mx-auto">
      <div class="card-body p-5">
        <img :src="user.avatarUrl"
             alt="profil"
             class="img-fluid rounded mx-auto d-block mb-5 img-profile-size"
        >

        <hr>

        <div class="row">
          <div class="col-md-6 col-lg-6 col-sm-6">
            <h4>Nom</h4>
            <p>
              {{ user.firstName }}
            </p>
            <h4>email</h4>
            <p>
              {{ user.email }}
            </p>
            <h4>Age</h4>
            <p>
              {{ user.age }}
            </p>
          </div>
          <div class="col-md-6 col-lg-6 col-sm-6">
            <h4>Prenom</h4>
            <p>
              {{ user.lastName }}
            </p>
            <h4>Genre</h4>
            <p>
              {{ user.gender }}
            </p>
            <h4>Détails</h4>

            <p v-html="details"></p>

          </div>
        </div>

        <div class="text-center mt-5">
          <button @click="showEditForm = true" class="btn btn-primary">
            EDIT PROFILE
          </button>
        </div>
      </div>
    </div>

    <Form v-else :initial-values="user" @submit="updateUser" @cancel="closeEdition" :add-classes="'w-50 shadow card'"/>
  </div>
</template>
<script>
import axios from "axios";
import Form from "@/components/Form";

export default {
  name: 'Details',
  components: { Form },
  data() {
    return {
      user: {
        avatarUrl: "https://sumaleeboxinggym.com/wp-content/uploads/2018/06/Generic-Profile-1600x1600.png"
      },
      showEditForm: false
    }
  },
  computed: {
    details() {
      return this.user.details?.replace(new RegExp("\\n", "gi"),  '<br>' )
    }
  },
  methods: {
    async fetchUser() {
      const { data: user } = await axios(`https://ynov-front.herokuapp.com/api/users/${ this.$route.params.id }`)
      this.user = {
        ...user.data,
        age: new Date(Date.now() - new Date(user.data.birthDate).getTime()).getFullYear() - 1970
      }
    },

    async updateUser(userUpdated) {
      try {
        await axios.put(`https://ynov-front.herokuapp.com/api/users/${ this.$route.params.id }`, userUpdated)

        this.$emit("notification", {
          type: "success",
          message: "L'utilisateur a bien été modifié."
        })

        this.$router.push({ name: 'ListUsers' })
      } catch (e) {
        this.$emit("notification", {
          type: "danger",
          message: e.message
        })
      }
    },

    closeEdition() {
      this.showEditForm = false
    }
  },
  created() {
    this.fetchUser()
  }
}
</script>

<style>
.img-profile-size {
  height: 145px;
  margin-top: -75px
}
</style>
