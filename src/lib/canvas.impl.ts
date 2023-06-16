import { Canvas, CanvasCtx, KeyEvent } from "@/lib/base";
import { AllCommands, AllShapes } from "@/lib/meta";

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
  private selected: Set<AllShapes> = new Set();

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
    this.log(command);

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
      case "shape/mouse_click": {
        switch (this.mode) {
          case "select": {
            command.item_id;
            const item = this.canvas.shapes.find(
              (it) => it.id === command.item_id
            );
            if (!item) break;
            item._selected = true;
            this.selected.add(item);
            break;
          }
          case "idle": {
            this.selected.forEach((it) => (it._selected = false));
            this.selected.clear();
          }
        }
        break;
      }
      case "shape/mouse_drag": {
        switch (this.mode) {
          case "move":
            const { x, y } = command.delta;
            this.selected.forEach((it) => {
              it.pivot.x += x;
              it.pivot.y += y;
            });
        }
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

  log(str: string | object): void {
    const _str = typeof str === "string" ? str : JSON.stringify(str);
    this.debugLog = _str + "\n" + this.debugLog;
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
