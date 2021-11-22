import React from "react";
import { balloon_container, balloon, float } from "../styles/balloon.module.css";

function Balloons() {
  function random(num) {
    return Math.floor(Math.random() * num);
  }

  function getRandomStyles() {
    let r = random(255);
    let g = random(255);
    let b = random(255);
    let mt = random(200);
    let ml = random(50);
    let dur = random(5) + 5;
    return {
      backgroundColor: `rgba(${r}, ${g}, ${b}, 0.7)`,
      color: `rgba(${r}, ${g}, ${b}, 0.7)`,
      boxShadow: `inset -7px -3px 10px rgba(${r - 10},${g - 10},${
        b - 10
      }, 0.7)`,
      margin: `${mt}px 0 0 ${ml}px`,
      animation: `${float} ${dur}s ease-in infinite`,
    };
  }

  return (
    <div className={balloon_container}>
      {[...Array(10)].map((val, i) => (
        <div key={`${i}balloon`} className={balloon} style={getRandomStyles()}></div>
      ))}
    </div>
  );
}

export default Balloons;
