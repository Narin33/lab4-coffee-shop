let express = require('express')
let bodyParser = require('body-parser')
let cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

// 1. สร้างตัวแปรเก็บข้อมูลไว้ (จำลอง Database)
let coffees = [
    { id: 1, name: 'Americano', price: 45, type: 'hot', description: 'เข้มข้น หอมกรุ่น' },
    { id: 2, name: 'Latte', price: 55, type: 'iced', description: 'นุ่มละมุน ผสมนมสด' }
]

// 2. GET: ดูเมนูทั้งหมด (ส่งตัวแปร coffees กลับไป)
app.get('/coffees', function (req, res) {
    res.send(coffees)
})

// 3. GET: ดูรายเมนู
app.get('/coffee/:coffeeId', function (req, res) {
    let id = parseInt(req.params.coffeeId)
    let coffee = coffees.find(c => c.id === id)
    res.send(coffee)
})

// 4. POST: เพิ่มเมนูใหม่ (ดันข้อมูลใส่ตัวแปร coffees)
app.post('/coffee', function (req, res) {
    let newCoffee = req.body
    // สร้าง ID ใหม่ (เอา ID ตัวสุดท้าย + 1)
    let lastId = coffees.length > 0 ? coffees[coffees.length-1].id : 0
    newCoffee.id = lastId + 1
    
    coffees.push(newCoffee) // บันทึกลงตัวแปร
    res.send(newCoffee)
})

// 5. PUT: แก้ไขเมนู (หาตำแหน่งแล้วแก้ข้อมูล)
app.put('/coffee/:coffeeId', function (req, res) {
    let id = parseInt(req.params.coffeeId)
    let index = coffees.findIndex(c => c.id === id)
    
    // อัปเดตข้อมูลที่ตำแหน่งนั้น
    coffees[index] = { ...coffees[index], ...req.body }
    res.send(coffees[index])
})

// 6. DELETE: ลบเมนู (กรองเอาตัวที่ ID ตรงกันออก)
app.delete('/coffee/:coffeeId', function (req, res) {
    let id = parseInt(req.params.coffeeId)
    coffees = coffees.filter(c => c.id !== id) // ลบออกจากตัวแปร
    res.send({ status: 'ok' })
})

let port = 8081
app.listen(port, function () {
    console.log('server running on ' + port)
})