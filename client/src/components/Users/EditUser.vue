<template>
  <div class="form-container">
    <h1>✏️ แก้ไขข้อมูลผู้ใช้</h1>
    
    <form @submit.prevent="editUser" class="styled-form">
      <div class="form-group">
        <label>ชื่อ (Name)</label>
        <input type="text" v-model="user.name" class="form-control" />
      </div>

      <div class="form-group">
        <label>นามสกุล (Lastname)</label>
        <input type="text" v-model="user.lastname" class="form-control" />
      </div>

      <div class="form-group">
        <label>Email</label>
        <input type="text" v-model="user.email" class="form-control" disabled style="background:#eee;" />
        <small>อีเมลไม่สามารถแก้ไขได้</small>
      </div>

      <div class="button-group">
        <button type="submit" class="btn btn-save">บันทึกข้อมูล</button>
        <button type="button" class="btn btn-cancel" @click="$router.back()">ยกเลิก</button>
      </div>
    </form>
  </div>
</template>

<script>
import UsersService from '../../services/UsersService'

export default {
  data() {
    return {
      user: { name: '', lastname: '', email: '', password: '', status: 'active' }
    }
  },
  async created() {
    try {
      let userId = this.$route.params.id
      this.user = (await UsersService.show(userId)).data
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
  async editUser() {
    try {
      // ส่งข้อมูล user ทั้งก้อน (ที่มี id อยู่ข้างใน) ไปให้ Service
      await UsersService.put(this.user)
      
      // บันทึกเสร็จแล้วให้กลับไปหน้า Users
      this.$router.push('/users')
    } catch (err) {
      console.log(err)
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
    }
  }
}
}
</script>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}
.styled-form {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}
.form-group {
  margin-bottom: 15px;
}
.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}
.button-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  flex: 1;
}
.btn-save { background-color: #28a745; color: white; }
.btn-cancel { background-color: #6c757d; color: white; }
</style>