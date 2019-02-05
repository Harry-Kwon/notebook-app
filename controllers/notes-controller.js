var bodyParser = require('body-parser');
var db = require('./db.js');
const uuidv4 = require('uuid/v4');

var urlencodedParser = bodyParser.urlencoded({extended: true});

//init database
db.connect('');

//params: app - express app
module.exports = function (app) {
  
  //render view from data from database
  app.get('/notes', function(req, res){
    db.findNotes({}, function(searchResults){
      console.log(searchResults);
      res.render('notes', {notes: searchResults});
    });
  });
  
  //create new note
  app.post('/notes', urlencodedParser, function(req, res){
    let noteData = {title: req.body.title, id: uuidv4()};
    db.createNote(noteData);
    res.end('');
  });
  
  // update note
  app.put('/notes/:noteId', urlencodedParser, function(req, res){
    console.log(req.params.noteId);
    console.log(req.body.title);
    db.updateNoteTitle(req.params.noteId, req.body.title, function(raw){
      res.json(raw);
    });
  });
  
  // remove note
  app.delete('/notes/:noteId', urlencodedParser, function(req, res){
    let query = {id: req.params.noteId};
    db.removeNote(query);
    res.end('');
  });
}


