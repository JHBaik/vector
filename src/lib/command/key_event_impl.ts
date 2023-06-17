import { CanvasCtx, KeyEvent } from "@/lib/base";
import { CanvasCtxImpl } from "@/lib/canvas.impl";
import { CommandImplBase } from "@/lib/command/command_impl.base";

export class KeyEventImpl extends CommandImplBase<KeyEvent> {
  execute(ctx: CanvasCtx): void {
    ctx.mode =
      ctx.mode_map[
        (ctx.mode + "_" + this.cmd.key) as keyof CanvasCtxImpl["mode_map"]
      ];
  }
}
