const express = require('express')
const router = express.Router()

const db = require('../../models')
const {
  todo: Todo,
  User
} = db

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', async (req, res) => {
  const { name } = req.body
  try {

  } catch (error) {
    return res.status(400).render('new', { name })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const todo = await Todo.findByPk(id)
    return res.render('detail', { todo: todo.toJSON() })
  } catch (error) {
    return res.status(422).json(error)
  }
})

module.exports = router
