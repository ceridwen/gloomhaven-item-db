import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DropdownProps, Form } from "semantic-ui-react";
import { gameDataTypes } from "../../games";
import { GameType } from "../../State/GameType";
import { storeCurrentGameType } from "../../State/RealState";

type GameSelectorProps = {
  onChange: (gameType: GameType) => void;
  defaultGameType: GameType;
};

const options: any[] = [];
Object.values(GameType).forEach((gameType) => {
  const gameData = gameDataTypes[gameType as GameType];
  options.push({ text: gameData.name, value: gameType });
});

const GameSelector = (props: GameSelectorProps) => {
  const { onChange, defaultGameType } = props;
  const dispatch = useDispatch();

  const onGameTypeChanged = (obj:any, e:DropdownProps):void => {
	onChange(e.value as GameType);
	localStorage.setItem("lastGame", e.value as GameType);
	dispatch(storeCurrentGameType(e.value as GameType))
}

useEffect(() => {
	const gameType = localStorage.getItem("lastGame") || GameType.Gloomhaven;
	dispatch(storeCurrentGameType(gameType as GameType));
}, []);

  return (
    <>
      <Form.Select
        value={defaultGameType}
        options={options}
        onChange={onGameTypeChanged}
      />
    </>
  );
};

export default GameSelector;
