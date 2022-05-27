import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "./postsAPI";

const initialState = {
  data: [],
  status: "idle",
  error: "",

  editedPost: {},
};

// thunk and allows us to perform async logic
export const getPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (searchText, { rejectWithValue }) => {
    try {
      const response = await fetchPosts();
      const posts = await response.json();

      let filterePosts = posts.filter(
        (post) => post.title.indexOf(searchText) > -1
      );
      return filterePosts; // `fulfilled` action payload
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    editPost(state, action) {
      state.editedPost = action.payload;
    },
    savePost(state) {
      const { id, title, body } = state.editedPost;
      let data_to_alter = state.data;
      let post = data_to_alter.find((p) => p.id === id);
      post.title = title;
      post.body = body;
      // update - above could be done linearly, but this way its more safe
      state.data = data_to_alter;
    },
  },
  // Field lets the slice handle actions defined elsewhere
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "idle";
        // state.data = [...state.data, ...action.payload]; if needed concat
        state.data = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const { editPost, savePost } = postsSlice.actions;

// Selector function and allows us to select a value from the state
export const selectPosts = (state) => state.posts;

export default postsSlice.reducer;
