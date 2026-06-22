# Team Int Tech Task

This is a React application builed with Vite with the following command:
```
npm create vite@latest team-int-tech-task -- --template react-ts
```

## How to run the application
1
```
npm install
```
2
```
npm run dev
```

## Project structure

- public: public assets in browser
- src: source code
    - assets: images and vectors
    - components: reusable JSX components 
    - constants: folder for used constants
    - types: types definitions
    - App.tsx: main component
    - App.scss: styles for main component
    - main.tsx: root component of the application
    - index.scss: global styles
- package.json: Node.js project definitions
- tsconfig.json: TypeScript project config file
- vite.config.ts: Vite config file

## Application architecture
* App.tsx: Component responsible for storing the notes state. Also, loads notes content from localStorage
* components:
    * forms/NoteForm: component responsible for creating notes
    * notes-layout/NotesLayout: component responsible for providing the layout for notes movement and sizing
    * note/Note.tsx: Note component representation
    * dropzones/TrashDropzone: dropzone component for deleting notes