import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userRolesAndPermissions: [],
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateUserRolesAndPermissions: (state, action) => {
            state.userRolesAndPermissions = action.payload;
        },
    },
});

export const { updateUserRolesAndPermissions } = authSlice.actions;
export default authSlice.reducer;
