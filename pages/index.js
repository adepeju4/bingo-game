
import Home from './home'



export default function App() {
  
    const saveGameData = (enteredGameData) => {
      const gameData = {
        ...enteredGameData,
        }
    };
  
  return (
      <Home onSaveGameData={saveGameData} />
  );
}
