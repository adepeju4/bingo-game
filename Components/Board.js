import { useState, useEffect } from "react";
import Balloons from "../Components/Balloons.js";
import GameModal from "./Modal.js";
import { createBoard } from "../redux/actions/playerboardActions";
import { useDispatch, useSelector } from "react-redux";
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

const Bingo = ({ playerName, words }) => {
  const [message, setmessage] = useState("");
  const [data, setdata] = useState([]);
  const [count, setCount] = useState(0);
  const [controlInterval, setControlInterval] = useState(null)
  const [bingo, setBingo] = useState(false);
  const [style, setstyle] = useState({});
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createBoard(playerName, words));
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


  {
    bingo &&
      setTimeout(() => {
        setBingo(false);
      }, 5000);
  }

  const handleClick = (e) => {
    const index = Number(e.target.value);
    if (data.includes(gameBoard[index])) {
      const result = matchCheck(parseInt(index), playerName);
      
        setstyle(
          { ...style, [index]: { backgroundColor: "#fcb69f", color: "#ffecd2" }}
          )
        
      
      if (message !== result[0] && result[0] !== undefined) {
        setBingo(true);
        setmessage(result[0]);
      }
    }
  };
  

  

  const handleStart = (e) => {
    let interval;
    const call = randomize();
    let result = "";
    interval = setInterval(() => {
      if (!data.includes(result)) {
        result = call();
        setCount((prev) => prev + 1);
        setRandomCall(result);
        setdata((prev) => [...prev, result]);
      }
    }, 4000);
    if (count === output.length) {
      clearInterval(controlInterval)
      setModal(true);
    }
    setControlInterval(interval);
  };


  const handleStop = (e) => {
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
              Start
            </button>
            <button className={stop_random} onClick={handleStop}>
              Stop
            </button>
          </div>
        </div>
      </div>
      {bingo && <Balloons />}
      {modal && <GameModal message={message} open={modal} setOpen={setModal} />}
    </>
  );
};

export default Bingo;
