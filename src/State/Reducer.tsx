import {combineReducers } from "redux";
import realReducer from "./RealState"

const rootReducer = combineReducers( { realReducer} );

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
