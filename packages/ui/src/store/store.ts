import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import uiReducer from './uiSlice';

const store = configureStore({
    reducer: { user: userReducer, ui: uiReducer },
});

function getStore(PRELOADED_STATE?: any) {
    const store = configureStore({
        reducer: { user: userReducer, ui: uiReducer },
        preloadedState: PRELOADED_STATE,
    });
    return store;
}

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { getStore };
