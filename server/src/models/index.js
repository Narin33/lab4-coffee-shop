const Sequelize = require('sequelize')

const sequelize = new Sequelize('coffee_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.Coffee = require('./Coffee')(sequelize, Sequelize)
// db.User = require('./User')(sequelize, Sequelize) // ถ้ามี User เปิดบรรทัดนี้

module.exports = db