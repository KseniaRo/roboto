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
// POST /api/projects/:projectId
router.post('/', async (req, res, next) => {
  try {
    const project = await Project.create(req.body)
    res.json(project)
  } catch (err) {
    next(err)
  }
})
// DELETE /api/projects/:projectId
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
// PUT /api/projects/:projectId
router.put('/:projectId', async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.projectId)
    console.log(req.body)
    project.update(req.body)
    res.json(project)
  }
  catch (err) {
    next(err)
  }
})

router.put('/:projectId/unassign', async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.projectId)
    const robot = await Robot.findByPk(req.body.robotId)
    // console.log('this is robot', robot)
    // console.log('this is project', project)
    // console.log(req.body)
    await project.removeRobot(robot)
    res.send(project)
  }
  catch (err) {
    next(err)
  }
})

router.put('/:projectId/completed', async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.projectId)
    console.log(req.body)
    project.update(req.body)
    res.json(project)
  }
  catch (err) {
    next(err)
  }
})
module.exports = router
