import { AllShapes } from "@/lib/model/shape";
import { RectangleRenderer } from "@/lib/shape_renderer/rectangle.renderer";
import { CircleRenderer } from "@/lib/shape_renderer/circle.renderer";
import { ShapeRenderer } from "@/lib/shape_renderer/_shape_renderer.base";

export function rendererFactory(
  shape: AllShapes
): ShapeRenderer<AllShapes> | undefined {
  switch (shape.type) {
    case "rectangle":
      return new RectangleRenderer();
    case "circle":
      return new CircleRenderer();
    default:
      return;
  }
}
