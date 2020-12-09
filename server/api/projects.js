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

module.exports = router
