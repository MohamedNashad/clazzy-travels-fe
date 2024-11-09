import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isEdit: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateIsEdit: (state, action) => {
            state.isEdit = action.payload;
        },
    },
});

export const { updateIsEdit } = userSlice.actions;
export default userSlice.reducer;
