import BoardControl from "../../hooks/useShuffle";

export const CREATE_BOARD = "CREATE_BOARD";
export const CREATE_BOARD_REQUEST = "CREATE_BOARD_REQUEST";





export const createBoard = (player, words, topic) => async (dispatch) => {
  dispatch({ type: CREATE_BOARD_REQUEST });
    const playerBoard = new BoardControl(player, words, topic);
    playerBoard.setProperties();
    playerBoard.shuffleWords();
    const getGame = playerBoard.findMiddle()

     dispatch({ type: CREATE_BOARD, payload: getGame});
};
