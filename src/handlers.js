const { nanoid } = require('nanoid');
const notes = require('./notes');
const { generateResponse, serverErrorResponse, notFoundErrorResponse } = require('../helpers');

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (req, h) => {
  const { id } = req.params;

  const note = notes.find((note) => note.id === id);

  if (note === undefined) {
    return notFoundErrorResponse({ h, message: 'Catatan tidak ditemukan' });
  }

  return generateResponse({ h, data: { note } });
};

const addNoteHandler = (req, h) => {
  const { title, tags, body } = req.payload;
  const id = nanoid(16);
  const currentDate = new Date().toISOString();

  const newNote = {
    id,
    title,
    tags,
    body,
    createdAt: currentDate,
    updatedAt: currentDate
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    return generateResponse({ h, statusCode: 201, message: 'Catatan berhasil ditambahkan', data: { id: newNote.id } });
  }

  return serverErrorResponse({ h, message: 'Catatan gagal ditambahkan' });
};

const editNoteHandler = (req, h) => {

  const { id } = req.params;
  const { title, tags, body } = req.payload;
  const updatedAt = new Date().toISOString();

  const idx = notes.findIndex((note) => note.id === id);

  if (idx === -1) {
    return notFoundErrorResponse({ h, message: 'Catatan tidak ditemukan' });
  }

  notes[idx] = {
    ...notes[idx],
    title,
    tags,
    body,
    updatedAt
  };

  return generateResponse({ h, message: 'Catatan berhasil diperbarui' });
};

const deleteNoteHandler = (req, h) => {
  const { id } = req.params;
  const idx = notes.findIndex((note) => note.id === id);

  if (idx === -1) {
    return notFoundErrorResponse({ h, message: 'Catatan tidak ditemukan' });
  }

  notes.splice(idx, 1);

  return generateResponse({ h, message: 'Catatan berhasil dihapus' });
};

module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteHandler, deleteNoteHandler };