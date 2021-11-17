export const CALLED_WORDS = "CALLED_WORDS";





export const calledword = (cell) => (dispatch) => {
  dispatch({ type: CALLED_WORDS, payload: cell});
  return cell
}

