const PORT = 8000,
      cors = require('cors'),
      path = require('path'),
      morgan = require('morgan'),
      express = require('express'),
      webpack = require('webpack'),
      Test = require('./models/test.js'),
      bodyParser = require('body-parser'),
      webpackConfig = require('./webpack.config'),
      Flashies = require('./models/flashcards.js'),
      webpackDevMiddleware = require('webpack-dev-middleware'),
      webpackHotMiddleware = require('webpack-hot-middleware')

//Express invocation
const app = express()

//Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Webpack Configuration
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath, noInfo: true
}))
app.use(webpackHotMiddleware(compiler))


//Get's a list of ALL the cards
app.get('/cards', (req, res) => {
  Flashies.getCards((err, cards) => {
    if(err) {
      return res.status(400).send(err)
    }
    res.send(cards)
  })
})

//Get questions by category
app.get('/test', (req, res) => {
  let category = req.query.category
  if(category) {
    Flashies.getCat(category, (err, catCards) => {
      if(err) {
        return res.status(404).send(err)
      }
      res.send(catCards)
    })
  } else {
    Test.startTest((err, currentView) => {
      if(err) {
        return res.status(404).send('Deck is Empty')
      }
      res.send(currentView)
    })
  }
})

//Create a flashcard with Category, Question, Answer
app.post('/cards', (req, res) => {
  console.log('in the post', req.body)
  Flashies.create(req.body, err => {
    if(err) return res.status(400).send(err);
    res.send({success: true});
  })
})

//Edit a card 
app.put('/cards/:id', (req, res) => {
  let id = req.params.id
  const { category, question, answer } = req.body
  const newCard = { category, question, answer, id }
  Flashies.editCard(newCard, (err) => {
    if(err) return res.status(404).send(err)
  })
  res.send({success: true})
})

//Delete card by id
app.delete('/cards/:id', (req, res) => {
  let deleteID = req.params.id
  Flashies.deleteCard(deleteID, (err) => {
    if(err) return res.status(404).send(err)
  })
  res.send(`Card ${deleteID}, was deleted from your deck`)
})

//Get All Categories
app.get('/categories', (req, res) => {
  Flashies.getAllCats( (err, categories) => {
    if(err) return res.status(404).send(err)
    res.send(categories)
  })
})

//Give index.html on each request
app.use("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.listen(PORT, err => {
  console.log( err || `Express listening on port ${8000}`)
})