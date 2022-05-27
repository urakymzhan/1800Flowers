const axios = require("axios");
// Kind of API utility file rather than DB file

const fetchPosts = async (url) => {
  const res = await axios.get(url);
  const { data } = res;
  return data;
};

module.exports = { fetchPosts };
