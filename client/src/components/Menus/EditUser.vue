<template>
  <div>
    <h1>Edit User</h1>
    <h2>User ID: {{ userId }}</h2>
    <form @submit.prevent="editUser">
      <p>name: <input type="text" v-model="user.name"></p>
      <p>lastname: <input type="text" v-model="user.lastname"></p>
      <p>email: <input type="text" v-model="user.email"></p>
      <p>password: <input type="text" v-model="user.password"></p>
      <p><button type="submit">Edit User</button></p>
    </form>
    <hr>
    <div>
      <p>name: {{ user.name }}</p>
      <p>lastname: {{ user.lastname }}</p>
      <p>email: {{ user.email }}</p>
      <p>password: {{ user.password }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userId: null,
      user: {
        name: '',
        lastname: '',
        email: '',
        password: '',
        status: 'active'
      }
    }
  },
  created () {
    this.userId = this.$route.params.userId
    // จำลองการดึงข้อมูลเก่ามาใส่ (Simulate Fetch Data)
    this.user.name = "User " + this.userId
    this.user.lastname = "Test System"
    this.user.email = "user" + this.userId + "@example.com"
    this.user.password = "123456"
  },
  methods: {
    editUser () {
      console.log(this.user)
      alert("แก้ไขข้อมูล User ID: " + this.userId + " เรียบร้อย")
      this.$router.push('/users')
    }
  }
}
</script>
<style scoped>
</style>