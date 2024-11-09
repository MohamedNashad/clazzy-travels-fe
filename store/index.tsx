import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from '@/store/theme-config-slice';
import menShirtSlice from '@/store/men-shirt-slice';
import permissionSlice from '@/store/permission-slice';
import roleSlice from './role-slice';
import userSlice from './user-slice';
import authSlice from './auth-slice';

const rootReducer = combineReducers({
    themeConfigReducer: themeConfigSlice,
    authReducer: authSlice,
    menShirtReducer: menShirtSlice,
    permissionReducer: permissionSlice,
    roleReducer: roleSlice,
    userReducer: userSlice,
});

export default configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
