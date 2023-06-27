import { configureStore } from "@reduxjs/toolkit";
import ListedPropertiesReducer from "./ListedPropertiesReducer";

const store = configureStore({
  reducer: {
    updateProperty: ListedPropertiesReducer
  }
});

export default store;
