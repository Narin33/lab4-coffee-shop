let express = require('express')
let bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// ส่วนที่ 1: ดูข้อมูล (GET)
// ดูเมนูกาแฟทั้งหมด
app.get('/coffees', function (req, res) {
    res.send('เรียกดูเมนูกาแฟทั้งหมด')
})

// ดูเมนูกาแฟรายแก้ว (ระบุ ID)
app.get('/coffee/:coffeeId', function (req, res) {
    res.send('ดูรายละเอียดกาแฟ ID: ' + req.params.coffeeId)
})

// ส่วนที่ 2: จัดการข้อมูล (POST, PUT, DELETE)
// เพิ่มเมนูกาแฟใหม่ (Create)
app.post('/coffee/', function (req, res) {
    res.send('สร้างเมนูกาแฟใหม่: ' + JSON.stringify(req.body))
})

// แก้ไขเมนูกาแฟ (Edit)
app.put('/coffee/:coffeeId', function (req, res) {
    res.send('แก้ไขกาแฟ ID: ' + req.params.coffeeId + ' ด้วยข้อมูล: ' + JSON.stringify(req.body))
})

// ลบเมนูกาแฟ (Delete)
app.delete('/coffee/:coffeeId', function (req, res) {
    res.send('ลบกาแฟ ID: ' + req.params.coffeeId + ' เรียบร้อยแล้ว')
})

let port = 8081
app.listen(port, function () {
    console.log('server running on ' + port)
})