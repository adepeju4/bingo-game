import {CREATE_GAME, CREATE_GAME_REQUEST, CREATE_GAME_ERROR, ADD_USER_TO_GAME, DELETE_GAME, ADD_USER_REQUEST, ADD_USER_ERROR} from '../actions/gameActions.js';



const initState = {
    isCreated: false,
    isPending: false,
    error: null, 
    data: null
}

const createGameReducer = (state = initState, action) => {
   switch (action.type) {
       case CREATE_GAME_REQUEST:
           return {...state, isPending: true};
        case CREATE_GAME: 
            return {...state,error:false, isPending: false, data:action.payload, isCreated: true}
        case CREATE_GAME_ERROR:
            return {...state, isPending: false, error: action.payload}
       default:
           return {...state}
   }
};




export default createGameReducer;