import React from "react";
import ReactDOM from "react-dom";

const Component = React.Component;
const render = ReactDOM.render;
import Controls from "./controls";
import Foot from "./foot";
import Result from "./result";

class Container extends Component {
  state = {
    w: 640,
    h: 640,
    grid: {
      show: true,
      snap: true,
      size: 20
    },
    ctrl: false,
    points: [
      { x: 100, y: 300, m: true },
      { x: 200, y: 300, q: { x: 150, y: 50 } },
      { x: 300, y: 300, q: { x: 250, y: 550 } },
      { x: 400, y: 300, q: { x: 350, y: 50 } },
      {
        x: 500,
        y: 300,
        c: [
          { x: 450, y: 550 },
          { x: 450, y: 50 }
        ]
      },
      { x: 300, y: 600, m: true },
      {
        x: 600,
        y: 300,
        c: [
          { x: 550, y: 50 },
          { x: 550, y: 550 }
        ]
      },
      { x: 700, y: 300, a: { rx: 50, ry: 50, rot: 0, laf: 1, sf: 1 } }
    ],
    activePoint: 2,
    draggedPoint: false,
    draggedQuadratic: false,
    draggedCubic: false,
    closePath: false
  };

  componentWillMount() {
    document.addEventListener("keydown", this.handleKeyDown, false);
    document.addEventListener("keyup", this.handleKeyUp, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown");
    document.removeEventListener("keyup");
  }

  positiveNumber(n) {
    n = parseInt(n);
    if (isNaN(n) || n < 0) n = 0;

    return n;
  }

  setWidth = e => {
    let v = this.positiveNumber(e.target.value),
      min = 1;
    if (v < min) v = min;

    this.setState({ w: v });
  };

  setHeight = e => {
    let v = this.positiveNumber(e.target.value),
      min = 1;
    if (v < min) v = min;

    this.setState({ h: v });
  };

  setGridSize = e => {
    let grid = this.state.grid;
    let v = this.positiveNumber(e.target.value);
    let min = 1;
    let max = Math.min(this.state.w, this.state.h);

    if (v < min) v = min;
    if (v >= max) v = max / 2;

    grid.size = v;

    this.setState({ grid });
  };

  setGridSnap = e => {
    let grid = this.state.grid;
    grid.snap = e.target.checked;

    this.setState({ grid });
  };

  setGridShow = e => {
    let grid = this.state.grid;
    grid.show = e.target.checked;

    this.setState({ grid });
  };

  setClosePath = e => {
    this.setState({ closePath: e.target.checked });
  };

  getMouseCoords = e => {
    const rect = ReactDOM.findDOMNode(this.refs.svg).getBoundingClientRect();
    let x = Math.round(e.pageX - rect.left);
    let y = Math.round(e.pageY - rect.top);

    if (this.state.grid.snap) {
      x = this.state.grid.size * Math.round(x / this.state.grid.size);
      y = this.state.grid.size * Math.round(y / this.state.grid.size);
    }

    return { x, y };
  };

  setPointType = e => {
    const points = this.state.points;
    const active = this.state.activePoint;

    // not the first point
    if (active !== 0) {
      let v = e.target.value;

      switch (v) {
        case "l":
          points[active] = {
            x: points[active].x,
            y: points[active].y
          };
          break;
        case "m":
          points[active] = {
            x: points[active].x,
            y: points[active].y,
            m: true
          };
          break;
        case "q":
          points[active] = {
            x: points[active].x,
            y: points[active].y,
            q: {
              x: (points[active].x + points[active - 1].x) / 2,
              y: (points[active].y + points[active - 1].y) / 2
            }
          };
          break;
        case "c":
          points[active] = {
            x: points[active].x,
            y: points[active].y,
            c: [
              {
                x: (points[active].x + points[active - 1].x - 50) / 2,
                y: (points[active].y + points[active - 1].y) / 2
              },
              {
                x: (points[active].x + points[active - 1].x + 50) / 2,
                y: (points[active].y + points[active - 1].y) / 2
              }
            ]
          };
          break;
        case "a":
          points[active] = {
            x: points[active].x,
            y: points[active].y,
            a: {
              rx: 50,
              ry: 50,
              rot: 0,
              laf: 1,
              sf: 1
            }
          };
          break;
      }

      this.setState({ points });
    }
  };

  setPointPosition = (coord, e) => {
    let coords = this.state.points[this.state.activePoint];
    let v = this.positiveNumber(e.target.value);

    if (coord === "x" && v > this.state.w) v = this.state.w;
    if (coord === "y" && v > this.state.h) v = this.state.h;

    coords[coord] = v;

    this.setPointCoords(coords);
  };

  setQuadraticPosition = (coord, e) => {
    let coords = this.state.points[this.state.activePoint].q;
    let v = this.positiveNumber(e.target.value);

    if (coord === "x" && v > this.state.w) v = this.state.w;
    if (coord === "y" && v > this.state.h) v = this.state.h;

    coords[coord] = v;

    this.setQuadraticCoords(coords);
  };

  setCubicPosition = (coord, anchor, e) => {
    let coords = this.state.points[this.state.activePoint].c[anchor];
    let v = this.positiveNumber(e.target.value);

    if (coord === "x" && v > this.state.w) v = this.state.w;
    if (coord === "y" && v > this.state.h) v = this.state.h;

    coords[coord] = v;

    this.setCubicCoords(coords, anchor);
  };

  setPointCoords = coords => {
    const points = this.state.points;
    const active = this.state.activePoint;

    points[active].x = coords.x;
    points[active].y = coords.y;

    this.setState({ points });
  };

  setQuadraticCoords = coords => {
    const points = this.state.points;
    const active = this.state.activePoint;

    points[active].q.x = coords.x;
    points[active].q.y = coords.y;

    this.setState({ points });
  };

  setArcParam = (param, e) => {
    const points = this.state.points;
    const active = this.state.activePoint;
    let v;

    if (["laf", "sf"].indexOf(param) > -1) {
      v = e.target.checked ? 1 : 0;
    } else {
      v = this.positiveNumber(e.target.value);
    }

    points[active].a[param] = v;

    this.setState({ points });
  };

  setCubicCoords = (coords, anchor) => {
    const points = this.state.points;
    const active = this.state.activePoint;

    points[active].c[anchor].x = coords.x;
    points[active].c[anchor].y = coords.y;

    this.setState({ points });
  };

  setDraggedPoint = index => {
    if (!this.state.ctrl) {
      this.setState({
        activePoint: index,
        draggedPoint: true
      });
    }
  };

  setDraggedQuadratic = index => {
    if (!this.state.ctrl) {
      this.setState({
        activePoint: index,
        draggedQuadratic: true
      });
    }
  };

  setDraggedCubic = (index, anchor) => {
    if (!this.state.ctrl) {
      this.setState({
        activePoint: index,
        draggedCubic: anchor
      });
    }
  };

  cancelDragging = e => {
    this.setState({
      draggedPoint: false,
      draggedQuadratic: false,
      draggedCubic: false
    });
  };

  addPoint = e => {
    if (this.state.ctrl) {
      let coords = this.getMouseCoords(e);
      let points = this.state.points;

      points.push(coords);

      this.setState({
        points,
        activePoint: points.length - 1
      });
    }
  };

  removeActivePoint = e => {
    let points = this.state.points;
    let active = this.state.activePoint;

    if (points.length > 1 && active !== 0) {
      points.splice(active, 1);

      this.setState({
        points,
        activePoint: points.length - 1
      });
    }
  };

  handleMouseMove = e => {
    if (!this.state.ctrl) {
      if (this.state.draggedPoint) {
        this.setPointCoords(this.getMouseCoords(e));
      } else if (this.state.draggedQuadratic) {
        this.setQuadraticCoords(this.getMouseCoords(e));
      } else if (this.state.draggedCubic !== false) {
        this.setCubicCoords(this.getMouseCoords(e), this.state.draggedCubic);
      }
    }
  };

  handleKeyDown = e => {
    if (e.ctrlKey) this.setState({ ctrl: true });
  };

  handleKeyUp = e => {
    if (!e.ctrlKey) this.setState({ ctrl: false });
  };

  generatePath() {
    let { points, closePath } = this.state;
    let d = "";

    points.forEach((p, i) => {
      if (i === 0 || p.m) {
        // first point
        d += "M ";
      } else if (p.q) {
        // quadratic
        d += `Q ${p.q.x} ${p.q.y} `;
      } else if (p.c) {
        // cubic
        d += `C ${p.c[0].x} ${p.c[0].y} ${p.c[1].x} ${p.c[1].y} `;
      } else if (p.a) {
        // arc
        d += `A ${p.a.rx} ${p.a.ry} ${p.a.rot} ${p.a.laf} ${p.a.sf} `;
      } else {
        d += "L ";
      }

      d += `${p.x} ${p.y} `;
    });

    if (closePath) d += "Z";

    return d;
  }

  reset = e => {
    let w = this.state.w,
      h = this.state.h;

    this.setState({
      points: [{ x: w / 2, y: h / 2 }],
      activePoint: 0
    });
  };

  render() {
    return (
      <div className="ad-Container" onMouseUp={this.cancelDragging}>
        <div className="ad-Container-main">
          <div className="ad-Container-svg">
            <SVG
              ref="svg"
              path={this.generatePath()}
              {...this.state}
              addPoint={this.addPoint}
              setDraggedPoint={this.setDraggedPoint}
              setDraggedQuadratic={this.setDraggedQuadratic}
              setDraggedCubic={this.setDraggedCubic}
              handleMouseMove={this.handleMouseMove}
            />
          </div>
          <Foot />
        </div>

        <div className="ad-Container-controls">
          <Controls
            {...this.state}
            reset={this.reset}
            removeActivePoint={this.removeActivePoint}
            setPointPosition={this.setPointPosition}
            setQuadraticPosition={this.setQuadraticPosition}
            setCubicPosition={this.setCubicPosition}
            setArcParam={this.setArcParam}
            setPointType={this.setPointType}
            setWidth={this.setWidth}
            setHeight={this.setHeight}
            setGridSize={this.setGridSize}
            setGridSnap={this.setGridSnap}
            setGridShow={this.setGridShow}
            setClosePath={this.setClosePath}
          />
          <Result path={this.generatePath()} />
        </div>
      </div>
    );
  }
}

/**
 * SVG rendering
 */

class SVG extends Component {
  render() {
    const {
      path,
      w,
      h,
      grid,
      points,
      activePoint,
      addPoint,
      handleMouseMove,
      setDraggedPoint,
      setDraggedQuadratic,
      setDraggedCubic
    } = this.props;

    let circles = points.map((p, i, a) => {
      let anchors = [];

      if (p.q) {
        anchors.push(
          <Quadratic
            index={i}
            p1x={a[i - 1].x}
            p1y={a[i - 1].y}
            p2x={p.x}
            p2y={p.y}
            x={p.q.x}
            y={p.q.y}
            setDraggedQuadratic={setDraggedQuadratic}
          />
        );
      } else if (p.c) {
        anchors.push(
          <Cubic
            index={i}
            p1x={a[i - 1].x}
            p1y={a[i - 1].y}
            p2x={p.x}
            p2y={p.y}
            x1={p.c[0].x}
            y1={p.c[0].y}
            x2={p.c[1].x}
            y2={p.c[1].y}
            setDraggedCubic={setDraggedCubic}
          />
        );
      }

      return (
        <g
          className={
            "ad-PointGroup" +
            (i === 0 ? "  ad-PointGroup--first" : "") +
            (activePoint === i ? "  is-active" : "")
          }
        >
          <Point index={i} x={p.x} y={p.y} setDraggedPoint={setDraggedPoint} />
          {anchors}
        </g>
      );
    });

    return (
      <svg
        className="ad-SVG"
        width={w}
        height={h}
        onClick={e => addPoint(e)}
        onMouseMove={e => handleMouseMove(e)}
      >
        <Grid w={w} h={h} grid={grid} />
        <path className="ad-Path" d={path} />
        <g className="ad-Points">{circles}</g>
      </svg>
    );
  }
}

function Cubic(props) {
  return (
    <g className="ad-Anchor">
      <line
        className="ad-Anchor-line"
        x1={props.p1x}
        y1={props.p1y}
        x2={props.x1}
        y2={props.y1}
      />
      <line
        className="ad-Anchor-line"
        x1={props.p2x}
        y1={props.p2y}
        x2={props.x2}
        y2={props.y2}
      />
      <circle
        className="ad-Anchor-point"
        onMouseDown={e => props.setDraggedCubic(props.index, 0)}
        cx={props.x1}
        cy={props.y1}
        r={6}
      />
      <circle
        className="ad-Anchor-point"
        onMouseDown={e => props.setDraggedCubic(props.index, 1)}
        cx={props.x2}
        cy={props.y2}
        r={6}
      />
    </g>
  );
}

function Quadratic(props) {
  return (
    <g className="ad-Anchor">
      <line
        className="ad-Anchor-line"
        x1={props.p1x}
        y1={props.p1y}
        x2={props.x}
        y2={props.y}
      />
      <line
        className="ad-Anchor-line"
        x1={props.x}
        y1={props.y}
        x2={props.p2x}
        y2={props.p2y}
      />
      <circle
        className="ad-Anchor-point"
        onMouseDown={e => props.setDraggedQuadratic(props.index)}
        cx={props.x}
        cy={props.y}
        r={6}
      />
    </g>
  );
}

function Point(props) {
  return (
    <circle
      className="ad-Point"
      onMouseDown={e => props.setDraggedPoint(props.index)}
      cx={props.x}
      cy={props.y}
      r={8}
    />
  );
}

function Grid(props) {
  const { show, snap, size } = props.grid;

  let grid = [];

  for (let i = 1; i < props.w / size; i++) {
    grid.push(<line x1={i * size} y1={0} x2={i * size} y2={props.h} />);
  }

  for (let i = 1; i < props.h / size; i++) {
    grid.push(<line x1={0} y1={i * size} x2={props.w} y2={i * size} />);
  }

  return <g className={"ad-Grid" + (!show ? "  is-hidden" : "")}>{grid}</g>;
}

render(<Container />, document.querySelector("#app"));
