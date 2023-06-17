import { AllCommands } from "@/lib/meta";
import { CanvasCtx } from "@/lib/domain";

export abstract class CommandImplBase<T extends AllCommands> {
  protected cmd: T;

  constructor(cmd: T) {
    this.cmd = cmd;
  }

  abstract execute(ctx: CanvasCtx): void;
}
