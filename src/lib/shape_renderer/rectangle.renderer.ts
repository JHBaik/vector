import { Rectangle } from "@/lib/model/shapes/rectangle";
import { ShapeRenderer } from "@/lib/shape_renderer/_shape_renderer.base";

export class RectangleRenderer extends ShapeRenderer<Rectangle> {
  render(paper: paper.PaperScope, shape: Rectangle): paper.Shape {
    const from = new paper.Point(shape.pivot);
    const to = from.add([shape.width, shape.height]);
    return new paper.Shape.Rectangle(from, to);
  }
}
