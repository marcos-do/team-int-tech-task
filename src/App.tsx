import { useState } from 'react'
import NotesLayout from './components/notes-layout/NotesLayout'
import NoteForm from './components/forms/NoteForm'
import type { NoteModel } from './types/note'
import './App.scss'

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([])

  return (
    <main>
      <NoteForm onSubmit={(note: NoteModel) => {
        console.log(note)
        setNotes([...notes, note])
      }} />
      <NotesLayout setNotes={setNotes} notes={notes}></NotesLayout>
    </main>
  )
}

export default App
