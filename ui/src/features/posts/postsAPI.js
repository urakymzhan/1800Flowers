// A function to mimic making an async request for data

export function fetchPosts() {
  return fetch("/api/posts");
}
