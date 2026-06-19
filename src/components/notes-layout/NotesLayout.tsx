import React, { type ReactElement } from "react";
import type Note from "../note/Note";
import './notes-layout.scss'

type NotesLayoutProps = {
  // Make sure children is only Note component
  children: ReactElement<typeof Note> | ReactElement<typeof Note>[];
};

const NotesLayout: React.FC<NotesLayoutProps> = ({ children }) => {
  return <div className="notes-layout">{children}</div>;
};

export default NotesLayout;
