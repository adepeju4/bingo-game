import {
  GET_WORDS,
  GET_WORDS_REQUEST,
  GET_WORDS_ERROR,
} from "../actions/wordsActions.js";

const initState = {
  isPending: false,
  error: null,
  words: null,
  gameTopic: null
};

const getWordsReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_WORDS_REQUEST:
      return { ...state, isPending: true };
    case GET_WORDS:
      return {
        ...state,
        error: null,
        isPending: false,
        words: action.payload.words,
        gameTopic: action.payload.gameTopic
      };
    case GET_WORDS_ERROR:
      return { ...state, isPending: false, error: action.payload };
    default:
      return { ...state };
  }
};

export default getWordsReducer;
