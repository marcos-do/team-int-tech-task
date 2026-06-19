import React, { useState, useEffect } from "react";
import Note from "../note/Note";
import "./notes-layout.scss";

type NoteModel = {
  id: string;
  content: string;
  x: number;
  y: number;
  size: number;
};

const NotesLayout: React.FC = () => {
  const [notes, setNotes] = useState<NoteModel[]>([
    { id: "1", content: "Note 1", x: 100, y: 100, size: 150 },
    { id: "2", content: "Note 2", x: 300, y: 150, size: 150 },
  ]);

  const [dragging, setDragging] = useState<null | {
    id: string;
    offsetX: number;
    offsetY: number;
  }>(null);

  function handleMouseDown(e: React.MouseEvent, noteId: string) {
    const note = notes.find((n) => n.id === noteId);
    if (!note) return;

    setDragging({
      id: noteId,
      offsetX: e.clientX - note.x,
      offsetY: e.clientY - note.y,
    });
  }

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      if (!dragging) return;

      setNotes((prev) =>
        prev.map((note) =>
          note.id === dragging.id
            ? {
                ...note,
                x: e.clientX - dragging.offsetX,
                y: e.clientY - dragging.offsetY,
              }
            : note,
        ),
      );
    }

    function handleUp() {
      setDragging(null);
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [dragging]);

  return (
    <div
      className="notes-layout"
    >
      {notes.map((note) => (
        <Note
          key={note.id}
          content={note.content}
          position={{ x: note.x, y: note.y }}
          size={note.size}
          onMouseDown={(e) => handleMouseDown(e, note.id)}
        />
      ))}
    </div>
  );
};

export default NotesLayout;
