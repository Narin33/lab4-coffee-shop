const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// ตั้งค่าให้ Server รองรับ JSON และ URL Encoded
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// --- จุดสำคัญของการปรับปรุง ---
// เรียกใช้ไฟล์ routes.js และส่งตัวแปร app เข้าไป
// เพื่อให้ routes ไปจัดการเส้นทางต่าง ๆ ต่อ
require('./routes')(app) 

// (Optional) Route พื้นฐานสำหรับเช็คสถานะ Server (ถ้ามี)
app.get('/status', function (req, res) {
    res.send('Hello nodejs server')
})

// ตั้งค่า Port และเริ่มรัน Server
let port = 8081
app.listen(port, function () {
    console.log('server running on ' + port)
})