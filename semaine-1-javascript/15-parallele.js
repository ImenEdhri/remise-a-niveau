async function fetchPosts(userId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
  );
  const posts = await response.json();
  return posts;
}

async function fetchPostsSequential(userIds) {
  const posts = [];
  for (const userId of userIds) {
    const userPosts = await fetchPosts(userId);
    posts.push(...userPosts);
  }
  return posts;
}
async function fetchPostsParallel(userIds) {
  const fetchPromises = userIds.map((userId) => fetchPosts(userId));
  return Promise.all(fetchPromises);
}

const userIds = [1, 2, 3, 4, 5];
console.time("Sequential");

const sequentialResults = await fetchPostsSequential(userIds);

console.timeEnd("Sequential");

console.time("Parallel");

const parallelResults = await fetchPostsParallel(userIds);

console.timeEnd("Parallel");
