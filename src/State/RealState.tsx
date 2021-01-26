import {
  SoloClassShorthand,
  ItemViewDisplayType,
  SortProperty,
  SortDirection,
  GloomhavenItemSlot,
} from "./Types";
import { GameType } from "./GameType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  SpoilerMap,
  initialSpoilerMapState,
  SpoilerFilter,
  ItemsInUse,
} from "./SpoilerFilter";
import { PayloadGameTypeAction } from "./GameTypeAction";
import {
  ItemViewStateMap,
  initialItemViewStateMapState,
} from "./ItemViewState";

type RealState = {
  currentGameType: GameType;
  spoilerMap: SpoilerMap;
  itemViewMap: ItemViewStateMap;
};

const initialRealState: RealState = {
  currentGameType: GameType.Gloomhaven,
  spoilerMap: initialSpoilerMapState,
  itemViewMap: initialItemViewStateMapState,
};

const realSlice = createSlice({
  name: "realState",
  initialState: initialRealState,
  reducers: {
    storeCurrentGameType(state, action: PayloadAction<GameType>) {
      state.currentGameType = action.payload;
    },
    storeSpoilerFilter(state, action: PayloadGameTypeAction<SpoilerFilter>) {
      state.spoilerMap[action.payload.gameType] = action.payload.value;
    },
    storeProsperity(state, action: PayloadAction<number>) {
      const gameState = state.spoilerMap[state.currentGameType];
      if (gameState) {
        gameState.prosperity = action.payload;
      }
    },
    storeSoloClass(state, action: PayloadAction<Array<SoloClassShorthand>>) {
      const gameState = state.spoilerMap[state.currentGameType];
      if (gameState) {
        gameState.soloClass = action.payload;
      }
    },
    storeScenarioCompleted(state, action: PayloadAction<Array<number>>) {
      const gameState = state.spoilerMap[state.currentGameType];
      if (gameState) {
        gameState.scenarioCompleted = action.payload;
      }
    },
    storeItem(state, action: PayloadAction<Array<number>>) {
      const gameState = state.spoilerMap[state.currentGameType];
      if (gameState) {
        gameState.item = action.payload;
      }
    },
    storeItemsInUse(state, action: PayloadAction<ItemsInUse>) {
      const gameState = state.spoilerMap[state.currentGameType];
      if (gameState) {
        gameState.itemsInUse = action.payload;
      }
    },
    storeAll(state, action: PayloadAction<boolean>) {
      const gameState = state.spoilerMap[state.currentGameType];
      if (gameState) {
        gameState.all = action.payload;
      }
    },
    storeEnableStoreStockManagement(state, action: PayloadAction<boolean>) {
      const gameState = state.spoilerMap[state.currentGameType];
      if (gameState) {
        gameState.enableStoreStockManagement = action.payload;
      }
    },
    storeDisplayAs(state, action: PayloadAction<ItemViewDisplayType>) {
      const gameState = state.spoilerMap[state.currentGameType];
      if (gameState) {
        gameState.displayAs = action.payload;
      }
    },
    storeDiscount(state, action: PayloadAction<number>) {
      const gameState = state.spoilerMap[state.currentGameType];
      if (gameState) {
        gameState.discount = action.payload;
      }
    },

    // Item view state selectors
    storeFilterSearch(state, action: PayloadAction<string>) {
      const gameState = state.itemViewMap[state.currentGameType];
      if (gameState) {
        gameState.search = action.payload;
      }
    },
    storeSortingProperty(state, action: PayloadAction<SortProperty>) {
      const gameState = state.itemViewMap[state.currentGameType];
      if (gameState) {
        gameState.property = action.payload;
      }
    },
    storeSortingDirection(state, action: PayloadAction<SortDirection>) {
      const gameState = state.itemViewMap[state.currentGameType];
      if (gameState) {
        gameState.direction = action.payload;
      }
    },
    storeFilterSlots(
      state,
      action: PayloadAction<Array<GloomhavenItemSlot> | undefined>
    ) {
      const gameState = state.itemViewMap[state.currentGameType];
      if (gameState) {
        gameState.slots = action.payload;
      }
    },
  },
});

export const {
  storeAll,
  storeItem,
  storeItemsInUse,
  storeEnableStoreStockManagement,
  storeDiscount,
  storeDisplayAs,
  storeScenarioCompleted,
  storeSoloClass,
  storeProsperity,
  storeSpoilerFilter,
  storeCurrentGameType,
  storeFilterSearch,
  storeSortingProperty,
  storeSortingDirection,
  storeFilterSlots
} = realSlice.actions;

export default realSlice.reducer;
