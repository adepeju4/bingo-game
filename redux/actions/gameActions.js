import axios from 'axios'

export const CREATE_GAME = "CREATE_GAME";
export const CREATE_GAME_REQUEST = "CREATE_GAME_REQUEST";
export const CREATE_GAME_ERROR = "CREATE_GAME_ERROR";
export const ADD_USER_TO_GAME = "ADD_USER_TO_GAME";
export const ADD_USER_REQUEST = "ADD_USER_REQUEST";
export const ADD_USER_ERROR = "ADD_USER_ERROR";
export const DELETE_GAME = "DELETE_GAME";





export const createGame = (data) => async(dispatch) => {
    dispatch({type: CREATE_GAME_REQUEST});
    try {
    await axios.post('/api/addData?collection=game_room', data);
    dispatch({type: CREATE_GAME, payload: data});
    } catch (error) {
        dispatch({type: CREATE_GAME_ERROR, payload: error})
    }
}

export const addUserToGame = (data) => async (dispatch) => {
    dispatch({ type: ADD_USER_REQUEST });
    try {
        await axios.post('/api/addUser?collection=room_users', data);
        dispatch({ type: ADD_USER_TO_GAME, payload: data });
    } catch (error) {
        dispatch({type: ADD_USER_ERROR, payload: error})
    }
}