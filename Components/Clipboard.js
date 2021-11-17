import { useState } from "react";
import styles from "../styles/clipboard.module.css";
import { useDispatch, useSelector } from "react-redux";
function Clipboard({ playerName, gameId }) {
  const {
    addUser: { isAdded, error: addUserError, gameId: roomId },
  } = useSelector((state) => state);

 



  return (
    <div>
      <div className={styles.contact}>
        <p>
          <strong>Hi {playerName}</strong>
        </p>
        <p>copy game id to clipboard</p>

        <div>
          <input type="text" className={styles.input} value={gameId} disabled/>
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(gameId)}
            title="Copy to clipboard"
          >
            <svg
              className={styles.icon}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M17,9H7V7H17M17,13H7V11H17M14,17H7V15H14M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Clipboard;
