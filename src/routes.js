const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteHandler, deleteNoteHandler } = require('./handlers');

const routes = [
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler
  },
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteHandler
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteHandler
  },
];

module.exports = routes;