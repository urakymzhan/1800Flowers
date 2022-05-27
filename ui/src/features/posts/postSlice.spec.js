import postReducer, { editPost, savePost } from "./postsSlice.js";

describe("post reducer", () => {
  const initialState = {
    data: [],
    status: "idle",
    error: "",
    editedPost: {},
  };

  it("should handle initial state", () => {
    expect(postReducer(undefined, { type: "unknown" })).toEqual({
      data: [],
      status: "idle",
      error: "",
      editedPost: {},
    });
  });

  it("should store proper values to editedPost", () => {
    let post = { id: 1, userId: 1, title: "title", body: "body" };
    const actual = postReducer(initialState.editedPost, editPost(post));
    expect(actual.editedPost).toEqual(post);
  });

  /**
   * Need more tests here
   */
});
