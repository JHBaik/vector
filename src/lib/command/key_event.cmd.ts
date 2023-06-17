import { CanvasCtx, KeyEvent, mode_map } from "@/lib/model/context";
import { CommandImplBase } from "@/lib/command/_cmd.base";

export class KeyEventImpl extends CommandImplBase<KeyEvent> {
  execute(ctx: CanvasCtx): void {
    const key = (ctx.mode + "_" + this.cmd.key) as keyof typeof mode_map;
    ctx.mode = mode_map[key];
  }
}
