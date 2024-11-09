import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isEdit: false,
};

export const menShirtSlice = createSlice({
    name: 'menShirt',
    initialState,
    reducers: {
        updateIsEdit: (state, action) => {
            state.isEdit = action.payload;
        },
    },
});

export const { updateIsEdit } = menShirtSlice.actions;
export default menShirtSlice.reducer;
