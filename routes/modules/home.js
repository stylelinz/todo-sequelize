const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.todo

router.get('/', async (req, res) => {
  const { id: UserId } = req.user
  try {
    const todos = await Todo.findAll({
      where: { UserId },
      raw: true,
      nest: true
    })
    return res.render('index', { todos })
  } catch (error) {
    return res.status(422).json(error)
  }
})

module.exports = router
