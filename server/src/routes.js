const DrinkController = require('./controllers/DrinkController') // ดึง Controller มาใช้ [cite: 106]

module.exports = (app) => {
    // กำหนดเส้นทาง URL ให้ตรงกับ Controller [cite: 109]
    app.get('/drinks', DrinkController.index)
    app.get('/drink/:id', DrinkController.show)
    app.post('/drink', DrinkController.create)
    app.put('/drink/:id', DrinkController.update)
    app.delete('/drink/:id', DrinkController.delete)
}