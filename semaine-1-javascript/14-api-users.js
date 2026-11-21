async function getUserNames(url) {
  try {
    const response = await fetch(url);
    const users = await response.json();
    return users.map((user) => user.name).sort();
  } catch (error) {
    console.error("Error fetching user names:", error);
    return [];
  }
}
getUserNames("https://jsonplaceholder.typicode.com/users");
