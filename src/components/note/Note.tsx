import React, { useRef } from "react";
import type { ResizeDirection } from "../../types/rezisables";
import "./note.scss";

interface NoteProps {
  content: string;
  position: { x: number; y: number };
  width: number;
  height: number;
  onMouseDown: (e: React.MouseEvent) => void;
  onResizeMouseDown: (e: React.MouseEvent, direction: ResizeDirection) => void;
}

const Note: React.FC<NoteProps> = ({
  content,
  position,
  width,
  height,
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
        width: width,
        height: height,
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onMouseDown={onMouseDown}
    >
      {content}

      <div
        className="resize-handle top-left"
        onMouseDown={(e) => {
          e.stopPropagation(); // prevents drag from triggering
          onResizeMouseDown(e, 'top-left');
        }}
      />
      <div
        className="resize-handle top-right inverted-resize"
        onMouseDown={(e) => {
          e.stopPropagation(); // prevents drag from triggering
          onResizeMouseDown(e, 'top-right');
        }}
      />
      <div
        className="resize-handle bottom-left inverted-resize"
        onMouseDown={(e) => {
          e.stopPropagation(); // prevents drag from triggering
          onResizeMouseDown(e, 'bottom-left');
        }}
      />
      <div
        className="resize-handle bottom-right"
        onMouseDown={(e) => {
          e.stopPropagation(); // prevents drag from triggering
          onResizeMouseDown(e, 'bottom-right');
        }}
      />
    </div>
  );
};

export default Note;
