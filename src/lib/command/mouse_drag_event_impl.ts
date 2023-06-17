import { CanvasCtx, MouseDragEvent } from "@/lib/base";
import { CommandImplBase } from "@/lib/command/command_impl.base";

export class MouseDragEventImpl extends CommandImplBase<MouseDragEvent> {
  execute(ctx: CanvasCtx): void {
    switch (ctx.mode) {
      case "move":
        const { x, y } = this.cmd.delta;
        ctx.selected.forEach((it) => {
          it.pivot.x += x;
          it.pivot.y += y;
        });
    }
  }
}
