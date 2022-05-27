const express = require("express");
const router = express.Router();
const { fetchPosts } = require("../db/posts");
const { API_URL } = require("../utils/constants");

const getPosts = async (req, res) => {
  try {
    let posts = await fetchPosts(API_URL);
    res.json(posts);
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};
/**
 * @GET POSTS
 */
router.get("/posts", getPosts);

/**
 * TODO: Implement more Routes, if needed
 */

module.exports = { getPosts, router };
