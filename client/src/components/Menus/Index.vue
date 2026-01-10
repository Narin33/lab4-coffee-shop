<template>
  <div>
    <h1>Get All Menus</h1>
    <button @click="navigateTo('/menu/create')">สร้างเมนูใหม่ (Click)</button>
  </div>
</template>

<script>
export default {
  methods: {
    navigateTo(route) {
      this.$router.push(route)
    }
  }
}
</script>
<style scoped>
</style>