module.exports = (sequelize, DataTypes) => {
    const Coffee = sequelize.define('Coffee', {
        name: DataTypes.STRING,
        price: DataTypes.INTEGER,
        type: DataTypes.STRING,
        status: DataTypes.STRING, // ✅ เพิ่มฟิลด์ Status ตามโจทย์
        description: DataTypes.TEXT
    })
    return Coffee
}