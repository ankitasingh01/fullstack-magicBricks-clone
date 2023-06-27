import axios from "axios";
import React, { createContext, useEffect, useReducer } from "react";

export const ListedPropertiesContext = createContext(null);

const initialState = {
  allData: [],
  isLoading: false,
  error: "",
};

const imageObject = [
  "Bedroom",
  "EntranceRoom",
  "LivingRoom",
  "LivingRoomWithNoKitchen",
  "StudyRoom",
  "TVRoom",
];

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_DATA_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_DATA_SUCCESS":
      return {
        ...state,
        allData: action.payload,
        isLoading: false,
      };
    case "FETCH_DATA_FAILED":
      return {
        ...state,
        error: action.error,
      };
  }
};

export const ListedPropertiesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { allData, isLoading, error } = state;
  useEffect(() => {
    dispatch({ type: "FETCH_DATA_REQUEST" });
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        let count = 0;
        const newData =
          response.data.length &&
          response.data.map((element) => {
            if (count === 6) {
              count = 0;
            }
            return {
              ...element,
              ObjectImage: imageObject[count++],
            };
          });
        dispatch({ type: "FETCH_DATA_SUCCESS", payload: newData });
      })
      .catch((error) => {
        dispatch({ type: "FETCH_DATA_FAILED", error: error.message });
      });
  }, []);

  const contextValues = {
    allData,
    isLoading,
    error,
  };

  return (
    <ListedPropertiesContext.Provider value={contextValues}>
      {children}
    </ListedPropertiesContext.Provider>
  );
};
