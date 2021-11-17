import { CALLED_WORDS } from "../actions/callWordsACtions";

const initState = {
    called: []
}


const getCalledWordsReducer = (state = initState, action) => {
    switch (action.type){
        case CALLED_WORDS:
            return { called: action.payload }
        default:
            return{initState}
    }
};

export default getCalledWordsReducer;