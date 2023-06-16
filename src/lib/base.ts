import { AllCommands, SupportedShapes } from "@/lib/meta";
import { Command } from "@/lib/types";

export interface Coordinate {
  x: number;
  y: number;
}

/**
 * Canvas 의 기본은 선을 그리고 색을 채우는 것
 */
export interface Shape<T extends Shape<T>> {
  id: number;
  type: SupportedShapes;
  lineColor: string;
  lineWidth: number;
  closed: boolean;
  fillColor: string;
}

export interface Canvas {
  width: number;
  height: number;
  shapes: Shape<any>[];
}

export interface ShapeProvider<SHAPE extends Shape<any>> {
  shape: SupportedShapes;
  handleCommand: (command: AllCommands, shape: SHAPE) => SHAPE;
}

export interface CanvasCtx {
  canvas: Canvas;

  // registerShapeProvider: (provider: ShapeProvider<any>) => {};
  registerListener: (cb: () => void) => void;
  unregisterListener: (cb: () => void) => void;
  handleCommand: (command: AllCommands) => void;
}

export interface NewShape<T extends Shape<any>> extends Command<"shape/new"> {
  shape: T;
}
