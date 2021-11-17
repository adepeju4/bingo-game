import createGameReducer from './gameReducer';
import getWordsReducer from './getWordsReducer';
import {combineReducers} from 'redux';
import addUserToGameReducer from './addUserReducer';
import getBoardReducer from './boardReducer';
import getCalledWordsReducer from './calledWordsReducer';

const rootReducer = combineReducers({
    gameData: createGameReducer,
    addUser: addUserToGameReducer,
    words: getWordsReducer,
    board: getBoardReducer,
    called: getCalledWordsReducer

});

export default rootReducer;