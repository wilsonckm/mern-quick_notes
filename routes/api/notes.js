const express = require("express");
const router = express.Router();
const notesCtrl = require("../../controllers/api/notes");

//POST
router.post("/", notesCtrl.create);
router.get("/", notesCtrl.fetchPreviousNotes);

module.exports = router;
