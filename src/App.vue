<template>
  <div id="app" class="">
    <nav class="navbar navbar-expand-lg navbar-light bg-dark text-light">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link text-light" :to="{name: 'ListUsers'}">
                Liste des utilisateurs
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>


    <div v-if="notification" :class="`bg-${notification.type}`"
         class="shadow text-uppercase alert w-25 mx-auto text-white text-center">
      {{ notification.message }}
    </div>

    <div class="mask" v-if="showMask"/>

    <router-view @notification="showNotification" @mask="showMaskMethod"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      notification: null,
      showMask: false,
    }
  },
  methods: {
    showNotification(notification) {
      this.notification = notification
    },

    showMaskMethod(mask) {
      console.log("mask", mask)
      this.showMask = mask
    }
  }
}
</script>

<style>
.mask {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.7); /* Black w/ opacity */
}
</style>
