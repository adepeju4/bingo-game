import { useState, useEffect } from "react";
import Balloons from "../Components/Balloons.js";
import { createBoard } from "../redux/actions/playerboardActions";
import { useDispatch, useSelector } from "react-redux";
import { io } from 'socket.io-client'
import {
  random_container,
  random,
  popover,
  arrow_left,
} from "../styles/randomCall.module.css";
import matchCheck from "../utils/checkMatch";
import sty, {
  grid,
  box,
  index,
  checkbox,
  board_container,
  word,
  score_container,
  random_buttons,
  start_random,
  stop_random,
  random_wrapper,
} from "../styles/board.module.css";

const Bingo = ({ playerName, words, role, topic }) => {
  const [message, setmessage] = useState("");
  const [data, setdata] = useState([]);
  const [newBoard, setNewBoard] = useState(false)
  const [bingo, setBingo] = useState(false);
  const [style, setstyle] = useState({});
    const [controlInterval, setControlInterval] = useState(null);
  const dispatch = useDispatch();
  



  useEffect(() => {
    dispatch(createBoard(playerName, words, topic));
  }, []);

  const {
    board: { board },
  } = useSelector((state) => state);

  const gameBoard = board;

  const [randomCall, setRandomCall] = useState(null);

  const output = [];
  const randomize = () => {
    const splitted = words.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    for (const [index, val] of splitted.entries()) {
      output.push(val.trim());
    }
    const callAtRandom = () => {
      const w = [...output];
      let currentIndex = w.length,
        randomIndex;

      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [w[currentIndex], w[randomIndex]] = [w[randomIndex], w[currentIndex]];
      }
      return w[0];
    };
    return callAtRandom;
  };

  if (bingo) {
    setTimeout(() => {
      setBingo(false);
    }, 6000);
    clearInterval(controlInterval);
  }



  const handleClick = (e) => {

    const index = Number(e.target.value);
    if (data.includes(gameBoard[index])) {
    let check;
    if (newBoard === true) {
      check = matchCheck('new')
    } else {
      check = matchCheck('old')
    }
      const result = check(parseInt(index), playerName);
      setNewBoard(false)
      setstyle({
        ...style,
        [index]: { backgroundColor: "#fcb69f", color: "#ffecd2" },
      });
      'WHAT IS HAPPENING'
    if (message !== result[0] && result[0] !== undefined) {
      setBingo(true);
        setmessage(result[0]);
      }
    }
  };

  const handleDraw = (e) => {
    if (!bingo) {
     const call = randomize();
      let result = "";
     if (!data.includes(result) && !bingo) {
       result = call();
       setRandomCall(result);
        clearInterval(controlInterval);
       setdata((prev) => [...prev, result]);
     }
  }
   
  };

    const handleStart = (e) => {
      let interval;
      const call = randomize();
      let result = "";
      interval = setInterval(() => {
        
          result = call();
          setRandomCall(result);
          setdata((prev) => [...prev, result]);
        
      }, 4000);
      setControlInterval(interval);
    };

    const handleStop = (e) => {
      clearInterval(controlInterval);
    };

  const handleNew = (e) => {
    setNewBoard(true)
    dispatch(createBoard(playerName, words, topic));
    setstyle({})
    setdata([]);
    setRandomCall(null);
    setBingo(false);
    setmessage("")
    clearInterval(controlInterval);
  };

  return (
    <>
      <div className={board_container}>
        <div className={grid}>
          {board &&
            gameBoard.map((el, i) => {
              let styles = [box, sty[`box${i}`]].join(" ");
              let wordStyles = [word, sty[`word${i}`]].join(" ");
              return (
                <label className={styles} key={`${i}box`} style={style[i]}>
                  <input
                    type="checkbox"
                    onClick={handleClick}
                    className={checkbox}
                    value={i}
                  />
                  <div className={index}>{i}</div>
                  <div className={wordStyles}>{el}</div>
                </label>
              );
            })}
        </div>
      </div>
      <div className={random_container}>
        <div className={random_wrapper}>
          <div className={score_container}>
            <h3>{message}</h3>
          </div>
          <div className={random}>
            <p className={[popover, arrow_left].join(" ")}>{randomCall}</p>
          </div>

          <div className={random_buttons}>
            <button className={start_random} onClick={handleStart}>
              Call
            </button>
            <button className={start_random} onClick={handleDraw}>
              Draw
            </button>
            <button className={stop_random} onClick={handleNew}>
              New Card
            </button>

            <button className={stop_random} onClick={handleStop}>
              Stop
            </button>
          </div>
        </div>
      </div>
      {bingo && <Balloons />}
    </>
  );
};

export default Bingo;
