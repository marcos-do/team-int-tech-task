import React, { useRef } from "react";
import "./note.scss";

interface NoteProps {
  content: string;
  size: number;
  position: { x: number; y: number };
  onMouseDown: (e: React.MouseEvent) => void;
  onResizeMouseDown: (e: React.MouseEvent) => void;
}

const Note: React.FC<NoteProps> = ({
  content,
  position,
  size,
  onMouseDown,
  onResizeMouseDown,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="note"
      style={{
        position: "absolute",
        width: size,
        height: size,
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onMouseDown={onMouseDown}
    >
      {content}

      <div
        className="resize-handle"
        onMouseDown={(e) => {
          e.stopPropagation(); // prevents drag from triggering
          onResizeMouseDown(e);
        }}
      />
    </div>
  );
};

export default Note;
