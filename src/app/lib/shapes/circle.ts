import { Coordinate, Shape } from '@/app/lib/base';

export interface Circle extends Shape {
  type: 'circle';
  center: Coordinate;
  radius: number;
}
