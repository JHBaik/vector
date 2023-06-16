import { Canvas, CanvasCtx, KeyEvent } from "@/lib/base";
import { AllCommands } from "@/lib/meta";

class CanvasCtxImpl implements CanvasCtx {
  mode: CanvasCtx["mode"] = "idle";

  canvas: Canvas = {
    width: 0,
    height: 0,
    shapes: [],
  };

  debugLog: string = "";
  private lastIdx = -1;
  private cbs: Set<() => void> = new Set();

  private mode_map: Record<
    `${CanvasCtx["mode"]}_${KeyEvent["key"]}`,
    CanvasCtx["mode"]
  > = {
    idle_alt: "select",
    idle_shift: "move",
    select_alt: "idle",
    select_shift: "move",
    move_alt: "move",
    move_shift: "idle",
  };

  handleCommand(command: AllCommands) {
    switch (command.name) {
      case "shape/new": {
        this.canvas.shapes.push({
          ...command.shape,
          id: ++this.lastIdx,
        });
        break;
      }
      case "shape/key_event": {
        this.mode =
          this.mode_map[
            (this.mode + "_" + command.key) as keyof CanvasCtxImpl["mode_map"]
          ];
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
