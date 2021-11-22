import axios from 'axios';

export const GET_WORDS_REQUEST = "GET_WORDS_REQUEST"

export const GET_WORDS = "GET_WORDS"

export const GET_WORDS_ERROR = "GET_WORDS_ERROR"


export const getWords = (data) => async (dispatch) => {
    dispatch({ type: GET_WORDS_REQUEST, isPending: true });
    const {gameId} = data
    try {
        const response = await axios.get(`/api/getWords?gameId=${gameId}`);
        const {words, gameTopic} = response.data
       
        dispatch({ type: GET_WORDS, payload: {words, gameTopic } });
    } catch (error) {
      
        dispatch({type: GET_WORDS_ERROR, payload: error.message})
    }
}