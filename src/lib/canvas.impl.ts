import { Canvas, CanvasCtx } from "@/lib/base";
import { AllCommands } from "@/lib/meta";

class CanvasCtxImpl implements CanvasCtx {
  canvas: Canvas = {
    width: 0,
    height: 0,
    shapes: [],
  };
  private cbs: Set<() => void> = new Set();

  handleCommand(command: AllCommands) {
    this.canvas.shapes.push(command.shape);
    this.onChange();
  }

  registerListener(cb: () => void) {
    this.cbs.add(cb);
  }

  unregisterListener(cb: () => void) {
    this.cbs.delete(cb);
  }

  private onChange() {
    this.cbs.forEach((it) => it());
  }
}

let SINGLETON: CanvasCtx | undefined;

export const getCanvasCtx: () => CanvasCtx = () => {
  return SINGLETON ? SINGLETON : (SINGLETON = new CanvasCtxImpl());
};
