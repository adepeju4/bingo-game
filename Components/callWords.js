import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { random_container, random } from "../styles/randomCall.module.css";
import { calledword } from "../redux/actions/callWordsACtions.js";

function CallWords({ words }) {
  const [randomCall, setRandomCall] = useState("");
  const dispatch = useDispatch();
  const output = [];

  const randomize = (arr) => {
    const w = [...arr];
    let currentIndex = w.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [w[currentIndex], w[randomIndex]] = [w[randomIndex], w[currentIndex]];
    }

    return w[0];
  };
  const splitted = words.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  for (const [index, val] of splitted.entries()) {
    output.push(val.trim());
  }

  useEffect(() => {
    const count = 0;
    const interval = setInterval(() => {
      setRandomCall((randomCall) => {
        count += 1;
        let result = randomize(output);
        dispatch(calledword(result));
        if (count === output.length) clearInterval(interval);
        return result;
      });
    }, 8000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={random_container}>
      <div className={random}>
        <p>{randomCall}</p>
      </div>
    </div>
  );
}

export default CallWords;
