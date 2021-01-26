import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { RootState } from "./Reducer";
import { SpoilerFilter, SpoilerMap } from "./SpoilerFilter";

export const spoilerFilterSelector = createSelector(
    (state: RootState) => state.realReducer,
    (realState) => {
        const state = realState.spoilerMap[realState.currentGameType];
        if (state === undefined) {
          throw new Error("Wrong type");
        }
        return state as SpoilerFilter;
      }
  );
  
  export const getRealSpoilerFilter = (): SpoilerFilter => {
    return useSelector(spoilerFilterSelector);
  };
  
  export const allSpoilerFiltersSelector = createSelector(
    (state: RootState) => state.realReducer,
    (realState) => realState.spoilerMap
  );
  
  export const getRealAllSpoilerFilters = (): SpoilerMap => {
    return useSelector(allSpoilerFiltersSelector);
  };