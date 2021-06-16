<template>
  <div class="home">
    <h1>Test pour david</h1>
    {{ data }}
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Home',
  data() {
    return {
      data: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        const result = await axios.get('/api/test')
        this.data = result.data
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
