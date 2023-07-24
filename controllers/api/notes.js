const Note = require("../../models/note");

module.exports = {
  create,
  fetchPreviousNotes,
};

async function create(req, res) {
  try {
    const { text, user } = req.body;
    const newNote = await Note.create({ text, user });

    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error creating note:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the note" });
  }
}

async function fetchPreviousNotes(req, res) {
  try {
    const previousNotes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(previousNotes);
  } catch (error) {
    console.error("Error fetching previous notes:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching previous notes" });
  }
}
