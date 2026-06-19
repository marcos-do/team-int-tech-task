import Note from './components/note/Note'
import NotesLayout from './components/notes-layout/NotesLayout'
import './App.scss'

function App() {

  return (
    <main>
      <NotesLayout><Note content='Note 1' position={{x: 0, y: 0}} size='128px'></Note></NotesLayout>
    </main>
  )
}

export default App
