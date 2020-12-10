const Sequelize = require('sequelize')
const db = require('./database')

const Project = db.define('project', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  deadline: {
    type: Sequelize.DATEONLY,
  },
  priority: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 10
    }
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  description: {
    type: Sequelize.TEXT
  }

})

Project.beforeCreate((project) => {
  if (project.title === '') {
    throw console.error('Should have a title!');
  }

})

module.exports = Project
