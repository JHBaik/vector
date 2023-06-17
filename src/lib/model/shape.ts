import { Path } from "@/lib/model/shapes/path";
import { Circle } from "@/lib/model/shapes/circle";
import { Rectangle } from "@/lib/model/shapes/rectangle";

export type AllShapes = Path | Circle | Rectangle;

export interface Coordinate {
  x: number;
  y: number;
}

export interface Shape<T extends Shape<T>> {
  id: number;
  type: string;
  lineColor: string;
  lineWidth: number;
  closed: boolean;
  fillColor: string;
  pivot: Coordinate;

  // below is runtime only
  _selected: boolean;
}
