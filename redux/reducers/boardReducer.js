import { CREATE_BOARD, CREATE_BOARD_REQUEST } from "../actions/playerboardActions";

const initState = {
    isPending: false,
 board: null
};

const getBoardReducer = (state = initState, action) => {
  switch (action.type) {
    case CREATE_BOARD_REQUEST:
      return { ...state, isPending: true };
    case CREATE_BOARD:
      return {
        ...state,
        isPending: false,
        board: action.payload,
      };
    default:
      return { ...state };
  }
};

export default getBoardReducer;
