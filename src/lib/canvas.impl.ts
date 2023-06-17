import { CanvasCtx } from "@/lib/model/context";
import { CommandImplBase } from "@/lib/command/_cmd.base";
import { commandFactory } from "@/lib/commandFactory";
import { AllCommands } from "@/lib/model/command";
import { AllShapes } from "@/lib/model/shape";
import { Canvas } from "@/lib/model/canvas";

export class CanvasCtxImpl implements CanvasCtx {
  mode: CanvasCtx["mode"] = "idle";

  canvas: Canvas = {
    width: 0,
    height: 0,
    shapes: [],
  };

  debugLog: string = "";
  selected: Set<AllShapes> = new Set();
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
