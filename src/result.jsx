import React from "react";

export default function Result(props) {
  const output = `<svg viewBox="0 0 640 640" width="24" height="24" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="60">
    <path d="${props.path}"  />
</svg>`;

  return (
    <div className="ad-Result">
      <div className="ad-Result-preview">
        <svg
          viewBox="0 0 640 640"
          width="16"
          height="16"
          fill="none"
          stroke="currentcolor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="60"
        >
          <path d={props.path} />
        </svg>

        <span className="ad-Result-label">16px</span>

        <svg
          viewBox="0 0 640 640"
          width="24"
          height="24"
          fill="none"
          stroke="currentcolor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="60"
        >
          <path d={props.path} />
        </svg>

        <span className="ad-Result-label">24px</span>

        <svg
          viewBox="0 0 640 640"
          width="32"
          height="32"
          fill="none"
          stroke="currentcolor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="60"
        >
          <path d={props.path} />
        </svg>

        <span className="ad-Result-label">32px</span>
      </div>
      <textarea
        className="ad-Result-textarea"
        value={output}
        onFocus={e => e.target.select()}
      />
    </div>
  );
}
