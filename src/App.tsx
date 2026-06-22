import { useState, useEffect, useRef } from "react";
import NotesLayout from "./components/notes-layout/NotesLayout";
import NoteForm from "./components/forms/NoteForm";
import type { NoteModel } from "./types/note";
import "./App.scss";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const isFirstRender = useRef(true);

  useEffect(() => {
    function loadNotes(storageNotes: NoteModel[]) {
      setNotes(storageNotes);
    }

    const storageNotes = localStorage.getItem("notes");

    if (storageNotes) {
      loadNotes(JSON.parse(storageNotes));
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <main>
      <NoteForm
        onSubmit={(note: NoteModel) => {
          setNotes([...notes, note]);
        }}
      />
      <NotesLayout setNotes={setNotes} notes={notes}></NotesLayout>
    </main>
  );
}

export default App;
