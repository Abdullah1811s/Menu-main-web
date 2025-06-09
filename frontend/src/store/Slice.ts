import { createSlice } from '@reduxjs/toolkit';



interface State {
    loading: boolean
}


const initialState: State = {
    loading: false,
};

const loadingSlice = createSlice({
    name: 'state',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        startLoading(state) {
            state.loading = true;
        },
        stopLoading(state) {
            state.loading = false;
        },
    },
});

export const { setLoading, startLoading, stopLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
