async function fetchPosts(userId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
  );
  if (!response.ok) {
    throw new Error(`Erreur pour userId ${userId}`);
  }
  const posts = await response.json();
  return posts;
}

export async function fetchPostsSequential(userIds) {
  const posts = [];
  for (const userId of userIds) {
    const userPosts = await fetchPosts(userId);

    posts.push(userPosts);
  }
  return posts;
}
export async function fetchPostsParallel(userIds) {
  const fetchPromises = userIds.map(async (userId) => {
    const userPosts = await fetchPosts(userId);
    return userPosts;
  });
  return Promise.all(fetchPromises);
}

const userIds = [1, 2, 3, 4, 5];
// console.time("Sequential");

// const sequentialResults = await fetchPostsSequential(userIds);

// console.timeEnd("Sequential");

// console.time("Parallel");

// const parallelResults = await fetchPostsParallel(userIds);

// console.timeEnd("Parallel");

// Sequential: 752.704ms
// Parallel: 275.476ms
// => le parallèle est-il plus rapide
//Sequential: Une requête à la fois => Attend chaque réponse=> Temps approximatif : somme des durées=>Plus lent généralement
//Parallel: Plusieurs requêtes simultanées=> Attend toutes les réponses => Temps approximatif : durée de la requête la plus lente=>Plus rapide généralement
