import Api from './Api'

export default {
  index (search) {
    return Api().get('users')
  },
  show (userId) {
    return Api().get('user/' + userId)
  },
  post (user) {
    return Api().post('user', user)
  },
  put (user) {
    return Api().put('user/' + user.id, user)
  },
  // *** จุดที่แก้ไข *** // เปลี่ยนชื่อตัวแปรเป็น userId เพื่อให้รับค่า user.id ที่ส่งมาจากหน้าเว็บได้ถูกต้อง
  delete (userId) {
    return Api().delete('user/' + userId)
  }
}