import {} from "@/lib/model/context";
import { AllShapes, Coordinate } from "@/lib/model/shape";
export interface Command<NAME> {
  target_id?: number;
  name: NAME;
}

export type AllCommands =
  | NewShape<AllShapes>
  | UpdateShape<AllShapes>
  | KeyEvent
  | MouseClickEvent
  | MouseDragEvent
  | UpdateZIndex;

export interface NewShape<T extends AllShapes> extends Command<"shape/new"> {
  shape: T;
}

export interface KeyEvent extends Command<"shape/key_event"> {
  key: "shift" | "alt"; //| '' | 'meta'
}

export interface MouseClickEvent extends Command<"shape/mouse_click"> {
  item_id?: number;
}

export interface MouseDragEvent extends Command<"shape/mouse_drag"> {
  delta: Coordinate;
}

export interface UpdateShape<T extends AllShapes>
  extends Command<"shape/update"> {
  shape: T;
}

export interface UpdateZIndex extends Command<"shape/z_index"> {
  item_id?: number;
  type: "+" | "-";
}
