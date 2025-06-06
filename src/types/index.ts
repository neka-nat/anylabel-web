export * from './annotation';

export interface Point {
  x: number;
  y: number;
}

export interface BaseAnnotation {
  id: string;
  label: string;
  color?: string;
}

export interface RectangleAnnotation extends BaseAnnotation {
  type: 'rectangle';
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PolygonAnnotation extends BaseAnnotation {
  type: 'polygon';
  points: Point[];
  drawMode?: 'click' | 'drag';  // Added drawMode to specify polygon creation method
}

export type Annotation =
  | RectangleAnnotation
  | PolygonAnnotation;
