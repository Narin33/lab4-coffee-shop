let express = require('express')
const app = express()

// สร้าง route สำหรับหน้า status
app.get('/status', function (req, res) {
    res.send('Hello nodejs server')
})

// กำหนด port เป็น 8081
let port = 8081
app.listen(port, function () {
    console.log('server running on ' + port)
})