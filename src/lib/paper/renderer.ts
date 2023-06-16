import type * as paper from "paper";
import { AllShapes } from "@/lib/meta";

export class PaperJsRenderer {
  private paper: paper.PaperScope;

  constructor(canvas: HTMLCanvasElement, paper: paper.PaperScope) {
    paper.setup(canvas);
    this.paper = paper;
  }

  render(shapes: AllShapes[]) {
    this.paper.project.clear();

    for (const shape of shapes) {
      switch (shape.type) {
        case "path":
          break;
        case "rectangle": {
          const from = new this.paper.Point(shape.topRight);
          const to = from.add([shape.width, shape.height]);
          const obj = new this.paper.Shape.Rectangle(from, to);
          obj.strokeColor = new this.paper.Color(shape.lineColor);
          obj.fillColor = new this.paper.Color(shape.fillColor);
          obj.strokeWidth = shape.lineWidth;
          break;
        }
        case "circle": {
          const obj = new this.paper.Shape.Circle(shape.center, shape.radius);
          obj.strokeColor = new this.paper.Color(shape.lineColor);
          obj.fillColor = new this.paper.Color(shape.fillColor);
          obj.strokeWidth = shape.lineWidth;
          break;
        }
      }
    }
  }
}
