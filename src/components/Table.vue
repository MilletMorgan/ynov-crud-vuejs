<template>
  <div class="card">
    <div class="card-body">
      <table v-if="!loading" id="tbl-users" class="table table-hover">
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
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in sortedUsers"
            :key="user.email"
            @click="$router.push({name: 'Details', params: {'id': user.id}})"
        >
          <td>
            <img :src="user.avatar" class="img-fluid" :alt="user.name"/>
          </td>
          <td v-if="!user.name" v-html="user.nameFormated"/>
          <td v-else>{{ user.name }}</td>

          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.age }}</td>
          <td>{{ user.gender }}</td>
        </tr>
        </tbody>
      </table>
      <div v-else>
        Chargement des données...
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sortBy: "",
      sortDirection: "asc",
    };
  },
  props: [ "users", "loading" ],
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
  },
};
</script>
