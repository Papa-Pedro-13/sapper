import React from "react";

export const Timer = ({seconds,minutes,smile}) => (
    <div className="timer">
        <div className="minutes">
            <img src="./0.png" alt="" />
            <img src={`./${parseInt(minutes/10)}.png`} alt="" />
            <img src={`./${minutes%10}.png`} alt="" />
        </div>
        <div className="smile" onClick={()=>window.location.reload()} >
            <img src={`./${smile}.png`} alt="" />
        </div>
        <div className="seconds">
            <img src="./0.png" alt="" />
            <img src={`./${parseInt(seconds/10)}.png`} alt="" />
            <img src={`./${seconds%10}.png`} alt="" />
        </div>
    </div>
);
