import { NewShapeImpl } from "@/lib/command/new_shape_impl";
import { KeyEventImpl } from "@/lib/command/key_event_impl";
import { MouseClickEventImpl } from "@/lib/command/mouse_click_event_impl";
import { MouseDragEventImpl } from "@/lib/command/mouse_drag_event_impl";
import { UpdateShapeImpl } from "@/lib/command/update_shape_impl";
import { UpdateZIndexImpl } from "@/lib/command/update_z_index_impl";
import { AllCommands } from "@/lib/meta";

export function commandFactory(command: AllCommands) {
  switch (command.name) {
    case "shape/new":
      return new NewShapeImpl(command);
    case "shape/key_event": {
      return new KeyEventImpl(command);
    }
    case "shape/mouse_click": {
      return new MouseClickEventImpl(command);
    }
    case "shape/mouse_drag": {
      return new MouseDragEventImpl(command);
    }
    case "shape/update": {
      return new UpdateShapeImpl(command);
    }
    case "shape/z_index": {
      return new UpdateZIndexImpl(command);
    }
  }
}
