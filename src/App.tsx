import { useGameStore } from './store/useGameStore';
import { MenuScreen } from './screens/MenuScreen';
import { LobbyScreen } from './screens/LobbyScreen';
import { GameScreen } from './screens/GameScreen';
import { EndScreen } from './screens/EndScreen';

function App() {
    const currentScreen = useGameStore((state) => state.currentScreen);

    return (
        <div className="app-container">
            {currentScreen === 'menu' && <MenuScreen />}
            {currentScreen === 'lobby' && <LobbyScreen />}
            {currentScreen === 'game' && <GameScreen />}
            {currentScreen === 'end' && <EndScreen />}
        </div>
    );
}

export default App;
