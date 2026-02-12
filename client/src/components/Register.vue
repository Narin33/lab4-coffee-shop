<template>
  <div class="register-wrapper">
    <div class="register-box">
      <h1>📝 สมัครสมาชิก</h1>
      
      <form @submit.prevent="register">
        
        <div class="form-group">
          <label>ชื่อ (Name)</label>
          <input type="text" v-model="name" class="form-control" placeholder="กรอกชื่อจริง" required />
        </div>

        <div class="form-group">
          <label>นามสกุล (Lastname)</label>
          <input type="text" v-model="lastname" class="form-control" placeholder="กรอกนามสกุล" required />
        </div>

        <div class="form-group">
          <label>อีเมล (Email)</label>
          <input type="email" v-model="email" class="form-control" placeholder="example@email.com" required />
        </div>

        <div class="form-group">
          <label>รหัสผ่าน (Password)</label>
          <input type="password" v-model="password" class="form-control" placeholder="กำหนดรหัสผ่าน" required />
        </div>

        <div class="button-group">
          <button type="submit" class="btn btn-primary">ยืนยันการสมัคร</button>
          <button type="button" class="btn btn-secondary" @click="$router.push('/login')">กลับไปหน้า Login</button>
        </div>

      </form>
      
      <div v-if="error" class="alert-error">
        ⚠️ {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import AuthenService from '../services/AuthenService'

export default {
  data() {
    return {
      name: '',      // เพิ่มตัวแปรชื่อ
      lastname: '',  // เพิ่มตัวแปรนามสกุล
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register() {
      try {
        // ส่งข้อมูลทั้ง 4 ตัวไปที่ Server
        await AuthenService.register({
          name: this.name,
          lastname: this.lastname,
          email: this.email,
          password: this.password
        })
        
        // สมัครเสร็จ ให้เด้งไปหน้า Login ทันที
        alert('สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ')
        this.$router.push('/login')
        
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
/* จัดหน้าจอให้อยู่กึ่งกลาง และมีพื้นหลังสีอ่อน */
.register-wrapper {
  display: flex;
  justify-content: center;
  align-items: center; /* จัดกึ่งกลางแนวตั้ง */
  min-height: 80vh;    /* ความสูงขั้นต่ำ */
  background-color: #f4f6f9;
}

/* กล่องสีขาว */
.register-box {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 450px; /* ความกว้างสูงสุด */
}

h1 {
  text-align: center;
  margin-bottom: 25px;
  color: #333;
}

/* จัดฟอร์ม */
.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box; /* สำคัญ: ป้องกัน input ล้นกล่อง */
}

/* ปุ่มกด */
.button-group {
  display: flex;
  gap: 10px; /* ระยะห่างระหว่างปุ่ม */
  margin-top: 25px;
}

.btn {
  flex: 1; /* ให้ปุ่มขยายเต็มพื้นที่เท่ากัน */
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;
}

.btn-primary {
  background-color: #28a745; /* สีเขียว */
  color: white;
}
.btn-primary:hover { background-color: #218838; }

.btn-secondary {
  background-color: #6c757d; /* สีเทา */
  color: white;
}
.btn-secondary:hover { background-color: #5a6268; }

/* กล่องแจ้งเตือน Error */
.alert-error {
  margin-top: 20px;
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}
</style>