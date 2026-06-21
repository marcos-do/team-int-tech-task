import React, { useState, useEffect, useRef } from "react";
import Note from "../note/Note";
import type { ResizeDirection, Resize } from "../../types/rezisables";
import type { Drag } from "../../types/dragging";
import type { NoteModel } from "../../types/note";
import "./notes-layout.scss";

type Interaction = Drag | Resize | null;

const NotesLayout: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [notes, setNotes] = useState<NoteModel[]>([
    { id: "1", content: "Note 1", x: 100, y: 100, width: 150, height: 150 },
    { id: "2", content: "Note 2", x: 300, y: 150, width: 150, height: 150 },
  ]);

  const [interaction, setInteraction] = useState<Interaction>(null);

  function startResize(
    e: React.MouseEvent,
    direction: ResizeDirection,
    noteId: string,
  ) {
    const rect = containerRef.current!.getBoundingClientRect();
    const note = notes.find((n) => n.id === noteId)!;

    setInteraction({
      type: "resize",
      id: noteId,
      direction,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: note.width,
      startHeight: note.height,
      startPosX: note.x,
      startPosY: note.y,
      containerWidth: rect.width,
      containerHeight: rect.height,
    });
  }

  function startDrag(e: React.MouseEvent, noteId: string) {
    const rect = containerRef.current!.getBoundingClientRect();
    const note = notes.find((n) => n.id === noteId);
    if (!note) return;

    setInteraction({
      type: "drag",
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
              Math.min(newX, interaction.containerWidth - note.width),
            );
            newY = Math.max(
              0,
              Math.min(newY, interaction.containerHeight - note.height),
            );

            return { ...note, x: newX, y: newY };
          }

          // RESIZE
          if (interaction.type === "resize") {
            const dx = e.clientX - interaction.startX;
            const dy = e.clientY - interaction.startY;

            const MIN_WIDTH = 80;
            const MIN_HEIGHT = 80;

            let newWidth = interaction.startWidth;
            let newHeight = interaction.startHeight;
            let newX = interaction.startPosX;
            let newY = interaction.startPosY;

            const dir = interaction.direction;

            // RIGHT
            if (dir.includes("right")) {
              newWidth = interaction.startWidth + dx;
            }

            // BOTTOM
            if (dir.includes("bottom")) {
              newHeight = interaction.startHeight + dy;
            }

            // LEFT (this is the tricky one)
            if (dir.includes("left")) {
              newWidth = interaction.startWidth - dx;
              newX = interaction.startPosX + dx;
            }

            // TOP (also tricky)
            if (dir.includes("top")) {
              newHeight = interaction.startHeight - dy;
              newY = interaction.startPosY + dy;
            }

            // Enforce minimum size
            if (newWidth < MIN_WIDTH) {
              newX -= MIN_WIDTH - newWidth;
              newWidth = MIN_WIDTH;
            }

            if (newHeight < MIN_HEIGHT) {
              newY -= MIN_HEIGHT - newHeight;
              newHeight = MIN_HEIGHT;
            }

            // Clamp to container (left/top)
            if (newX < 0) {
              newWidth += newX; // shrink width
              newX = 0;
            }

            if (newY < 0) {
              newHeight += newY;
              newY = 0;
            }

            // Clamp to container (right/bottom)
            if (newX + newWidth > interaction.containerWidth) {
              newWidth = interaction.containerWidth - newX;
            }

            if (newY + newHeight > interaction.containerHeight) {
              newHeight = interaction.containerHeight - newY;
            }

            return {
              ...note,
              x: newX,
              y: newY,
              width: newWidth,
              height: newHeight,
            };
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
          width={note.width}
          height={note.height}
          onMouseDown={(e) => startDrag(e, note.id)}
          onResizeMouseDown={(e, direction: ResizeDirection) =>
            startResize(e, direction, note.id)
          }
        />
      ))}
    </div>
  );
};

export default NotesLayout;
