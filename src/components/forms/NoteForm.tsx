import React, { useState } from "react";
import { MIN_HEIGHT, MIN_WIDTH } from "../../constants/sizes";
import type { NoteModel } from "../../types/note";
import "./notes-form.scss";

interface NoteFormProps {
  onSubmit: (note: NoteModel) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onSubmit }) => {
  const [id, setId] = useState(0);
  const [content, setContent] = useState("");
  const [width, setWidth] = useState(MIN_WIDTH);
  const [height, setHeight] = useState(MIN_HEIGHT);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  return (
    <form
      className="notes-form"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit({
          id: id.toString(),
          content: content,
          width: width,
          height: height,
          x: x,
          y: y,
        });
        setId(id + 1);
      }}
    >
      <div className="row">
        <div className="col">
          <label id="content">Content</label>
          <input
            type="text"
            aria-labelledby="content"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></input>
        </div>
        <div className="col">
          <label id="width">Width</label>
          <input
            value={width}
            type="number"
            min={MIN_WIDTH}
            aria-labelledby="width"
            onChange={(e) => {
              const value = Number(e.target.value);
              setWidth(value);
            }}
            onBlur={() => {
              if (width < MIN_WIDTH) {
                setWidth(MIN_WIDTH);
              }
            }}
          ></input>
        </div>
        <div className="col">
          <label id="height">Height</label>
          <input
            value={height}
            type="number"
            min={MIN_HEIGHT}
            aria-labelledby="height"
            onChange={(e) => {
              const value = Number(e.target.value);
              setHeight(value);
            }}
            onBlur={() => {
              if (height < MIN_HEIGHT) {
                setHeight(MIN_HEIGHT);
              }
            }}
          ></input>
        </div>
        <div className="col">
          <label className="center">Position</label>
          <div className="row">
            <label id="x">X:</label>
            <input
              type="number"
              aria-labelledby="x"
              onChange={(e) => {
                const value = Number(e.target.value);
                setX(value);
              }}
            ></input>
            <label id="y">Y:</label>
            <input
              type="number"
              aria-labelledby="y"
              onChange={(e) => {
                const value = Number(e.target.value);
                setY(value);
              }}
            ></input>
          </div>
        </div>
        <button type="submit">Create</button>
      </div>
    </form>
  );
};

export default NoteForm;
