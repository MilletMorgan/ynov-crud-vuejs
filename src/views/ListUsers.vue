<template>
  <div class="container-fluid">
    <Header v-on:fetch-user="fetchUsers" @mask="showMaskMethod"/>

    <Table :users="users"/>
  </div>
</template>

<script>
import Header from "../components/Header";
import Table from "../components/Table";

export default {
  data() {
    return {
      users: [],
    };
  },
  components: { Header, Table },
  methods: {
    fetchUsers(users) {
      this.users = users;
    },

    showMaskMethod(mask) {
      this.$emit('mask', mask)
    }
  },
};
</script>
