const CoffeeController = require('./controllers/CoffeeController')
const coffeeUpload = require('./middleware/coffeeUpload')

module.exports = (app) => {

    // ============================================
    // COFFEE ROUTES
    // ============================================

    // ดูทั้งหมด
    app.get('/coffees', CoffeeController.index)

    // ดูรายตัว
    app.get('/coffee/:coffeeId', CoffeeController.show)

    // สร้างใหม่
    app.post('/coffee', CoffeeController.post)

    // แก้ไข
    app.put('/coffee/:coffeeId', CoffeeController.put)

    // ลบ
    app.delete('/coffee/:coffeeId', CoffeeController.delete)

    // ============================================
    // COFFEE IMAGE UPLOAD ROUTE
    // ============================================
    app.post('/coffee-upload', coffeeUpload, (req, res) => {
        if (!req.file) {
            return res.status(400).send({
                error: 'ไม่พบไฟล์ที่อัปโหลด'
            })
        }

        res.send({
            filename: req.file.filename
        })
    })
}