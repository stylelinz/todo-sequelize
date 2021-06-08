import express from 'express'
import exphbs from 'express-handlebars'
import session from 'express-session'
import methodOverride from 'method-override'
import bcrypt from 'bcryptjs'

const app = express()
const PORT = 3000

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.send('hello world.')
})

app.listen(PORT, () => {
  console.log(`Express is listening at http://localhost:${PORT}`)
})
