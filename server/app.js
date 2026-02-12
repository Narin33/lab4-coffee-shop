let express = require('express')
let bodyParser = require('body-parser')
let cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

// ============================================
// 1. DATA (Mock Data)
// ============================================
let users = [
    { id: 1, email: 'admin@test.com', password: '123', name: 'Admin', lastname: 'System', status: 'active', type: 'admin' } 
]

let coffees = [
    { id: 1, name: 'Americano', price: 45, type: 'hot', description: 'เข้มข้น หอมกรุ่น' },
    { id: 2, name: 'Latte', price: 55, type: 'iced', description: 'นุ่มละมุน ผสมนมสด' }
]

// ============================================
// 2. AUTHENTICATION
// ============================================
app.post('/register', function (req, res) {
    const { email, password, name, lastname } = req.body
    const existing = users.find(u => u.email === email)
    if (existing) return res.status(400).send({ error: 'Email นี้ถูกใช้งานแล้ว' })

    let lastId = users.length > 0 ? users[users.length - 1].id : 0
    let newUser = { id: lastId + 1, email, password, name, lastname, status: 'active', type: 'user' }
    users.push(newUser)
    res.send(newUser)
})

app.post('/login', function (req, res) {
    const { email, password } = req.body
    const user = users.find(u => u.email === email && u.password === password)
    if (!user) return res.status(403).send({ error: 'Email หรือ Password ไม่ถูกต้อง' })
    res.send({ user: user, token: 'mock-token-1234567890' })
})

// ============================================
// 3. USERS MANAGEMENT
// ============================================
app.get('/users', function (req, res) { res.send(users) })

app.get('/user/:userId', function (req, res) {
    let id = parseInt(req.params.userId)
    let user = users.find(u => u.id === id)
    res.send(user)
})

app.post('/user', function (req, res) {
    let lastId = users.length > 0 ? users[users.length - 1].id : 0
    let newUser = { id: lastId + 1, ...req.body }
    users.push(newUser)
    res.send(newUser)
})

app.put('/user/:userId', function (req, res) {
    let id = parseInt(req.params.userId)
    let index = users.findIndex(u => u.id === id)
    if (index !== -1) {
        users[index] = { ...users[index], ...req.body }
        res.send(users[index])
    } else {
        res.status(404).send({ error: 'Not found' })
    }
})

// *** แก้ไขส่วน DELETE ให้ใช้ splice ***
app.delete('/user/:userId', function (req, res) {
    let id = parseInt(req.params.userId)
    let index = users.findIndex(u => u.id === id)
    if (index !== -1) {
        users.splice(index, 1) // ลบออกจาก Array
        res.send({ status: 'ok' })
    } else {
        res.status(404).send({ error: 'User not found' })
    }
})

// ============================================
// 4. COFFEES MANAGEMENT
// ============================================
app.get('/coffees', function (req, res) { res.send(coffees) })

app.get('/coffee/:coffeeId', function (req, res) {
    let id = parseInt(req.params.coffeeId)
    let coffee = coffees.find(c => c.id === id)
    res.send(coffee)
})

app.post('/coffee', function (req, res) {
    let lastId = coffees.length > 0 ? coffees[coffees.length - 1].id : 0
    let newCoffee = { id: lastId + 1, ...req.body }
    coffees.push(newCoffee)
    res.send(newCoffee)
})

app.put('/coffee/:coffeeId', function (req, res) {
    let id = parseInt(req.params.coffeeId)
    let index = coffees.findIndex(c => c.id === id)
    if (index !== -1) {
        coffees[index] = { ...coffees[index], ...req.body }
        res.send(coffees[index])
    } else {
        res.status(404).send({ error: 'Not found' })
    }
})

// *** แก้ไขส่วน DELETE ให้ใช้ splice ***
app.delete('/coffee/:coffeeId', function (req, res) {
    let id = parseInt(req.params.coffeeId)
    let index = coffees.findIndex(c => c.id === id)
    if (index !== -1) {
        coffees.splice(index, 1) // ลบออกจาก Array
        res.send({ status: 'ok' })
    } else {
        res.status(404).send({ error: 'Coffee not found' })
    }
})

// ============================================
// Start Server
// ============================================
let port = 8081
app.listen(port, function () {
    console.log('Server running on port ' + port + ' (No Database Mode)')
})