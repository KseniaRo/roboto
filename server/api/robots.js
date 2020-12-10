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

// router.put('/:todoId', (req, res, next) => {
//   Todo.findByPk(req.params.todoId)
//     .then(todo => todo.update(req.body))
//     .then(todo => res.json(todo))
//     .catch(next)
// })

// router.delete('/:todoId', (req, res, next) => {
//   Todo.destroy({
//     where: {
//       id: req.params.todoId
//     }
//   })
//     .then(() => res.status(204).end())
//     .catch(next)
// })

module.exports = router
