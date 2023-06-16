import { Coordinate, Shape } from "@/app/lib/base";

interface Rectangle extends Shape {
  type: "rectangle";
  topRight: Coordinate;
  width: number;
  height: number;
}
