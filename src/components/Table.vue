<template>
  <div class="card">
    <div class="card-body">

      <table id="tbl-users" class="table table-hover">
        <thead>
        <tr>
          <th/>
          <th
            :class="[sortBy === 'name' ? sortDirection : '']"
            @click="sort('name')"
          >
            Nom
          </th>
          <th
            :class="[sortBy === 'email' ? sortDirection : '']"
            @click="sort('email')"
          >
            Email
          </th>
          <th
            :class="[sortBy === 'phone' ? sortDirection : '']"
            @click="sort('phone')"
          >
            Tel
          </th>
          <th
            :class="[sortBy === 'age' ? sortDirection : '']"
            @click="sort('age')"
          >
            Naissance
          </th>
          <th>Gender</th>
          <th>Supprimer</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in sortedUsers"
            :key="user.email"
            @click="$router.push({name: 'Details', params: {'id': user.id}})"
        >
          <td class="w-25">
            <img :src="user.avatar" class="img-fluid h-auto w-25 cover" :alt="user.name"/>
          </td>
          <td v-if="!user.name" v-html="user.nameFormated"/>
          <td v-else>{{ user.name }}</td>

          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.age }}</td>
          <td>{{ user.gender }}</td>
          <td>
            <button v-on:click.stop type="button" class="btn btn-danger" @click="deleteUser(user.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle"
                   viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          </td>
        </tr>
        </tbody>
      </table>

      <div v-if="users.length === 0" class="text-center">
        Chargement des données...
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      sortBy: "",
      sortDirection: "asc",
    };
  },
  props: [ "users" ],
  computed: {
    sortedUsers() {
      return [ ...this.users ]
        .sort((p1, p2) => {
          const modifier = this.sortDirection === "asc" ? 1 : -1;

          if (!this.sortBy) return 0;

          if (typeof p1[this.sortBy] === "number")
            return modifier * (p1[this.sortBy] - p2[this.sortBy]);

          return modifier * p1[this.sortBy].localeCompare(p2[this.sortBy]);
        })
    }
  },
  methods: {
    sort(sortBy) {
      if (sortBy === this.sortBy) {
        if (this.sortDirection === "desc") {
          this.sortBy = "";
          this.sortDirection = "asc";
          return;
        }

        if (this.sortDirection === "asc") {
          this.sortDirection = "desc";
          return;
        }
      }

      this.sortDirection = "asc";
      this.sortBy = sortBy;
    },

    async deleteUser(id) {
      try {
        await axios.delete(`https://ynov-front.herokuapp.com/api/users/${ id }`)
        axios.get("https://ynov-front.herokuapp.com/api/users").then(
          ({ data: { data } }) => {
            this.users = data.map((user) => ({
              id: user._id,
              age: new Date(Date.now() - new Date(user.birthDate).getTime()).getFullYear() - 1970,
              name: `${ user.firstName } ${ user.lastName.toUpperCase() }`,
              email: user.email,
              phone: user.phone,
              gender: user.gender,
              avatar: user.avatarUrl,
            }));

            this.loading = false
            this.filteredUser = this.nonFilteredUsers;

            this.$emit("fetch-user", this.nonFilteredUsers);
            this.$emit("input", this.loading);
          }
        );
      } catch (e) {
        console.error(e)
      }
    }
  },
};
</script>
