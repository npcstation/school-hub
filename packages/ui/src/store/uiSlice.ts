import { createSlice } from '@reduxjs/toolkit';

interface UIState {
    theme: string;
}

const initialState: UIState = {
    theme: 'light',
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            if (state.theme === 'light') {
                state.theme = 'dark';
            } else {
                state.theme = 'light';
            }
        },
    },
});

export const { toggleTheme } = uiSlice.actions;

export default uiSlice.reducer;
