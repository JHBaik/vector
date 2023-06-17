import { Shape } from "@/lib/domain";

export interface Circle extends Shape<Circle> {
  type: "circle";
  radius: number;
}
