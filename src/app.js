let express = require('express')
const app = express()

// 1. Route สำหรับดูสถานะ Server
app.get('/status', function (req, res) {
    res.send('Hello nodejs server')
})

// 2. Route สำหรับดูข้อมูล User ตาม ID (GET)
// เช่น http://localhost:8081/user/123
app.get('/user/:userId', function (req, res) {
    res.send('ดูข้อมูลผู้ใช้งาน: ' + req.params.userId)
})

// 3. Route สำหรับดูข้อมูล Users ทั้งหมด (GET)
// เช่น http://localhost:8081/users
app.get('/users', function (req, res) {
    res.send('เรียกข้อมูล ผู้ใช้งานทั้งหมด')
})

// สั่งให้ Server รันที่ Port 8081
let port = 8081
app.listen(port, function () {
    console.log('server running on ' + port)
})