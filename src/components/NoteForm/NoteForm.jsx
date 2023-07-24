import React, { useState, useEffect } from "react";

export default function NoteForm({ setUser }) {
  const [noteData, setNoteData] = useState({
    text: "",
    user: "", //Works only if manually setting objectID
  });

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setNoteData({ ...noteData, [name]: value });
  };

  const handleSubmit = async (evt) => {
    // evt.preventDefault();

    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
      });

      if (!response.ok) {
        throw new Error("Failed to save note.");
      }

      setNoteData({ text: "" });
    } catch (error) {
      console.error("Error saving the note:", error);
    }
  };

  useEffect(() => {
    if (setUser && setUser._id) {
      setNoteData((prevState) => ({
        ...prevState,
        user: setUser._id, // Access the _id from setUser function
      }));
    }
    const fetchNotes = async () => {
      try {
        const response = await fetch("/api/notes");
        if (!response.ok) {
          throw new Error("Failed to fetch notes.");
        }
        const data = await response.json();
        setNotes(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setLoading(false);
      }
    };
    fetchNotes();
  }, [setUser]);

  return (
    <div>
      {loading ? (
        <p>Loading notes...</p>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="text">Text:</label>
              <input
                type="text"
                id="text"
                name="text"
                value={noteData.text}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Save Note</button>
          </form>

          {notes.length > 0 ? (
            <div>
              <h2>Previous Notes:</h2>
              {notes.map((note) => (
                <div key={note._id}>
                  <p>Text: {note.text}</p>
                  <p>User ID: {note.user}</p>
                  <p>Created At: {new Date(note.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No notes at this time.</p>
          )}
        </div>
      )}
    </div>
  );
}
