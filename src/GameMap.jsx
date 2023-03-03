import React from "react";
import { Cell } from "./Cell";

export const GameMap = ({ items, onContextMenu,onClickCell,secretMap,onMouseDownCell }) => (
    <div className="gameMap">
        {items.map((el, index) => (
            <Cell cellState={el} index={index} onContextMenu={onContextMenu} onMouseDownCell={onMouseDownCell} secretMap={secretMap}  onClickCell ={onClickCell} />
        ))}
    </div>
);
