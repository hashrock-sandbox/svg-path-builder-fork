import React from "react";
import ReactDOM from "react-dom";

const Component = React.Component;
const render = ReactDOM.render;

export default function Control(props) {
  const { name, type, ..._props } = props;

  let control = "",
    label = "";

  switch (type) {
    case "range":
      control = <Range {..._props} />;
      break;
    case "text":
      control = <Text {..._props} />;
      break;
    case "checkbox":
      control = <Checkbox {..._props} />;
      break;
    case "button":
      control = <Button {..._props} />;
      break;
    case "choices":
      control = <Choices {..._props} />;
      break;
  }

  if (name) {
    label = <label className="ad-Control-label">{name}</label>;
  }

  return (
    <div className="ad-Control">
      {label}
      {control}
    </div>
  );
}

function Choices(props) {
  let choices = props.choices.map((c, i) => {
    return (
      <label className="ad-Choice">
        <input
          className="ad-Choice-input"
          type="radio"
          value={c.value}
          checked={c.checked}
          name={props.id}
          onChange={props.onChange}
        />
        <div className="ad-Choice-fake">{c.name}</div>
      </label>
    );
  });

  return <div className="ad-Choices">{choices}</div>;
}

function Button(props) {
  return (
    <button
      className={
        "ad-Button" + (props.action ? "  ad-Button--" + props.action : "")
      }
      type="button"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

function Checkbox(props) {
  return (
    <label className="ad-Checkbox">
      <input
        className="ad-Checkbox-input"
        type="checkbox"
        onChange={props.onChange}
        checked={props.checked}
      />
      <div className="ad-Checkbox-fake" />
    </label>
  );
}

function Text(props) {
  return (
    <input
      className="ad-Text"
      type="text"
      value={props.value}
      onChange={props.onChange}
    />
  );
}

function Range(props) {
  return (
    <div className="ad-Range">
      <input
        className="ad-Range-input"
        type="range"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={props.onChange}
      />
      <input
        className="ad-Range-text  ad-Text"
        type="text"
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}
