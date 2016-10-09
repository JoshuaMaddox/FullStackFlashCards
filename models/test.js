const fs = require('fs'),
      path = require('path'),
      Flashies = require('./flashcards'),
      dataBase = path.join(__dirname, '../data/data.json'),
      testDataBase = path.join(__dirname, '../data/test.json')


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

//Writes to the test.json file 
exports.write = function(newData, cb) {
  console.log('newData: ', newData)
  let json = JSON.stringify(newData)
  fs.writeFile(testDataBase, json, cb)
}

//Runs the test
exports.startTest = function(cb){
  exports.getTestCards((err, testObj) => {
    const { testDeck, next } = testObj
    let sendObj = {
        testEnd: false,
        res: ''
      }
    if(!testDeck[0]){
      //Delete to here
      sendObj.testEnd = true
      cb(null, sendObj)
    } else if (next === false){
      sendObj.res = testDeck[0].question
      cb(null, sendObj)
      testObj.next = true
      exports.write(testObj)
    }
    if(next === true){
      sendObj.res = testDeck[0].answer
      cb(null, sendObj)
      testDeck.shift()
      testObj.next = false
      exports.write(testObj)
    }
  })
}




