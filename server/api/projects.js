const router = require('express').Router()
const { Robot, Project } = require('../db')
// GET /api/projects
router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.findAll()
    res.send(projects)
  }
  catch (error) {
    next(error)
  }
})

// GET /api/projects/:projectId
router.get('/:projectId', async (req, res, next) => {
  try {
    const project = await Project.findOne({
      where: {
        id: req.params.projectId
      },
      include: {
        model: Robot
      }
    })
    res.json(project)
  }
  catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const project = await Project.create(req.body)
    res.json(project)
  } catch (err) {
    next(err)
  }
})

router.delete('/:projectId', async (req, res, next) => {
  try {
    await Project.destroy({
      where: {
        id: req.params.projectId
      }
    })
    res.status(204).end()
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


module.exports = router
