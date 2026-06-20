import React, { useState, useEffect, useRef } from "react";
import Note from "../note/Note";
import "./notes-layout.scss";

type NoteModel = {
  id: string;
  content: string;
  x: number;
  y: number;
  size: number;
};

type Drag = {
  type: "drag";
  id: string;
  offsetX: number;
  offsetY: number;
  containerWidth: number;
  containerHeight: number;
};

type Resize = {
  type: "resize";
  id: string;
  startX: number;
  startY: number;
  startSize: number;
  containerWidth: number;
  containerHeight: number;
};

type Interaction = Drag | Resize | null;

const NotesLayout: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [notes, setNotes] = useState<NoteModel[]>([
    { id: "1", content: "Note 1", x: 100, y: 100, size: 150 },
    { id: "2", content: "Note 2", x: 300, y: 150, size: 150 },
  ]);

  const [interaction, setInteraction] = useState<Interaction>(null);

  function startResize(e: React.MouseEvent, noteId: string) {
    const rect = containerRef.current!.getBoundingClientRect();
    const note = notes.find((n) => n.id === noteId)!;

    setInteraction({
      type: "resize",
      id: noteId,
      startX: e.clientX,
      startY: e.clientY,
      startSize: note.size,
      containerWidth: rect.width,
      containerHeight: rect.height,
    });
  }

  function startDrag(e: React.MouseEvent, noteId: string) {
    const rect = containerRef.current!.getBoundingClientRect();
    const note = notes.find((n) => n.id === noteId);
    if (!note) return;

    setInteraction({
      type: 'drag',
      id: noteId,
      offsetX: e.clientX - note.x,
      offsetY: e.clientY - note.y,
      containerWidth: rect.width,
      containerHeight: rect.height,
    });
  }

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      if (!interaction) return;

      setNotes((prev) =>
        prev.map((note) => {
          if (note.id !== interaction.id) return note;

          // DRAG
          if (interaction.type === "drag") {
            let newX = e.clientX - interaction.offsetX;
            let newY = e.clientY - interaction.offsetY;

            newX = Math.max(
              0,
              Math.min(newX, interaction.containerWidth - note.size),
            );
            newY = Math.max(
              0,
              Math.min(newY, interaction.containerHeight - note.size),
            );

            return { ...note, x: newX, y: newY };
          }

          // RESIZE
          if (interaction.type === "resize") {
            const deltaX = e.clientX - interaction.startX;

            let newSize = interaction.startSize + deltaX;

            const MIN_SIZE = 80;

            // 🔥 Respect min size
            newSize = Math.max(MIN_SIZE, newSize);

            // 🔥 Respect container bounds
            const maxWidth = interaction.containerWidth - note.x;
            const maxHeight = interaction.containerHeight - note.y;

            const maxSize = Math.min(maxWidth, maxHeight);

            newSize = Math.min(newSize, maxSize);

            return { ...note, size: newSize };
          }

          return note;
        }),
      );
    }

    function handleUp() {
      setInteraction(null);
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [interaction]);

  return (
    <div ref={containerRef} className="notes-layout">
      {notes.map((note) => (
        <Note
          key={note.id}
          content={note.content}
          position={{ x: note.x, y: note.y }}
          size={note.size}
          onMouseDown={(e) => startDrag(e, note.id)}
          onResizeMouseDown={(e) => startResize(e, note.id)}
        />
      ))}
    </div>
  );
};

export default NotesLayout;
