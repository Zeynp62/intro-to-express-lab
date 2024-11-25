const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
]
const shoes = [
  { name: 'Birkenstocks', price: 50, type: 'sandal' },
  { name: 'Air Jordans', price: 500, type: 'sneaker' },
  { name: 'Air Mahomeses', price: 501, type: 'sneaker' },
  { name: 'Utility Boots', price: 20, type: 'boot' },
  { name: 'Velcro Sandals', price: 15, type: 'sandal' },
  { name: 'Jet Boots', price: 1000, type: 'boot' },
  { name: 'Fifty-Inch Heels', price: 175, type: 'heel' }
]
//import express
const express = require('express')
const validator = require('validator')

//invoke express
const app = express()

//Answer1
app.get('/greetings/:username', (req, res) => {
  res.send(
    `<p>What a delight it is to see you once more, ${req.params.username}</p>`
  )
})
//Answer2
app.get('/roll/:number', (req, res) => {
  if (validator.isNumeric(req.params.number)) {
    let rand = Math.floor(Math.random() * (req.params.number - 0 + 1) + 0)
    res.send(`You rolled a ${rand}`)
  } else {
    res.send('You must specify a number.')
  }
})
//Answer3
app.get('/collectibles/:index', (req, res) => {
  if (req.params.index < collectibles.length && req.params.index >= 0) {
    res.send(
      `So, you want the ${collectibles[req.params.index].name}? For ${
        collectibles[req.params.index].price
      }, it can be yours! `
    )
  } else {
    res.send(`This item is not yet in stock`)
  }
})

//Answer4
app.get('/shoes', (req, res) => {
  let filteredShoes = []
  for (let i = 0; i < shoes.length; i++) {
    let shoe = shoes[i]
    if (
      (!req.query.minPrice || shoe.price >= req.query.minPrice) &&
      (!req.query.maxPrice || shoe.price <= req.query.maxPrice) &&
      (!req.query.type || shoe.type === req.query.type)
    ) {
      filteredShoes.push(shoe)
    }
  }
  res.send(filteredShoes)
})
//Listen for requests on port 3000
app.listen(3000, () => {
  console.log('listening to port 3000')
})
