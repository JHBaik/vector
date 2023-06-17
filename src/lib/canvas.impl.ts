import { Canvas, CanvasCtx, KeyEvent } from "@/lib/domain";
import { AllCommands, AllShapes } from "@/lib/meta";
import { CommandImplBase } from "@/lib/cmd.base";
import { UpdateZIndexImpl } from "@/lib/command/update_z_index.cmd";
import { UpdateShapeImpl } from "@/lib/command/update_shape.cmd";
import { MouseDragEventImpl } from "@/lib/command/mouse_drag_event.cmd";
import { MouseClickEventImpl } from "@/lib/command/mouse_click_event.cmd";
import { KeyEventImpl } from "@/lib/command/key_event.cmd";
import { NewShapeImpl } from "@/lib/command/new_shape.cmd";
import { commandFactory } from "@/lib/commandFactory";

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

    const cmd: CommandImplBase<AllCommands> = commandFactory(command);

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
