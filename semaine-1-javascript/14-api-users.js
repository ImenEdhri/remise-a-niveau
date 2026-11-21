export async function getUserNames( url = "https://jsonplaceholder.typicode.com/users") {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return [];
    }
    const users = await response.json(); 
    return users.map((user) => user.name).sort();
  } catch (error) {
    console.error("Error fetching user names:", error);
    return [];
  }
}
// console.log(await getUserNames());
