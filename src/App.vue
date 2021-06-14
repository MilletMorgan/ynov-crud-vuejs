<template>
  <div id="app">
    <router-link :to="{name: 'ListUsers'}">
      Liste des utilisateurs
    </router-link>

    <div v-if="notification" :class="`bg-${notification.type}`" class="shadow text-uppercase alert w-25 mx-auto text-white text-center">
      {{ notification.message }}
    </div>

    <router-view @notification="showNotification"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      notification: null
    }
  },
  methods: {
    showNotification(notification) {
      this.notification = notification
    }
  }
}
</script>
