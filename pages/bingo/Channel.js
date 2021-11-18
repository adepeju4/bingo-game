import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Board from "../../Components/Board";
import CustomizedSnackbars from "../../Components/SnackbarSuccess";
import { CircularLoader, ErrorDisplay } from "../../Components/GlobalUtils";
import { useDispatch, useSelector } from "react-redux";
import { getWords } from "../../redux/actions/wordsActions";
import Clipboard from "../../Components/Clipboard";
import { channel_container } from "../../styles/channel.module.css";

function Channel() {

  const router = useRouter();

  let playerRole;
  
  if (typeof window !== 'undefined') { playerRole = localStorage.getItem("role"); }
   

  const { player, room: gameId } = router.query;
  const dispatch = useDispatch();

  useEffect(() => {
   
      const room = localStorage.getItem("room");
      
      dispatch(getWords({ gameId: room }));
    
  }, []);
  const {
    words: { isPending, error, words }
  } = useSelector((state) => state);
  
  return (
    <div className={channel_container}>
      {error && <ErrorDisplay error={error} />}
      {isPending && <CircularLoader />}
      {gameId && player && words && (
        <>
          
          <CustomizedSnackbars
            message={`Hi there ${player}, welcome to bingooo`}
          />
          <Board playerName={player} words={words} role={playerRole} />
        <Clipboard playerName={player} message='Copy game id to clipboard' data={gameId}/>
        </>
      )}
    </div>
  );
}

export default Channel;
