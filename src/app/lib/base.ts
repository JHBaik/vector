import { SupportedCommands, SupportedShapes } from '@/app/lib/meta';
import { Command } from '@/app/lib/types';

export interface Coordinate {
  x: number;
  y: number;
}

/**
 * Canvas 의 기본은 선을 그리고 색을 채우는 것
 */
export interface Shape {
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
  shapes: Shape[];
}

export interface ShapeProvider<SHAPE extends Shape> {
  shape: SupportedShapes;
  handleCommand: (command: SupportedCommands, shape: SHAPE) => SHAPE;
}

export interface Context {
  canvas: Canvas;

  registerShapeProvider: (provider: ShapeProvider<any>) => {};
  handleCommand: (command: SupportedCommands) => {};
}

export interface NewShape extends Command<'shape/new'> {
  shape: Shape;
}
