import {
  configureStore,
  ThunkAction,
  Action,
  AnyAction,
  combineReducers,
} from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { diff } from "jsondiffpatch";

const reducer = (state: any, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      const stateDiff = diff(state, action.payload) as any;
      const wasBumpedOnClient = stateDiff?.page?.[0]?.endsWith("X"); // or any other criteria
      return {
        ...state,
        ...action.payload,
        page: wasBumpedOnClient ? state.page : action.payload.page, // keep existing state or use hydrated
      };
    case "TICK":
      return { ...state, tick: action.payload };
    default:
      return state;
  }
};

const makeStore = () =>
  configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
