const Sequelize = require('sequelize')
const db = require('./database')

const Robot = db.define('robot', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  fuelType: {
    type: Sequelize.ENUM('gas', 'diesel', 'electric'),
    defaultValue: 'electric'
  },
  fuelLevel: {
    type: Sequelize.DECIMAL,
    validate: {
      min: 0,
      max: 100
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5ax52b-6rxPrMzTNqjMFAwldYF47Rw234_g&usqp=CAU'
  }

})

module.exports = Robot

