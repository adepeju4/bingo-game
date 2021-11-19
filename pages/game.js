import Channel from './bingo/Channel.js'
import {container} from '../styles/game.module.css'

const Game = () => {   
    return (
      <div className={container}>
        <Channel/>
        </div>
     );
}
 
export default Game;