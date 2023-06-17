import { Canvas, CanvasCtx, KeyEvent } from "@/lib/base";
import { AllCommands, AllShapes } from "@/lib/meta";
import { CommandImplBase } from "@/lib/command/command_impl.base";
import { UpdateZIndexImpl } from "@/lib/command/update_z_index_impl";
import { UpdateShapeImpl } from "@/lib/command/update_shape_impl";
import { MouseDragEventImpl } from "@/lib/command/mouse_drag_event_impl";
import { MouseClickEventImpl } from "@/lib/command/mouse_click_event_impl";
import { KeyEventImpl } from "@/lib/command/key_event_impl";
import { NewShapeImpl } from "@/lib/command/new_shape_impl";

export class CanvasCtxImpl implements CanvasCtx {
  mode: CanvasCtx["mode"] = "idle";

  canvas: Canvas = {
    width: 0,
    height: 0,
    shapes: [],
  };

  debugLog: string = "";
  selected: Set<AllShapes> = new Set();
  // TODO make infra
  mode_map: Record<
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
  private lastIdx = -1;
  private cbs: Set<() => void> = new Set();

  newItemId(): number {
    return ++this.lastIdx;
  }

  handleCommand(command: AllCommands) {
    this.log(command);

    let cmd: CommandImplBase<AllCommands>;

    switch (command.name) {
      case "shape/new":
        cmd = new NewShapeImpl(command);
        break;
      case "shape/key_event": {
        cmd = new KeyEventImpl(command);
        break;
      }
      case "shape/mouse_click": {
        cmd = new MouseClickEventImpl(command);
        break;
      }
      case "shape/mouse_drag": {
        cmd = new MouseDragEventImpl(command);
        break;
      }
      case "shape/update": {
        cmd = new UpdateShapeImpl(command);
        break;
      }
      case "shape/z_index": {
        cmd = new UpdateZIndexImpl(command);
        break;
      }
    }

    cmd.execute(this);

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
    console.log(this.cbs);
    this.cbs.forEach((it) => it());
  }
}

let SINGLETON: CanvasCtx | undefined;

export const getCanvasCtx: () => CanvasCtx = () => {
  return SINGLETON ? SINGLETON : (SINGLETON = new CanvasCtxImpl());
};
