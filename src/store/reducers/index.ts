import { combineReducers } from "@reduxjs/toolkit";
import InsightReducer from "./InsightReducer";


const RootReducer = combineReducers({
    insight: InsightReducer
});

export default RootReducer;