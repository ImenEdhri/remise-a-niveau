export function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Délai dépassé")), ms);
  });
  return Promise.race([promise, timeout]);
}

const fastOperation = new Promise(resolve => {
  setTimeout(() => resolve("Succès !"), 1000);
});

async function test() {
  try {
    const result = await withTimeout(fastOperation, 500);
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}

test();
