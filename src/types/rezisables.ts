type ResizeDirection =
  | "right"
  | "bottom"
  | "bottom-right"
  | "left"
  | "top"
  | "top-left"
  | "top-right"
  | "bottom-left";

type Resize = {
  type: "resize";
  id: string;
  direction: ResizeDirection;
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
  startPosX: number;
  startPosY: number;
  containerWidth: number;
  containerHeight: number;
};

export type { ResizeDirection, Resize }