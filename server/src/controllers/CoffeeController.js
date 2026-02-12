const { Coffee } = require('../models')

module.exports = {
    // 1. ดึงข้อมูลทั้งหมด (Get All)
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

    // 2. สร้างเมนูใหม่ (Create)
    async post (req, res) {
        try {
            const coffee = await Coffee.create(req.body)
            res.send(coffee)
        } catch (err) {
            res.status(500).send({
                error: 'สร้างข้อมูลไม่สำเร็จ'
            })
        }
    },

    // 3. แก้ไขข้อมูล (Edit)
    async put (req, res) {
        try {
            await Coffee.update(req.body, {
                where: {
                    id: req.params.coffeeId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'แก้ไขข้อมูลไม่สำเร็จ'
            })
        }
    },

    // 4. ลบข้อมูล (Delete)
    async delete (req, res) {
        try {
            const coffee = await Coffee.findByPk(req.params.coffeeId)
            if(!coffee) {
                return res.status(403).send({
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

    // 5. ดูข้อมูลรายตัว (Show)
    async show (req, res) {
        try {
            const coffee = await Coffee.findByPk(req.params.coffeeId)
            res.send(coffee)
        } catch (err) {
            res.status(500).send({
                error: 'ไม่พบข้อมูล'
            })
        }
    }
}