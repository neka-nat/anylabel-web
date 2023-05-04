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

export type CircleAnnotation = {
  id: string;
  type: 'circle';
  label: string;
  centerX: number;
  centerY: number;
  radius: number;
  color?: string;
};

export type Annotation = RectangleAnnotation | CircleAnnotation;
