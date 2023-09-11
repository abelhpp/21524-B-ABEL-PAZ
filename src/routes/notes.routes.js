const { Router } = require('express')
const { createNote, listNotes } = require('../controllers/notes.controllers')

const router = Router()

router.post('/', createNote)
router.get('/', listNotes)

module.exports = router 