import type * as paper from "paper";
import { getCanvasCtx } from "@/lib/canvas.impl";
import { AllShapes } from "@/lib/model/shape";
import { rendererFactory } from "@/lib/paper/renderer.factory";

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
    console.warn("Recreating paper ctx");
    paper.setup(canvas);
    paper.project.clear();
    paper.view.update();
    this.paper = paper;

    const tool = new this.paper.Tool();
    const ctx = getCanvasCtx();

    tool.activate();
    const toolMouseLog = (e: paper.ToolEvent) => {
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
      let renderer = rendererFactory(shape);

      if (!renderer) {
        console.warn("Unregistered shape render request. " + shape.type);
        continue;
      }

      renderer._render(this.paper, shape);
    }
  }
}
