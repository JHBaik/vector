import { Canvas, CanvasCtx } from "@/lib/base";
import { AllCommands } from "@/lib/meta";

class CanvasCtxImpl implements CanvasCtx {
  canvas: Canvas = {
    width: 0,
    height: 0,
    shapes: [],
  };
  debugLog: string = "";
  private lastIdx = -1;
  private cbs: Set<() => void> = new Set();

  handleCommand(command: AllCommands) {
    switch (command.name) {
      case "shape/new": {
        this.canvas.shapes.push({
          ...command.shape,
          id: ++this.lastIdx,
        });
        break;
      }
    }

    this.onChange();
  }

  registerListener(cb: () => void) {
    this.cbs.add(cb);
  }

  unregisterListener(cb: () => void) {
    this.cbs.delete(cb);
  }

  log(str: string): void {
    this.debugLog = str + "\n" + this.debugLog;
    this.onChange();
  }

  private onChange() {
    this.cbs.forEach((it) => it());
  }
}

let SINGLETON: CanvasCtx | undefined;

export const getCanvasCtx: () => CanvasCtx = () => {
  return SINGLETON ? SINGLETON : (SINGLETON = new CanvasCtxImpl());
};
