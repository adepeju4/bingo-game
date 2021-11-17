import {
  ADD_USER_ERROR,
  ADD_USER_TO_GAME,
  ADD_USER_REQUEST,
} from "../actions/gameActions";

const initState = {
  isAdded: false,
  isPending: false,
  error: null,
  data: null,
};

const addUserToGameReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_USER_REQUEST:
      return { ...state, isPending: true };
    case ADD_USER_TO_GAME:
      return {
        ...state,
        isPending: false,
        data: action.payload,
        isAdded: true,
        error: null
      };
    case ADD_USER_ERROR:
      return { ...state, isPending: false, error: action.payload };
    default:
      return { ...state };
  }
};

export default addUserToGameReducer;
