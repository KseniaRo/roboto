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
// POST /api/robots/:robotId
router.post('/', async (req, res, next) => {
  try {
    const robot = await Robot.create(req.body)
    res.json(robot)
  } catch (err) {
    next(err)
  }
})
// DELETE /api/robots/:robotId
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
// PUT /api/robots/:robotId
router.put('/:robotId', async (req, res, next) => {
  try {
    const robot = await Robot.findByPk(req.params.robotId)
    console.log(req.body)
    robot.update(req.body)
    res.json(robot)
  }
  catch (err) {
    next(err)
  }
})

router.put('/:robotId/unassign', async (req, res, next) => {
  try {
    const robot = await Robot.findByPk(req.params.robotId)
    const project = await Project.findByPk(req.body.projectId)
    // console.log('this is robot', robot)
    // console.log('this is project', project)
    // console.log(req.body)
    await robot.removeProject(project)
    res.status(204)
  }
  catch (err) {
    next(err)
  }
})

module.exports = router
