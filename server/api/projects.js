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
    const project = await Project.findAll({
      where: {
        id: req.params.projectId
      },
      include: [Robot]
    })
    res.json(project)
  }
  catch (error) {
    next(error)
  }
})

module.exports = router
