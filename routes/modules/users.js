const bcrypt = require('bcryptjs')
const express = require('express')
const passport = require('passport')

const db = require('../../models')
const { User } = db

const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  try {
    const user = await User.findOne({ where: { email } })
    // 如果沒有查到的話，user會是null。
    // 找到的話就拋出error讓下面的catch區塊去接。
    if (user) {
      throw new Error(`${email}\nThis email is already exists.`)
    }
    // 這裡不使用genSalt的原因，在於hash第二個參數除了可以放入salt的字串之外，也可以放入整數，代表salt的複雜度，以此簡化genSalt的流程。
    const hash = await bcrypt.hash(password, 10)
    await User.create({
      name,
      email,
      password: hash
    })
    return res.redirect('/')
  } catch (error) {
    console.error(error)
    return res.status(400).render('register', {
      name,
      email,
      password,
      confirmPassword
    })
  }
})

module.exports = router
