let express = require('express')
let bodyParser = require('body-parser')
const app = express()

// 1. ส่วนที่เพิ่ม: ตั้งค่าให้ Server อ่านข้อมูล JSON ได้
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Route เดิม
app.get('/status', function (req, res) {
    res.send('Hello nodejs server')
})

app.get('/user/:userId', function (req, res) {
    res.send('ดูข้อมูลผู้ใช้งาน: ' + req.params.userId)
})

app.get('/users', function (req, res) {
    res.send('เรียกข้อมูลผู้ใช้งานทั้งหมด')
})

// 2. ส่วนที่เพิ่ม: เส้นทางสำหรับ สร้าง/แก้ไข/ลบ
// สร้างผู้ใช้ (POST)
app.post('/user/', function (req, res) {
    res.send('ทำการสร้างผู้ใช้งาน: ' + JSON.stringify(req.body))
})

// แก้ไขผู้ใช้ (PUT)
app.put('/user/:userId', function (req, res) {
    res.send('ทำการแก้ไขผู้ใช้งาน: ' + req.params.userId + ' ' + JSON.stringify(req.body))
})

// ลบผู้ใช้ (DELETE)
app.delete('/user/:userId', function (req, res) {
    res.send('ทำการลบผู้ใช้งาน: ' + req.params.userId + ' ' + JSON.stringify(req.body))
})

let port = 8081
app.listen(port, function () {
    console.log('server running on ' + port)
})