module.exports = {
    // ดึงข้อมูลเครื่องดื่มทั้งหมด (GET /drinks)
    index (req, res) {
        // ใส่ code เดิมที่เคยอยู่ใน app.get('/drinks', ...) มาไว้ตรงนี้
        res.send('เรียกข้อมูลเครื่องดื่มทั้งหมด ' + JSON.stringify(req.body)); // ตัวอย่าง
    },

    // ดูข้อมูลเครื่องดื่มรายตัว (GET /drink/:id)
    show (req, res) {
        // ใส่ code เดิมจาก app.get('/drink/:id', ...)
        res.send('ดูข้อมูลเครื่องดื่ม id: ' + req.params.id); 
    },

    // สร้างเครื่องดื่มใหม่ (POST /drink)
    create (req, res) {
        // ใส่ code เดิมจาก app.post('/drink', ...)
        res.send('สร้างเครื่องดื่ม: ' + JSON.stringify(req.body));
    },

    // แก้ไขข้อมูลเครื่องดื่ม (PUT /drink/:id)
    update (req, res) {
        // ใส่ code เดิมจาก app.put('/drink/:id', ...)
        res.send('แก้ไขเครื่องดื่ม id: ' + req.params.id + ' ' + JSON.stringify(req.body));
    },

    // ลบเครื่องดื่ม (DELETE /drink/:id)
    delete (req, res) {
        // ใส่ code เดิมจาก app.delete('/drink/:id', ...)
        res.send('ลบเครื่องดื่ม id: ' + req.params.id);
    }
}