export async function retry(fn, attempts) {
  for (let i = 1; i <= attempts; i++) {
    try {
      console.log(`Tentative ${i}...`);
      return await fn();
    } catch (error) {
      console.log(`Échec de la tentative ${i}`);
      if (attempts === i) {
        throw error;
      }
    }
  }
}

async function unstableOperation() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let randomNumber = Math.random();
  console.log(`Nombre aléatoire généré : ${randomNumber}`);
  if (randomNumber < 0.5) {
    throw new Error("Erreur aléatoire !");
  }

  return "Opération réussie !";
}

async function main() {
  try {
    const result = await retry(unstableOperation, 5);
    console.log(result);
  } catch (error) {
    console.log("Échec définitif :", error.message);
  }
}

// main();
