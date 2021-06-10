const express = require('express')
const router = express.Router()

const db = require('../../models')
const {
  todo: Todo,
  User
} = db

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
