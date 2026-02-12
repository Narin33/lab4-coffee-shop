const CoffeeController = require('./controllers/CoffeeController')

module.exports = (app) => {
    // เส้นทางสำหรับ Coffee
    // ดูทั้งหมด
    app.get('/coffees', CoffeeController.index)
    
    // สร้างใหม่
    app.post('/coffee', CoffeeController.post)
    
    // แก้ไข
    app.put('/coffee/:coffeeId', CoffeeController.put)
    
    // ลบ
    app.delete('/coffee/:coffeeId', CoffeeController.delete)
    
    // ดูรายตัว
    app.get('/coffee/:coffeeId', CoffeeController.show)
}