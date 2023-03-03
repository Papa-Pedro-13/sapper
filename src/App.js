import React from 'react';
import { GameMap } from './GameMap';
import { Timer } from './Timer';
import { Cell } from "./Cell";
import './index.scss';

function App() {
  const countMines = 40;
  const [seconds, setSeconds] = React.useState(0);
  const [isFirstClick, setIsFirstClick] = React.useState(true);
  const [minutes, setMinutes] = React.useState(40);
  const [smile, setSmile] = React.useState('default');
  const [items, setItems] = React.useState([]);
  const [bombs, setBombs] = React.useState([]);
  const [endGame, setEndGame] = React.useState(false);
  const [secretMap, setSecretMap] = React.useState([]);

  function tick() {
    if (seconds == 0) {
      setSeconds(59);
      setMinutes(minutes - 1)
    }
    else {
      setSeconds(seconds - 1);
    }
    //console.log(minutes, seconds)
  }

  function drawMap() {
    for (let i = 0; i < 16 * 16; i++) {
      if (items.length < 256) {
        setItems(oldArray => [...oldArray, 'default-brick'])
      }
    }
  }
  window.onload = function () {
    drawMap()
  }
  React.useEffect(() => {
    const timerID = setInterval(() => {
      if (smile != 'looser' && smile != 'winner')
        tick();
    }, 1000);
    return () => clearInterval(timerID);
  });
  function onContextMenu(index) {
    if ((items[index] == 'flag' || items[index] == 'question' || items[index] == 'default-brick') &&!endGame) {
      const newMap = items.map((c, i) => {
        if (i === index) {
          if (c == "flag") {
            return "question"
          }
          else if (c == 'question') {
            return "default-brick"
          }
          return "flag";
        }
        else {
          return c;
        }
      });
      setItems(newMap);
      setSmile("default")
    }
  }

  function createSecretMap(index) {
    for (let i = 0; i < countMines; i++) {
      let num = 0;
      do {
        num = Math.round(Math.random() * 255);
      } while (num == index || bombs.includes(num));
      bombs[i] = num;
    }
    console.log(bombs.sort((a, b) => a - b))
    for (let i = 0; i < 256; i++) {
      if (!bombs.includes(i)) {
        secretMap[i] = 0;
      }
      else {
        secretMap[i] = -1;
      }
    }
    console.log(secretMap)
    for (let row = 0; row < 16; row++) {
      for (let column = 0; column < 16; column++) {
        if (secretMap[row * 16 + column] != -1) {
          for (let n = row - 1; n <= row + 1; n++) {
            for (let m = column - 1; m <= column + 1; m++) {
              if (n > -1 && m > -1 && n < 16 && m < 16) {
                if (secretMap[n * 16 + m] == -1) {
                  secretMap[row * 16 + column] += 1
                }
              }
            }
          }
        }
      }
    }


  }

  function checkBombAround(index) {
    if (secretMap[index] > 0) {
      items[index] = `number-${secretMap[index]}`
      return;
    }
    else if (secretMap[index] == 0) {
      items[index] = `number-0`
      let row = parseInt(index / 16);
      let column = index % 16;
      for (let n = row - 1; n <= row + 1; n++) {
        for (let m = column - 1; m <= column + 1; m++) {
          if (n > -1 && m > -1 && n < 16 && m < 16 && n * 16 + m != index && (items[n * 16 + m] == 'flag' || items[n * 16 + m] == 'question' || items[n * 16 + m] == 'default-brick')) {

            checkBombAround(n * 16 + m)
          }
        }
      }
    }
    if (secretMap[index] == -1) {
      return
    }
  }
  function endLoseGame(index) {
    for (let temp in bombs) {
      items[bombs[temp]] = 'bomb'
    }
    items[index] = 'chosenBomb'
    setSmile('looser')
    setEndGame(true)
  }
  function endWinGame() {
    for (let temp in bombs) {
      items[bombs[temp]] = 'bomb'
    }
    setSmile('winner')
    setEndGame(true)
  }
  function onClickCell(index) {
    if (!endGame) {
      if (isFirstClick) {
        createSecretMap(index)
        setIsFirstClick(false)
      }
      setSmile("default")
      if (secretMap[index] == -1) {
        endLoseGame(index)
      }
      checkBombAround(index)
      let k = 0;
      for (let i = 0; i < 256; i++) {
        if (items[i] == 'default-brick' || items[i] == 'flag' || items[i] == 'question') {
          k++;
        }
      }
      if (k == countMines) {
        endWinGame()
      }
    }
  }
  function onMouseDownCell() {
    if (!endGame) {
      setSmile("click")
    }
  }
  return (
    <div className="App">
      <Timer seconds={seconds} smile={smile} minutes={minutes} />
      <GameMap items={items} onContextMenu={onContextMenu}
        onClickCell={onClickCell} secretMap={secretMap} onMouseDownCell={onMouseDownCell} />
    </div>
  );
}

export default App;
