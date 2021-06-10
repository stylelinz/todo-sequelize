const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const db = require('../models')
const { User } = db

module.exports = (app) => {
  // 設定passport初始化
  app.use(passport.initialize())
  app.use(passport.session())

  // 設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } })
      if (!user) {
        return done(null, false, { message: 'INVALID email or password' })
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return done(null, false, { message: 'INVALID email or password' })
      }
      return done(null, user)
    } catch (error) {
      return done(error, false)
    }
  }))

  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id)
      return done(null, user.toJSON())
    } catch (error) {
      return done(error, null)
    }
  })
}
