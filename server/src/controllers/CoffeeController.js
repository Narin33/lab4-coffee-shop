const { Coffee } = require('../models')

module.exports = {

    // ============================================
    // 1. ดึงข้อมูลทั้งหมด (Get All)
    // ============================================
    async index (req, res) {
        try {
            const coffees = await Coffee.findAll()
            res.send(coffees)
        } catch (err) {
            res.status(500).send({
                error: 'เกิดข้อผิดพลาดในการดึงข้อมูล'
            })
        }
    },

    // ============================================
    // 2. สร้างเมนูใหม่ (Create) + รองรับ image
    // ============================================
    async post (req, res) {
        try {
            const coffeeData = {
                name: req.body.name,
                price: req.body.price,
                type: req.body.type,
                description: req.body.description,
                image: req.body.image || 'null'
            }

            const coffee = await Coffee.create(coffeeData)
            res.send(coffee)

        } catch (err) {
            res.status(500).send({
                error: 'สร้างข้อมูลไม่สำเร็จ'
            })
        }
    },

    // ============================================
    // 3. แก้ไขข้อมูล (Edit) + รองรับ image
    // ============================================
    async put (req, res) {
        try {
            const coffee = await Coffee.findByPk(req.params.coffeeId)

            if (!coffee) {
                return res.status(404).send({
                    error: 'ไม่พบข้อมูล'
                })
            }

            const updateData = {
                name: req.body.name,
                price: req.body.price,
                type: req.body.type,
                description: req.body.description
            }

            // ถ้ามีการส่ง image มา → อัปเดต
            if (req.body.image) {
                updateData.image = req.body.image
            }

            await coffee.update(updateData)

            res.send(coffee)

        } catch (err) {
            res.status(500).send({
                error: 'แก้ไขข้อมูลไม่สำเร็จ'
            })
        }
    },

    // ============================================
    // 4. ลบข้อมูล (Delete)
    // ============================================
    async delete (req, res) {
        try {
            const coffee = await Coffee.findByPk(req.params.coffeeId)

            if (!coffee) {
                return res.status(404).send({
                    error: 'ไม่พบข้อมูลที่ต้องการลบ'
                })
            }

            await coffee.destroy()
            res.send(coffee)

        } catch (err) {
            res.status(500).send({
                error: 'ลบข้อมูลไม่สำเร็จ'
            })
        }
    },

    // ============================================
    // 5. ดูข้อมูลรายตัว (Show)
    // ============================================
    async show (req, res) {
        try {
            const coffee = await Coffee.findByPk(req.params.coffeeId)

            if (!coffee) {
                return res.status(404).send({
                    error: 'ไม่พบข้อมูล'
                })
            }

            res.send(coffee)

        } catch (err) {
            res.status(500).send({
                error: 'ไม่พบข้อมูล'
            })
        }
    }
}