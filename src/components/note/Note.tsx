import React, { useRef } from "react";
import "./note.scss";

interface NoteProps {
  content: string;
  size: number;
  position: {
    x: number;
    y: number;
  };
  onMouseDown?: (e: React.MouseEvent) => void;
}

const Note: React.FC<NoteProps> = ({ content, position, size, onMouseDown }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="note row align-center justify-center"
      style={{
        width: size,
        height: size,
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onMouseDown={onMouseDown}
    >
      {content}
    </div>
  );
};

export default Note;
