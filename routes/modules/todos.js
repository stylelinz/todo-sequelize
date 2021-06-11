const express = require('express')
const router = express.Router()

const db = require('../../models')
const { todo: Todo } = db

// page: create todo
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', async (req, res) => {
  const { name } = req.body
  const { id: UserId } = req.user
  try {
    await Todo.create({ name, UserId })
    return res.redirect('/')
  } catch (error) {
    console.error(error)
    return res.status(400).render('new', { name })
  }
})

// page: read todo detail
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { id: UserId } = req.user
    const todo = await Todo.findOne({
      where: {
        id,
        UserId
      },
      raw: true
    })
    return res.render('detail', { todo: todo })
  } catch (error) {
    return res.status(422).json(error)
  }
})

// page: update todo
router.get('/:id/edit', async (req, res) => {
  try {
    const { id } = req.params
    const { id: UserId } = req.user
    const todo = await Todo.findOne({
      where: {
        id,
        UserId
      },
      raw: true
    })
    return res.render('edit', { todo: todo })
  } catch (error) {
    return res.status(422).json(error)
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { id: UserId } = req.user
  const { name } = req.body
  try {
    await Todo.update({ name }, {
      where: {
        id,
        UserId
      }
    })
    return res.redirect(`/todos/${id}`)
  } catch (error) {
    console.error(error)
    return res.redirect(`/todos/${id}/edit`)
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const { id: UserId } = req.user
  try {
    await Todo.destroy({
      where: {
        id,
        UserId
      }
    })
    return res.redirect('/')
  } catch (error) {
    console.error(error)
    return res.redirect('/')
  }
})

module.exports = router
