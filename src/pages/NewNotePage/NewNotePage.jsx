import NoteForm from "../../components/NoteForm/NoteForm";

export default function NewNotePage({ setUser }) {
  return (
    <>
      <h1>New Note Page</h1>
      <NoteForm setUser={setUser} />
    </>
  );
}
