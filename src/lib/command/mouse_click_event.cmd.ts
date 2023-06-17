import { CanvasCtx, MouseClickEvent } from "@/lib/model/context";
import { CommandImplBase } from "@/lib/command/_cmd.base";

export class MouseClickEventImpl extends CommandImplBase<MouseClickEvent> {
  execute(ctx: CanvasCtx): void {
    switch (ctx.mode) {
      case "select": {
        this.cmd.item_id;
        const item = ctx.canvas.shapes.find((it) => it.id === this.cmd.item_id);
        if (!item) break;
        item._selected = true;
        ctx.selected.add(item);
        break;
      }
      case "idle": {
        ctx.selected.forEach((it) => (it._selected = false));
        ctx.selected.clear();
      }
    }
  }
}
