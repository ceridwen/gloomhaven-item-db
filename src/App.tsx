import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import dbApp from "./State/Reducer";
import MainView from './components/Tabs/MainView/MainView';
import GameProvider from './components/Game/GameProvider'
import { LOCAL_STORAGE_PREFIX } from './games';
import { GameType } from './State/GameType';
import GameSelector from './components/Game/GameSelector';

export const store = createStore(dbApp,  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

const App = () => {
    const [gameType, setGameType] = useState<GameType>(localStorage.getItem("lastGame") as GameType || GameType.Gloomhaven);

    const onGameTypeChanged = (gameType:GameType):void => {
        setGameType(gameType);
    }

    useEffect( () => {
        let unsubscribe = store.subscribe (() => {
            localStorage.setItem(LOCAL_STORAGE_PREFIX + gameType, JSON.stringify(store.getState().realReducer.spoilerMap[gameType]));
        });
        return () => {
            unsubscribe();
        }
    }, [gameType]);

    return (
        <Container>
            <Provider store={store}>
                <GameSelector defaultGameType={gameType} onChange={onGameTypeChanged}/>
                <GameProvider gameType={gameType}>
                    <MainView/>
                </GameProvider>
            </Provider>
        </Container>
    );
}

export default App;
