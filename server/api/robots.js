const router = require('express').Router()
const { Robot, Project } = require('../db')
// GET /api/robots
router.get('/', async (req, res, next) => {
  try {
    const robots = await Robot.findAll()
    res.send(robots)
  }
  catch (error) {
    next(error)
  }
})

// GET /api/robots/:robotId
router.get('/:robotId', async (req, res, next) => {
  try {
    const robot = await Robot.findOne({
      where: {
        id: req.params.robotId
      },
      include: {
        model: Project
      }
    })


    res.json(robot)
  }
  catch (error) {
    next(error)
  }
})

module.exports = router
