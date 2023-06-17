import { AllShapes } from "@/lib/model/shape";
import type * as paper from "paper";

export abstract class ShapeRenderer<T extends AllShapes> {
  abstract render(paper: paper.PaperScope, shape: T): paper.Path;

  _render(paper: paper.PaperScope, shape: T) {
    const obj = this.render(paper, shape);

    obj.strokeColor = new paper.Color(shape.lineColor);
    obj.fillColor = new paper.Color(shape.fillColor);
    obj.strokeWidth = shape.lineWidth;
    obj.set({ _id: shape.id });
    obj.selected = shape._selected;
  }
}
