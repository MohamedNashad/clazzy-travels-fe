import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isEdit: false,
};

export const permissionSlice = createSlice({
    name: 'permission',
    initialState,
    reducers: {
        updateIsEdit: (state, action) => {
            state.isEdit = action.payload;
        },
    },
});

export const { updateIsEdit } = permissionSlice.actions;
export default permissionSlice.reducer;
