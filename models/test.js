const fs = require('fs'),
      path = require('path'),
      Flashies = require('./flashcards'),
      dataBase = path.join(__dirname, '../data/data.json'),
      testDataBase = path.join(__dirname, '../data/test.json')
      testDifficulty = path.join(__dirname, '../data/difficulty.json')


//Get all Flashcards in a Readable Format
exports.getTestCards = function(cb){
  fs.readFile(testDataBase, (err, buffer) => {
    if(err) return cb(err)
      try {
        var testObj = JSON.parse(buffer)
      } catch(e) {
        var testObj = []
      }
      cb(null, testObj)
  })
}

//Get all Flashcards in a Readable Format
exports.getDiffCards = function(cb) {
  fs.readFile(testDifficulty, (err, buffer) => {
    if(err) return cb(err)
      try {
        var testObj = JSON.parse(buffer)
      } catch(e) {
        var testObj = []
      }
      cb(null, testObj)
  })
}

//Writes to the test.json file 
exports.write = function(newData, cb) {
  let json = JSON.stringify(newData)
  fs.writeFile(testDataBase, json, cb)
}

//Writes to the difficulty.json file
exports.writeToDiff = function(newData, cb) {
  let json = JSON.stringify(newData)
  fs.writeFile(testDifficulty, json, cb)
}


//Sets Difficulty of test DELETE TO HERE
exports.setDifficulty = function(cardDifficulty, cb) {
  exports.getDiffCards((err, testObj) => {
    let diffCardsArr = []
    if(testObj.length) {
      diffCardsArr = testObj.filter((card) => {
        if(card.id === cardDifficulty.id){
          return 
        } else {
          return card
        }
      })
    }
    Flashies.getCards((err, testObj) => {
        let diffDeck = testObj.filter((card, index) => {
        if(card.id === cardDifficulty.id){
          card.difficulty = cardDifficulty.difficulty
          return card
        } else {
          return
        }
      })
    diffCardsArr.push(diffDeck[0])
    exports.writeToDiff(diffCardsArr)
    cb(null, testObj)
    })
  }) 
}

//Runs the test
exports.startTest = function(cb){
  exports.getTestCards((err, testObj) => {
    const { testDeck, next } = testObj
    let sendObj = {
        testEnd: false,
        testID: '',
        res: ''
      }
    if(!testDeck[0]){
      //Delete to here
      sendObj.testEnd = true
      cb(null, sendObj)
    } else if (next === false){
      sendObj.res = testDeck[0].question
      sendObj.testID = testDeck[0].id
      cb(null, sendObj)
      testObj.next = true
      exports.write(testObj)
    }
    if(next === true){
      sendObj.res = testDeck[0].answer
      sendObj.testID = testDeck[0].id
      cb(null, sendObj)
      testDeck.shift()
      testObj.next = false
      exports.write(testObj)
    }
  })
}




