import GHGameData  from './gh/GHGameData';
import JOTLGameData from './jotl/JOTlGameData';
import BaseGameData, {LOCAL_STORAGE_PREFIX} from './GameData';
import { GameType } from '../State/GameType';

const gameDataTypes = {
    [GameType.Gloomhaven] : new GHGameData(),
    [GameType.JawsOfTheLion] : new JOTLGameData(),
}

export {gameDataTypes, BaseGameData, LOCAL_STORAGE_PREFIX};
