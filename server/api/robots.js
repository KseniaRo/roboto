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

router.post('/', async (req, res, next) => {
  try {
    const robot = await Robot.create(req.body)
    res.json(robot)
  } catch (err) {
    next(err)
  }
})

router.delete('/:robotId', async (req, res, next) => {
  try {
    await Robot.destroy({
      where: {
        id: req.params.robotId
      }
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})


// router.put('/:robotId', (req, res, next) => {
//   robot.findByPk(req.params.robotId)
//     .then(robot => robot.update(req.body))
//     .then(robot => res.json(robot))
//     .catch(next)
// })

module.exports = router
