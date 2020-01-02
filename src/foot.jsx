import React from "react";

export default function Foot(props) {
  return (
    <div className="ad-Foot">
      <ul className="ad-Foot-list">
        <li className="ad-Foot-item">
          <span className="ad-Foot-highlight">Click</span> to select a point
        </li>
        <li className="ad-Foot-item">
          <span className="ad-Foot-highlight">Ctrl + Click</span> to add a point
        </li>
      </ul>
      <div className="ad-Foot-meta">
        <a href="https://twitter.com/a_dugois">Follow me on Twitter</a>
        <br />
        or{" "}
        <a href="http://anthonydugois.com/svg-path-builder/">
          check the online version
        </a>
      </div>
    </div>
  );
}
