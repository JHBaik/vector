'use client';

import styles from './page.module.css';
import React, { useEffect, useMemo, useRef, useState, WheelEvent } from 'react';
import * as paper from 'paper';
import { PaperScope } from 'paper';

function Canvas({
                  pScope,
                  ...props
                }: {
  pScope: paper.PaperScope,
} & React.CanvasHTMLAttributes<HTMLCanvasElement>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  console.log('canvas render');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    console.log({x: pScope});
    console.log('setup pp');
    pScope.setup(canvas);

    const savedData = localStorage.getItem('DATA');
    savedData && pScope.project.importJSON(savedData);
  }, [pScope, canvasRef]);

  return (
    <canvas ref={canvasRef} {...props}>
    </canvas>
  );
}

export default function Home() {
  const paper = useMemo(() =>
      new PaperScope()
    , []);

  useEffect(() => {
    let id = setInterval(() => {
      console.log('SAVE');
      localStorage.setItem('DATA', paper.project.exportJSON());
    }, 5000);

    return () => {
      clearInterval(id);
    };
  }, [paper]);

  const tCursor = useMemo(() => new paper.Tool(), [paper]);
  const tCircle = useMemo(() => new paper.Tool(), [paper]);
  const tRectangle = useMemo(() => new paper.Tool(), [paper]);
  const tLine = useMemo(() => new paper.Tool(), [paper]);

  useEffect(() => {
    tCursor.activate();
  }, [tCursor, paper]);

  const [strokeColor, setStrokeColor] = useState(new paper.Color(0, 0, 0) as paper.Color);
  const [fillColor, setFillColor] = useState(new paper.Color(0, 0, 0) as paper.Color);

  function activateCursor() {
    tCursor.activate();

    const state = {
      meta: false,
      mouseDragging: false,
    };

    tCursor.onKeyDown = (e: paper.KeyEvent) => {
      if (e.key === 'meta') {
        state.meta = true;
      }
    };

    tCursor.onKeyUp = (e: paper.KeyEvent) => {
      if (e.key === 'meta') {
        state.meta = false;
      }
    };

    tCursor.onMouseUp = (e: paper.ToolEvent) => {
      if (!state.mouseDragging) {
        let selectedItem = e.item;

        if (!state.meta) {
          paper.project.deselectAll();
        }
        if (selectedItem) {
          selectedItem.selected = true;
        }
      }
      state.mouseDragging = false;
    };
    tCursor.onMouseDrag = (e: paper.ToolEvent) => {
      state.mouseDragging = true;
      paper.project.selectedItems.forEach(it => it.position = it.position.add(e.delta));
    };
  }

  function addCircle() {
    tCircle.activate();

    function emptyCircle() {
      const circle = new paper.Shape.Circle([0, 0], 0);
      circle.strokeColor = strokeColor;
      circle.fillColor = fillColor;
      return circle;
    }

    let circle = emptyCircle();

    tCircle.onMouseDown = (e: paper.ToolEvent) => {
      circle.bounds.center = e.downPoint;
    };

    tCircle.onMouseDrag = (e: paper.ToolEvent) => {
      circle.radius = e.downPoint.subtract(e.point).abs().length;
    };

    tCircle.onMouseUp = () => {
      if (circle.radius !== 0) {
        circle = emptyCircle();
      }
    };
  }

  function addRectangle() {
    tRectangle.activate();

    let rect = new paper.Shape.Rectangle([0, 0, 0, 0]);
    rect.strokeColor = strokeColor;
    rect.fillColor = fillColor;

    tRectangle.onMouseDown = (e: paper.ToolEvent) => {
      rect.bounds.topLeft = e.downPoint;
    };

    tRectangle.onMouseDrag = (e: paper.ToolEvent) => {
      let delta = e.downPoint.subtract(e.point);
      rect.size = new paper.Size(delta.abs());
      switch (delta.quadrant) {
        case 1:
          rect.bounds.bottomRight = e.downPoint;
          break;
        case 2:
          rect.bounds.bottomLeft = e.downPoint;
          break;
        case 3:
          rect.bounds.topLeft = e.downPoint;
          break;
        case 4:
          rect.bounds.topRight = e.downPoint;
          break;
      }
    };

    tRectangle.onMouseUp = () => {
      rect = new paper.Shape.Rectangle([0, 0, 0, 0]);
      rect.strokeColor = strokeColor;
      rect.fillColor = fillColor;
    };
  }

  function addLine() {
    tLine.activate();
    let line: paper.Path = new paper.Path();
    line.strokeColor = new paper.Color(255, 0, 0);

    tLine.onMouseDown = (e: paper.ToolEvent) => {
      line.moveTo(e.point);
    };

    tLine.onMouseDrag = (e: paper.ToolEvent) => {
      line.lineTo(e.point);
    };

    tLine.onMouseUp = (e: paper.ToolEvent) => {
      line = new paper.Path();
      line.strokeColor = new paper.Color(255, 0, 0);
    };
  }

  function onMouseWheel(event: WheelEvent<HTMLCanvasElement>) {
    var newZoom = paper.view.zoom;
    var oldZoom = paper.view.zoom;
    if (event.deltaY > 0) {
      console.log('zoom -');
      newZoom = paper.view.zoom * 0.98;
    } else {
      console.log('zoom +');
      newZoom = paper.view.zoom * 1.02;
    }

    var beta = oldZoom / newZoom;
    const {x, y} = (event.target as HTMLCanvasElement).getBoundingClientRect();
    var mousePosition = (new paper.Point(event.clientX, event.clientY)).subtract([x, y]);

    //viewToProject: gives the coordinates in the Project space from the Screen Coordinates
    var viewPosition = paper.view.viewToProject(mousePosition);

    var mpos = viewPosition;
    var ctr = paper.view.center;

    var pc = mpos.subtract(ctr);
    var offset = mpos.subtract(pc.multiply(beta)).subtract(ctr);

    paper.view.zoom = newZoom;
    paper.view.center = paper.view.center.add(offset);

    // event.preventDefault();
  }

  return (
    <main className={styles.main}>
      <div>
        <button onClick={() => activateCursor()}>Selection</button>
        <span>Add obj</span>
        <ul>
          <li>
            <button onClick={() => addCircle()}>Circle</button>
          </li>
          <li>
            <button onClick={() => addRectangle()}>Rectangle</button>
          </li>
          <li>
            <button onClick={() => addLine()}>Line</button>
          </li>
        </ul>
      </div>
      <Canvas
        pScope={paper}
        height={600} width={900} style={{background: 'white'}}
        onWheel={onMouseWheel}
      ></Canvas>
    </main>
  );
}
