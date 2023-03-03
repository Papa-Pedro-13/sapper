import React from "react";

export const Cell = ({ cellState, index, onContextMenu, onClickCell,onMouseDownCell }) => (
    <div
        className="cell"
        onClick={(e) => {
            e.preventDefault();
            onClickCell(index);
        }}
        onMouseDown={onMouseDownCell}
        onContextMenu={(e) => {
            e.preventDefault();
            onContextMenu(index);
        }}
    >
        <img className=""  src={`${cellState}.png`} />
    </div>
);
