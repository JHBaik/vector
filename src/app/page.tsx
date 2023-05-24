'use client';
import styles from './page.module.css';
import React, { useEffect, useMemo, useRef, useState, WheelEvent } from 'react';
import type * as paper from 'paper';
import { SketchPicker } from 'react-color';
import { SafeHydrate } from '@/util/safeh';
import dynamic from 'next/dynamic';
import NoSSR from 'react-no-ssr';

function Canvas({
                  pScope,
                  ...props
                }: {
  pScope: paper.PaperScope|undefined,
} & React.CanvasHTMLAttributes<HTMLCanvasElement>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  console.log('canvas render');

  useEffect(() => {

    if(!pScope)return;

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

function Home() {
  const [pScope, setPScope] = useState<paper.PaperScope>();

  useEffect(() => {
    (async ()=>{
      if(pScope)return;
      const paper = await import('paper');
      setPScope(new paper.PaperScope());
    })();

    return () => {};
  }, [pScope]);

  useEffect(() => {
    let id = setInterval(() => {
      if(!pScope)return;
      localStorage.setItem('DATA', pScope.project.exportJSON());
    }, 5000);

    return () => {
      clearInterval(id);
    };
  }, [pScope]);

  const tCursor = useMemo(() => {if(!pScope)return;return new pScope.Tool();}, [pScope]);
  const tCircle = useMemo(() => {if(!pScope)return;return new pScope.Tool();}, [pScope]);
  const tRectangle = useMemo(() => {if(!pScope)return;return new pScope.Tool();}, [pScope]);
  const tLine = useMemo(() => {if(!pScope)return;return new pScope.Tool();}, [pScope]);

  useEffect(() => {
    if(!pScope||!tCursor)return;
    tCursor.activate();
  }, [tCursor, pScope]);

  const [strokeColor, setStrokeColor] = useState('#000000');
  const [fillColor, setFillColor] = useState('#000000');
  const [singleObjSelected, setSingleObjSelected] = useState(false);
  const [selectedObj, setSelectedObj] = useState<paper.Item | null>(null);

  function activateCursor() {if(!pScope||!tCursor)return;
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
          pScope.project.deselectAll();
        }

        if (selectedItem) {
          selectedItem.selected = true;
          setSelectedObj(selectedItem);
        }

        setSingleObjSelected(pScope.project.selectedItems.length === 1);
      }
      state.mouseDragging = false;
    };
    tCursor.onMouseDrag = (e: paper.ToolEvent) => {
      state.mouseDragging = true;
      pScope.project.selectedItems.forEach(it => it.position = it.position.add(e.delta));
    };
  }

  function addCircle() {
    if(!pScope||!tCircle)return;
    tCircle.activate();

    function emptyCircle() {
      if(!pScope||!tCircle)return;
      const circle = new pScope.Shape.Circle([0, 0], 0);
      circle.strokeColor = new pScope.Color(strokeColor);
      circle.fillColor = new pScope.Color(fillColor);
      return circle;
    }

    let circle = emptyCircle();

    tCircle.onMouseDown = (e: paper.ToolEvent) => {
      circle!!.bounds.center = e.downPoint;
    };

    tCircle.onMouseDrag = (e: paper.ToolEvent) => {
      circle!!.radius = e.downPoint.subtract(e.point).abs().length;
    };

    tCircle.onMouseUp = () => {
      if (circle!!.radius !== 0) {
        circle = emptyCircle();
      }
    };
  }

  function addRectangle() {
    if(!pScope||!tRectangle)return;
    tRectangle.activate();

    let rect = new pScope.Shape.Rectangle([0, 0, 0, 0]);
    rect.strokeColor = new pScope.Color(strokeColor);
    rect.fillColor = new pScope.Color(fillColor);

    tRectangle.onMouseDown = (e: paper.ToolEvent) => {
      rect.bounds.topLeft = e.downPoint;
    };

    tRectangle.onMouseDrag = (e: paper.ToolEvent) => {
      let delta = e.downPoint.subtract(e.point);
      rect.size = new pScope.Size(delta.abs());
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
      rect = new pScope.Shape.Rectangle([0, 0, 0, 0]);
      rect.strokeColor = new pScope.Color(strokeColor);
      rect.fillColor = new pScope.Color(fillColor);
    };
  }

  function addLine() {
    if(!pScope||!tLine)return;
    tLine.activate();
    let line: paper.Path = new pScope.Path();
    line.strokeColor = new pScope.Color(255, 0, 0);

    tLine.onMouseDown = (e: paper.ToolEvent) => {
      line.moveTo(e.point);
    };

    tLine.onMouseDrag = (e: paper.ToolEvent) => {
      line.lineTo(e.point);
    };

    tLine.onMouseUp = (e: paper.ToolEvent) => {
      line = new pScope.Path();
      line.strokeColor = new pScope.Color(255, 0, 0);
    };
  }

  function onMouseWheel(event: WheelEvent<HTMLCanvasElement>) {
    if(!pScope||!tCircle)return;

    var newZoom = pScope.view.zoom;
    var oldZoom = pScope.view.zoom;
    if (event.deltaY > 0) {
      console.log('zoom -');
      newZoom = pScope.view.zoom * 0.98;
    } else {
      console.log('zoom +');
      newZoom = pScope.view.zoom * 1.02;
    }

    var beta = oldZoom / newZoom;
    const {x, y} = (event.target as HTMLCanvasElement).getBoundingClientRect();
    var mousePosition = (new pScope.Point(event.clientX, event.clientY)).subtract([x, y]);

    //viewToProject: gives the coordinates in the Project space from the Screen Coordinates
    var viewPosition = pScope.view.viewToProject(mousePosition);

    var mpos = viewPosition;
    var ctr = pScope.view.center;

    var pc = mpos.subtract(ctr);
    var offset = mpos.subtract(pc.multiply(beta)).subtract(ctr);

    pScope.view.zoom = newZoom;
    pScope.view.center = pScope.view.center.add(offset);

    // event.preventDefault();
  }

  function onChangeProp(json: string) {
    if (!selectedObj) return;
    setSelectedObj(selectedObj.importJSON(json));
  }

  function toBack() {
    selectedObj && selectedObj.sendToBack();
  }

  function toFront() {
    selectedObj && selectedObj.bringToFront();
  }

  return (
    <main className={styles.main}>
      <div className={styles.ctrlPanel}>
        <span>Z-Index</span>
        <ul>
          <li>
            <button onClick={toFront}>Bring to top</button>
          </li>
          <li>
            <button onClick={toBack}>Send to back</button>
          </li>
        </ul>
        <button></button>
        <br/>
        <button onClick={() => activateCursor()}>Selection</button>
        <br/>
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
        <span>Color</span>
        <span>Stroke Color <div className={styles.selectedColor}
                                style={{backgroundColor: strokeColor}}/></span><br/>

        <span>Fill Color<div className={styles.selectedColor} style={{backgroundColor: fillColor}}/></span>

        <SketchPicker
          color={fillColor}
          onChangeComplete={color => {
            if(!pScope||!tCircle)return;
            setFillColor(color.hex);
          }}
        />

        {singleObjSelected && selectedObj &&
            <textarea
                value={
                  (singleObjSelected && selectedObj) ?
                    JSON.stringify(selectedObj.exportJSON({asString: false}), null, 2) : ''
                }
                onChange={e => onChangeProp(e.target.value)}
            />}
      </div>
      <div>
        <Canvas
          pScope={pScope}
          height={600} width={900} style={{background: 'white'}}
          onWheel={onMouseWheel}
        ></Canvas>
      </div>
    </main>
  );
}

function SafeHome() {
  return (
    <NoSSR>
      <SafeHydrate><Home/></SafeHydrate>
    </NoSSR>
  );
}


export default dynamic(() => Promise.resolve(SafeHome), {
  ssr: false
})

export function generateStaticParams() {
  return []
}
