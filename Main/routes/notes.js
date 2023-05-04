const nt = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

nt.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

nt.post('/', (req, res) => {
    
    const { noteTitle, noteBody } = req.body;
  
    
    if (noteTitle && noteBody) {
      
      const newNote = {
        noteTitle,
        noteBody,
        note_id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
  
      const userInput = {
        status: 'success',
        body: newNote,
      };
  
      res.json(userInput);
    } else {
      res.json('Error in posting note');
    }
  });
  
  module.exports = nt;
  module.exports = router;
