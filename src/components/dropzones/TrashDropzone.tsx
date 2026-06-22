import { forwardRef } from "react";
import "./TrashDropzone.scss";

const TrashDropzone = forwardRef<HTMLDivElement>((_, ref) => {
  return <div ref={ref} className="trash"></div>;
});

export default TrashDropzone;
