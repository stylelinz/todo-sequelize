const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')

const routes = require('./routes')

const app = express()
const PORT = 3000

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is listening at http://localhost:${PORT}`)
})
