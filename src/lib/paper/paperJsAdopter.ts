import type * as paper from "paper";
import { AllShapes } from "@/lib/meta";
import { getCanvasCtx } from "@/lib/canvas.impl";

declare global {
  namespace paper {
    interface Item {
      _id: number;
    }
  }
}

export class PaperJsAdopter {
  private paper: paper.PaperScope;

  constructor(canvas: HTMLCanvasElement, paper: paper.PaperScope) {
    paper.setup(canvas);
    this.paper = paper;

    const tool = new this.paper.Tool();
    const ctx = getCanvasCtx();

    tool.activate();
    const toolMouseLog = (e: paper.ToolEvent) => {
      // ctx.log(
      //   "PAPER TOOL :: " +
      //     JSON.stringify({
      //       type: e.type,
      //       id: e.item?._id,
      //       delta: e.delta,
      //       point: e.point,
      //       downPoint: e.downPoint,
      //       count: e.count,
      //       lastPoint: e.lastPoint,
      //       middlePoint: e.middlePoint,
      //       timeStamp: e.timeStamp,
      //     })
      // );

      switch (e.type) {
        case "mouseup":
          ctx.handleCommand({
            name: "shape/mouse_click",
            item_id: e.item?._id,
          });
          break;
        case "mousedrag":
          ctx.handleCommand({
            name: "shape/mouse_drag",
            delta: {
              x: e.delta.x,
              y: e.delta.y,
            },
          });
          break;
      }
    };

    const toolKeyboardLog = (e: paper.KeyEvent) => {
      // ctx.log(
      //   "PAPER TOOL :: " +
      //     JSON.stringify({
      //       type: e.type,
      //       key: e.key,
      //       timeStamp: e.timeStamp,
      //       character: e.character,
      //     })
      // );
      switch (e.key) {
        case "shift":
        case "alt":
          // case 'meta':
          // case 'control':
          ctx.handleCommand({ name: "shape/key_event", key: e.key });
          break;
        default:
      }
    };

    tool.onKeyUp = toolKeyboardLog;
    tool.onKeyDown = toolKeyboardLog;

    tool.onMouseDrag = toolMouseLog;
    tool.onMouseDown = toolMouseLog;
    // tool.onMouseMove = toolLog;
    tool.onMouseUp = toolMouseLog;
  }

  render(shapes: AllShapes[]) {
    this.paper.project.clear();

    for (const shape of shapes) {
      switch (shape.type) {
        case "path":
          break;
        case "rectangle": {
          const from = new this.paper.Point(shape.pivot);
          const to = from.add([shape.width, shape.height]);
          const obj = new this.paper.Shape.Rectangle(from, to);
          obj.strokeColor = new this.paper.Color(shape.lineColor);
          obj.fillColor = new this.paper.Color(shape.fillColor);
          obj.strokeWidth = shape.lineWidth;
          obj.set({ _id: shape.id });
          obj.selected = shape._selected;
          break;
        }
        case "circle": {
          const obj = new this.paper.Shape.Circle(shape.pivot, shape.radius);
          obj.strokeColor = new this.paper.Color(shape.lineColor);
          obj.fillColor = new this.paper.Color(shape.fillColor);
          obj.strokeWidth = shape.lineWidth;
          obj.set({ _id: shape.id });
          obj.selected = shape._selected;
          break;
        }
      }
    }
  }
}
