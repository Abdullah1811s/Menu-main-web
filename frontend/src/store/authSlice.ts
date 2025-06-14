import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
    userAuth: boolean;
    role: string | null; 
}

const initialState: State = {
    userAuth: false,
    role: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<{ isAuthenticated: boolean; role: string | null }>) {
            state.userAuth = action.payload.isAuthenticated;
            state.role = action.payload.role;
        },
        login(state, action: PayloadAction<string>) {
            state.userAuth = true;
            state.role = action.payload; 
        },
        logout(state) {
            state.userAuth = false;
            state.role = null;
        },
    },
});

export const { setAuth, login, logout } = authSlice.actions;

export default authSlice.reducer;
