import { useState } from "react";
import {
  container,
  container_content,
  container_content_inner,
  title,
  par,
  btns,
  btns_more,
  overlay,
  formInput,
  numInput,
  textInput,
  or,
  gameIdInput,
} from "../styles/Home.module.css";

import { useRouter } from "next/dist/client/router";
import defaultWords from '../data/defaultWords.js'
import { createGame, addUserToGame } from "../redux/actions/gameActions.js";
import { useDispatch, useSelector } from "react-redux";
import Clipboard from "../Components/Clipboard";
import SnackbarError from "../Components/SnackbarError";

function Home({ onSaveGameData }) {
  let count = 0;

  const [users, setUsers] = useState("");
  const [cards, setCards] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [words, setWords] = useState("");
  const [gameId, setGameId] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [existingGame, setExistingGame] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const {
    addUser: { isAdded, error: addUserError },
  } = useSelector((state) => state);
  const {
    gameData: { isCreated, error: gameDataError, data },
  } = useSelector((state) => state);

  const handleUserName = (e) => {
    setPlayerName(e.target.value);
  };

  const getGameId = (e) => {
    setGameId(e.target.value);
  };
  const getUsers = (e) => {
    setUsers(e.target.value);
  };

  const getCards = (e) => {
    setCards(e.target.value);
  };

  const getWords = (e) => {
  
      setWords(e.target.value);
  
    

    const wordArr = words.split(/[\n'',]+/);

    for (const [i, word] of wordArr.entries()) {
      if (word === "" || word === ".") {
        wordArr.splice(i, 1);
      }
    }
  };

  const handleExistingGame = (e) => {
    e.preventDefault();
    setExistingGame(true);
  };

  const handleSubmit = async (e) => {
    let gameData;

    e.preventDefault();

    if (!existingGame) {
      gameData = {
        totalPlayers: users,
        gameMaster: playerName,
        otherPlayers: users - 1,
        words,
        playerRole: "game master",
        roomId: `BG-${Date.now()}${(count += 1)}`,
      };
     
      window.localStorage.setItem("room", gameData.roomId);
      window.localStorage.setItem("role", gameData.playerRole);
    } else {
      gameData = {
        player: playerName,
        gameId,
        playerRole: "member",
      };
      window.localStorage.setItem("room", gameData.gameId);
          window.localStorage.setItem("role", gameData.playerRole);
    }

    onSaveGameData(gameData);

    {
      existingGame && dispatch(addUserToGame(gameData));
    }
    {
      !existingGame && dispatch(createGame(gameData));
    }

    if (addUserError) {
      setOpen(true);
      setError("Game room does not exist");
      setPlayerName("");
      setUsers("");
      setCards("");
      setWords("");
      setGameId("");
    } else if (gameDataError) {
      setOpen(true);
      setError(gameDataError);
      setPlayerName("");
      setUsers("");
      setCards("");
      setWords("");
      setGameId("");
    }
  };
  if (isCreated) {
    const { roomId } = data;
    router.push({
      pathname: "/game",
      query: { room: roomId, player: playerName },
    });
  } else if (isAdded) {
    router.push({
      pathname: "/game",
      query: { room: gameId, player: playerName },
    });
  }

  return (
    <>
      <div>
        <SnackbarError message={error} open={open} setOpen={setOpen} />
        <Clipboard playerName='player' data={defaultWords}/>
        <div className={container}>
          <div className={container_content}>
            <div className={container_content_inner}>
              <div className={title}>
                <h1>👋 Adepeju's Bingo World</h1>
              </div>
              <div className={par}>
                {!existingGame ? (
                  <p>Welcome to Adepeju's amazing world of bingo!</p>
                ) : (
                  <p> 🤪 Welcomee, don't keep your friends waiting...</p>
                )}
              </div>
              {!existingGame ? (
                <form onSubmit={handleSubmit}>
                  <div className={formInput}>
                    <label htmlFor="playerName">
                      <p>Player Name: </p>
                    </label>
                    <input
                      className={gameIdInput}
                      id="playerName"
                      type="text"
                      value={playerName}
                      onChange={handleUserName}
                      required
                    />
                  </div>
                  <div className={formInput}>
                    <label htmlFor="Users">
                      <p>Players:</p>
                    </label>
                    <input
                      className={numInput}
                      value={users}
                      id="Users"
                      type="number"
                      min="2"
                      max="5"
                      onChange={getUsers}
                      required
                    />
                  </div>
                  <div className={formInput}>
                    <label htmlFor="words">
                      <p>Words:</p>
                    </label>

                    <textarea
                      spellCheck="true"
                      value={words}
                      className={textInput}
                      id="words"
                      type="text"
                      placeholder={`"sentence", "sentence"...`}
                      onChange={getWords}
                     
                    />
                  </div>
                  <p>
                    Kindly input at least 30 sentences
                  </p>
                  <div className={btns}>
                    <button
                      id="create--game"
                      className={btns_more}
                      type="submit"
                    >
                      {" "}
                      Start Game{" "}
                    </button>
                    <p className={or}>OR</p>
                    <button
                      id="create--game"
                      className={btns_more}
                      onClick={handleExistingGame}
                    >
                      {" "}
                      Join Existing Game{" "}
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className={formInput}>
                    <label htmlFor="playerName">
                      <p>Player Name: </p>
                    </label>
                    <input
                      className={gameIdInput}
                      id="playerName"
                      type="text"
                      value={playerName}
                      onChange={handleUserName}
                      required
                    />
                  </div>
                  <div className={formInput}>
                    <label htmlFor="gameId">
                      <p>Game ID: </p>
                    </label>
                    <input
                      className={gameIdInput}
                      id="gameId"
                      type="text"
                      required
                      value={gameId}
                      onChange={getGameId}
                    />
                  </div>
                  <div className={btns}>
                    <button
                      id="create--game"
                      className={btns_more}
                      type="submit"
                    >
                      {" "}
                      Start Game{" "}
                    </button>
                    <p className={or}>OR</p>
                    <button
                      id="create--game"
                      className={btns_more}
                      onClick={() => setExistingGame(!existingGame)}
                    >
                      {" "}
                      Go Back{" "}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
        <div className={overlay}></div>
      </div>
    </>
  );
}

export default Home;
