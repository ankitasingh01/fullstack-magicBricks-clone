import { createSlice, current } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FLAT_CATEGORIES, FLAT_MIN_BUDGET, FLAT_MAX_BUDGET } from "./constant";
// Extra reducers can also be written as
/* 
extraReducers:{
  ["updateProperty/fetchPosts"]: (state)=>{
    state.allData = action.payload
  }
}
*/

const imageObject = [
  "Bedroom",
  "EntranceRoom",
  "LivingRoom",
  "LivingRoomWithNoKitchen",
  "StudyRoom",
  "TVRoom"
];
const initialState = {
  allData: [],
  updatePostData: [],
  loading: false,
  error: ""
};

export const fetchPosts = createAsyncThunk("updateProperty/fetchPosts", () => {
  return axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
      let count = 0;
      let flatCatCount = 0;
      let minbudgetCount = 0;
      let maxbudgetCount = 10;
      const newData =
        response.data.length &&
        response.data.map((element) => {
          if (count === 6) {
            count = 0;
          }
          if (flatCatCount === 13) {
            flatCatCount = 0;
          }
          if (maxbudgetCount === 0) {
            maxbudgetCount = 10;
            minbudgetCount = 0;
          }
          return {
            ...element,
            flatCategory: FLAT_CATEGORIES[flatCatCount++],
            flatBudget:
              minbudgetCount < 10
                ? FLAT_MIN_BUDGET[minbudgetCount++]
                : FLAT_MAX_BUDGET[--maxbudgetCount],
            ObjectImage: imageObject[count++]
          };
        });
      return newData;
    });
});

export const updateSingleProperty = createAsyncThunk(
  "updateProperty/updateSingleProperty",
  ({ id, title, body, userId }) => {
    return axios
      .put("https://jsonplaceholder.typicode.com/posts/" + id, {
        id,
        title,
        body,
        userId
      })
      .then((response) => response.data);
  }
);

export const duplicateProperty = createAsyncThunk(
  "updateProperty/duplicateProperty",
  ({ id, title, body, userId }) => {
    return axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        title,
        body,
        userId
      })
      .then((response) => response.data);
  }
);

export const deleteProperty = createAsyncThunk(
  "updateProperty/deleteProperty",
  ({ id }) => {
    return axios
      .delete("https://jsonplaceholder.typicode.com/posts/" + id)
      .then((response) => {
        return id;
      });
  }
);

const ListedPropertiesReducer = createSlice({
  name: "updateProperty",
  initialState,
  reducers: {
    searchProperty: (state, action) => {
      // console.log(current(state));
      state.updatePostData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.allData = action.payload;
      state.updatePostData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.allData = [];
      state.updatePostData = [];
      state.error = action.error.message;
    });
    builder.addCase(updateSingleProperty.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateSingleProperty.fulfilled, (state, action) => {
      let index = state.allData.findIndex(
        (allUser) => allUser.id === action.payload.id
      );
      //this is working because id is coming as index, if ID would have been different it wont hv worked
      let temp = [...state.allData];
      temp[index] = action.payload;
      state.updatePostData = temp;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(updateSingleProperty.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.updatePostData = [];
    });
    builder.addCase(duplicateProperty.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(duplicateProperty.fulfilled, (state, action) => {
      const temporaryData = [...state.updatePostData, action.payload];
      state.updatePostData = temporaryData;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(duplicateProperty.rejected, (state, action) => {
      state.updatePostData = [];
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteProperty.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProperty.fulfilled, (state, action) => {
      const newIndex = state.allData.findIndex(
        (postData) => postData.id === action.payload
      );
      state.allData.splice(newIndex, 1);
      let newArray = [...state.allData];
      state.updatePostData = newArray;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(deleteProperty.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.updatePostData = [];
    });
  }
});

export default ListedPropertiesReducer.reducer;
export const { searchProperty } = ListedPropertiesReducer.actions;
