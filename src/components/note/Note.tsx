import React from "react";
import "./note.scss";

interface NoteProps {
  content: string;
  size: string;
  position: {
    x: number;
    y: number;
  };
}

const Note: React.FC<NoteProps> = ({ content, position, size }) => {
  return (
    <div
      className="note row align-center justify-center"
      style={{
        width: size,
        height: size,
        top: position.y,
        left: position.x,
      }}
    >
      {content}
    </div>
  );
};

export default Note;
