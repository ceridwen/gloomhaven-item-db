import {combineReducers } from "redux";
import itemViewState from "./ItemViewState"
import realReducer from "./RealState"

const rootReducer = combineReducers( { itemViewState, realReducer} );

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
