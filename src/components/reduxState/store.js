import { configureStore } from "@reduxjs/toolkit";
import ListedPropertiesReducer from "./ListedPropertiesReducer";
import { userReducer } from "./user/user.reducer";

const store = configureStore({
  reducer: {
    updateProperty: ListedPropertiesReducer,
    user: userReducer,
  },
});

export default store;
