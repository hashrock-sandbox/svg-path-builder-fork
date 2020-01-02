import React from "react";

/**
 * Controls
 */
import Control from "./ui";

export default function Controls(props) {
  const active = props.points[props.activePoint];
  const step = props.grid.snap ? props.grid.size : 1;

  let params = [];

  if (active.q) {
    params.push(
      <div className="ad-Controls-container">
        <Control
          name="Control point X position"
          type="range"
          min={0}
          max={props.w}
          step={step}
          value={active.q.x}
          onChange={e => props.setQuadraticPosition("x", e)}
        />
      </div>
    );
    params.push(
      <div className="ad-Controls-container">
        <Control
          name="Control point Y position"
          type="range"
          min={0}
          max={props.h}
          step={step}
          value={active.q.y}
          onChange={e => props.setQuadraticPosition("y", e)}
        />
      </div>
    );
  } else if (active.c) {
    params.push(
      <div className="ad-Controls-container">
        <Control
          name="First control point X position"
          type="range"
          min={0}
          max={props.w}
          step={step}
          value={active.c[0].x}
          onChange={e => props.setCubicPosition("x", 0, e)}
        />
      </div>
    );
    params.push(
      <div className="ad-Controls-container">
        <Control
          name="First control point Y position"
          type="range"
          min={0}
          max={props.h}
          step={step}
          value={active.c[0].y}
          onChange={e => props.setCubicPosition("y", 0, e)}
        />
      </div>
    );
    params.push(
      <div className="ad-Controls-container">
        <Control
          name="Second control point X position"
          type="range"
          min={0}
          max={props.w}
          step={step}
          value={active.c[1].x}
          onChange={e => props.setCubicPosition("x", 1, e)}
        />
      </div>
    );
    params.push(
      <div className="ad-Controls-container">
        <Control
          name="Second control point Y position"
          type="range"
          min={0}
          max={props.h}
          step={step}
          value={active.c[1].y}
          onChange={e => props.setCubicPosition("y", 1, e)}
        />
      </div>
    );
  } else if (active.a) {
    params.push(
      <div className="ad-Controls-container">
        <Control
          name="X Radius"
          type="range"
          min={0}
          max={props.w}
          step={step}
          value={active.a.rx}
          onChange={e => props.setArcParam("rx", e)}
        />
      </div>
    );
    params.push(
      <div className="ad-Controls-container">
        <Control
          name="Y Radius"
          type="range"
          min={0}
          max={props.h}
          step={step}
          value={active.a.ry}
          onChange={e => props.setArcParam("ry", e)}
        />
      </div>
    );
    params.push(
      <div className="ad-Controls-container">
        <Control
          name="Rotation"
          type="range"
          min={0}
          max={360}
          step={1}
          value={active.a.rot}
          onChange={e => props.setArcParam("rot", e)}
        />
      </div>
    );
    params.push(
      <div className="ad-Controls-container">
        <Control
          name="Large arc sweep flag"
          type="checkbox"
          checked={active.a.laf}
          onChange={e => props.setArcParam("laf", e)}
        />
      </div>
    );
    params.push(
      <div className="ad-Controls-container">
        <Control
          name="Sweep flag"
          type="checkbox"
          checked={active.a.sf}
          onChange={e => props.setArcParam("sf", e)}
        />
      </div>
    );
  }

  return (
    <div className="ad-Controls">
      <h3 className="ad-Controls-title">Parameters</h3>

      <div className="ad-Controls-container">
        <Control
          name="Width"
          type="text"
          value={props.w}
          onChange={e => props.setWidth(e)}
        />
        <Control
          name="Height"
          type="text"
          value={props.h}
          onChange={e => props.setHeight(e)}
        />
        <Control
          name="Close path"
          type="checkbox"
          value={props.closePath}
          onChange={e => props.setClosePath(e)}
        />
      </div>
      <div className="ad-Controls-container">
        <Control
          name="Grid size"
          type="text"
          value={props.grid.size}
          onChange={e => props.setGridSize(e)}
        />
        <Control
          name="Snap grid"
          type="checkbox"
          checked={props.grid.snap}
          onChange={e => props.setGridSnap(e)}
        />
        <Control
          name="Show grid"
          type="checkbox"
          checked={props.grid.show}
          onChange={e => props.setGridShow(e)}
        />
      </div>
      <div className="ad-Controls-container">
        <Control
          type="button"
          action="reset"
          value="Reset path"
          onClick={e => props.reset(e)}
        />
      </div>

      <h3 className="ad-Controls-title">Selected point</h3>

      {props.activePoint !== 0 && (
        <div className="ad-Controls-container">
          <Control
            name="Point type"
            type="choices"
            id="pointType"
            choices={[
              {
                name: "L",
                value: "l",
                checked: !active.q && !active.c && !active.a
              },
              { name: "Q", value: "q", checked: !!active.q },
              { name: "C", value: "c", checked: !!active.c },
              { name: "A", value: "a", checked: !!active.a }
            ]}
            onChange={e => props.setPointType(e)}
          />
        </div>
      )}
      <div className="ad-Controls-container">
        <Control
          name="Point X position"
          type="range"
          min={0}
          max={props.w}
          step={step}
          value={active.x}
          onChange={e => props.setPointPosition("x", e)}
        />
      </div>
      <div className="ad-Controls-container">
        <Control
          name="Point Y position"
          type="range"
          min={0}
          max={props.h}
          step={step}
          value={active.y}
          onChange={e => props.setPointPosition("y", e)}
        />
      </div>

      {params}

      {props.activePoint !== 0 && (
        <div className="ad-Controls-container">
          <Control
            type="button"
            action="delete"
            value="Remove this point"
            onClick={e => props.removeActivePoint(e)}
          />
        </div>
      )}
    </div>
  );
}
