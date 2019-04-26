const express = require('express')
const nunjucks = require('nunjucks')

const app = express()
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const validateMiddleware = (req, res, next) => {
  if (!req.query.age) {
    return res.redirect('/')
  }
  return next()
}
app.get('/', (req, res) => {
  return res.render('check')
})

app.post('/check', (req, res) => {
  if (req.body.age >= 18) {
    return res.redirect(`/major?age=${req.body.age}`)
  } else {
    return res.redirect(`/minor?age=${req.body.age}`)
  }
})

app.get('/major', validateMiddleware, (req, res) => {
  let { age } = req.query
  return res.render('major', { age })
})

app.get('/minor', validateMiddleware, (req, res) => {
  return res.send(`Você é menor de idade e possui ${req.query.age} anos`)
})

app.listen(8080)
