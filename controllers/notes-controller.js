var bodyParser = require('body-parser');
var db = require('./db');
var Note = require('../models/note.js');

var urlencodedParser = bodyParser.urlencoded({extended: true});

//DUMMY DATA

//init database
db.connect();
var noteSchema = db.createSchema(Note.prototype.schema);
var NoteModel = db.createModel('Note', noteSchema);

//params: app - express app
module.exports = function (app) {
  
  //render view from data from database
  app.get('/notes', function(req, res){
    db.findRecord(NoteModel, {}, function(err, searchResults){
      console.log(searchResults);
      res.render('home', {notes: searchResults});
    });
  });
  
  //create new note
  app.post('/notes', urlencodedParser, function(req, res){
    console.log('start post');
    console.log('req body: ')
    console.log(req.body);
    
		var newNote = new Note(req.body);
    console.log('creating new note: ');
		console.log(newNote.data);
    db.createRecord(NoteModel, newNote.data, function(err, data) {
      console.log('created record :');
      console.log(data);
      res.json(data);
    });
  });
  
  app.put('/notes', urlencodedParser, function(req, res){});
  app.delete('/notes', urlencodedParser, function(req, res){});
}


