import { Shape } from "@/lib/model/shape";

export interface Circle extends Shape<Circle> {
  type: "circle";
  radius: number;
}
