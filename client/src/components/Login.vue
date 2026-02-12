<template>
  <div class="login-wrapper">
    <div class="login-box">
      <h1>🔐 เข้าสู่ระบบ</h1>
      <form @submit.prevent="login">
        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="email" class="form-control" placeholder="example@gmail.com" required />
        </div>
        
        <div class="form-group">
          <label>Password</label>
          <input type="password" v-model="password" class="form-control" placeholder="กรอกรหัสผ่าน" required />
        </div>

        <button type="submit" class="btn-login">เข้าสู่ระบบ</button>
      </form>

      <div class="register-link">
        ยังไม่มีบัญชี? <span @click="$router.push('/register')">สมัครสมาชิกที่นี่</span>
      </div>

      <div v-if="error" class="alert-error">
        ⚠️ {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import AuthenService from '../services/AuthenService'
import { useAuthenStore } from '../stores/authen'

export default {
  setup() {
    const authenStore = useAuthenStore()
    return { authenStore }
  },
  data() {
    return { email: '', password: '', error: null }
  },
  methods: {
    async login() {
      try {
        const response = await AuthenService.login({
          email: this.email,
          password: this.password
        })
        this.authenStore.setToken(response.data.token)
        this.authenStore.setUser(response.data.user)
        this.$router.push('/users') // ล็อกอินเสร็จไปหน้า Users
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
.login-box {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}
.form-group {
  margin-bottom: 20px;
  text-align: left;
}
.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
  box-sizing: border-box; /* สำคัญ: ไม่ให้ input ล้นกล่อง */
}
.btn-login {
  width: 100%;
  padding: 12px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
.btn-login:hover { background-color: #555; }
.register-link {
  margin-top: 15px;
  font-size: 14px;
}
.register-link span {
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
}
.alert-error {
  margin-top: 20px;
  color: red;
  background: #ffe6e6;
  padding: 10px;
  border-radius: 5px;
}
</style>