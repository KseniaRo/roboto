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


// User.beforeUpdate(async (user)=>{
//   // console.log('this is user.mentorIs',user.mentorId)
//   // const usersMentor =await User.findbyPK(user.mentorId)
//   const usersMentor =await user.getMentor()
//   if (usersMentor){
//     if(usersMentor.isStudent){
//       throw new Error('Mentors must be teachers')
//     }
//     if(user.isTeacher){
//       throw new Error('Mentees must be students')
//     }
//   }
//   const usersMentees =await user.getMentees()
//   if(usersMentees.length>0)
// {
//   if(user.isStudent){
//     throw new Error('Mentors must be teachers')
//   }
// }

// })

module.exports = Robot

