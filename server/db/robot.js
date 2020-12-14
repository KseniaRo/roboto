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
    },
    defaultValue: 100
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5ax52b-6rxPrMzTNqjMFAwldYF47Rw234_g&usqp=CAU'
  }

})

Robot.beforeCreate((robot) => {
  if (robot.name === '') {
    throw console.error('Robot should have a name!');
  }

})


module.exports = Robot

