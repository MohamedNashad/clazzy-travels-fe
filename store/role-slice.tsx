import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isEdit: false,
};

export const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        updateIsEdit: (state, action) => {
            state.isEdit = action.payload;
        },
    },
});

export const { updateIsEdit } = roleSlice.actions;
export default roleSlice.reducer;
