<template>
  <div class="user-container">
    <div class="header-actions">
      <h2>👥 รายชื่อผู้ใช้งาน ({{ users.length }})</h2>
      <button class="btn btn-primary" v-on:click="navigateTo('/user/create')">
        + สร้างผู้ใช้งานใหม่
      </button>
    </div>

    <div v-if="users.length > 0" class="table-wrapper">
      <table class="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>ชื่อ-นามสกุล</th>
            <th>Email</th>
            <th>สถานะ</th>
            <th class="text-center">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }} {{ user.lastname }}</td>
            <td>{{ user.email }}</td>
            <td>
              <span :class="'status-' + user.status">{{ user.status }}</span>
            </td>
            <td class="text-center">
              <button class="btn btn-sm btn-info" v-on:click="navigateTo('/user/' + user.id)">ดู</button>
              <button class="btn btn-sm btn-warning" v-on:click="navigateTo('/user/edit/' + user.id)">แก้ไข</button>
              <button class="btn btn-sm btn-danger" v-on:click="deleteUser(user)">ลบ</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="empty-state">
      <p>... ไม่มีข้อมูลผู้ใช้งาน ...</p>
    </div>
  </div>
</template>

<script>
import UsersService from '../../services/UsersService'

export default {
  data() {
    return { users: [] }
  },
  async created() {
    try {
      this.users = (await UsersService.index()).data
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route)
    },
    async deleteUser(user) {
      if (confirm(`คุณต้องการลบคุณ ${user.name} ใช่ไหม?`)) {
        try {
          await UsersService.delete(user.id)
          this.users = (await UsersService.index()).data // โหลดข้อมูลใหม่
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
}
</script>

<style scoped>
/* จัด Layout ทั่วไป */
.user-container {
  padding: 20px;
}
.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

/* ตาราง */
.table-wrapper {
  overflow-x: auto;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  border-radius: 8px;
}
.user-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}
.user-table th, .user-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}
.user-table th {
  background-color: #f8f9fa;
  font-weight: bold;
  color: #333;
}
.user-table tr:hover {
  background-color: #f1f1f1;
}

/* ปุ่มต่างๆ */
.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
  font-size: 14px;
}
.btn-sm { padding: 5px 10px; font-size: 12px; }
.btn-primary { background-color: #28a745; color: white; } /* สีเขียว */
.btn-info { background-color: #17a2b8; color: white; }    /* สีฟ้า */
.btn-warning { background-color: #ffc107; color: black; } /* สีเหลือง */
.btn-danger { background-color: #dc3545; color: white; }  /* สีแดง */

.text-center { text-align: center; }
</style>