import { AllShapes } from "@/lib/model/shape";

export interface Canvas {
  width: number;
  height: number;
  shapes: AllShapes[];
}
