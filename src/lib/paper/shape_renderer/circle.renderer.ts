import { Circle } from "@/lib/model/shapes/circle";
import { ShapeRenderer } from "@/lib/paper/shape_renderer/_shape_renderer.base";

export class CircleRenderer extends ShapeRenderer<Circle> {
  render(paper: paper.PaperScope, shape: Circle): paper.Shape {
    return new paper.Shape.Circle(shape.pivot, shape.radius);
  }
}
