export type RectangleAnnotation = {
  id: string;
  type: 'rectangle';
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
};

export type PolygonAnnotation = {
  id: string;
  type: "polygon";
  label: string;
  points: { x: number, y: number }[]; // ポリゴンの各頂点の座標
  color?: string;
}

export type Annotation = RectangleAnnotation | PolygonAnnotation;
