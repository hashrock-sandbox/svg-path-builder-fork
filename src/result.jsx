import React from "react";

export default function Result(props) {
  const output = `<svg viewBox="0 0 640 640" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="40">
    <path d="${props.path}"  />
</svg>`;

  return (
    <div className="ad-Result">
      <div className="ad-Result-preview">
        <svg
          viewBox="0 0 640 640"
          width="32"
          height="32"
          fill="none"
          stroke="currentcolor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="40"
        >
          <path d={props.path} />
        </svg>
        <span className="ad-Result-label">Icon Preview</span>
      </div>
      <textarea
        className="ad-Result-textarea"
        value={output}
        onFocus={e => e.target.select()}
      />
    </div>
  );
}
