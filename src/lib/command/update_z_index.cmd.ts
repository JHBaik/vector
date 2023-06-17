import { CanvasCtx, UpdateZIndex } from "@/lib/model/context";
import { CommandImplBase } from "@/lib/command/_cmd.base";

export class UpdateZIndexImpl extends CommandImplBase<UpdateZIndex> {
  execute(ctx: CanvasCtx): void {
    const idx = ctx.canvas.shapes.findIndex((it) => it.id === this.cmd.item_id);
    if (idx === -1) return;
    const item = ctx.canvas.shapes.splice(idx, 1);
    const targetIdx =
      this.cmd.type === "+"
        ? ctx.canvas.shapes.length // to top
        : 0; // to bottom
    ctx.canvas.shapes.splice(targetIdx, 0, item[0]);
  }
}
