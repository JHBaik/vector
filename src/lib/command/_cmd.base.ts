import { CanvasCtx } from "@/lib/model/context";
import { AllCommands } from "@/lib/model/command";

export abstract class CommandImplBase<T extends AllCommands> {
  protected cmd: T;

  constructor(cmd: T) {
    this.cmd = cmd;
  }

  abstract execute(ctx: CanvasCtx): void;
}
