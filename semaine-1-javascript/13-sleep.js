export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// const delays = [500, 1000, 1500, 1000, 500];
async function countdown() {
  for (let i = 3; i >= 1; i--) {
    console.log(`${i}...`);
    await sleep(3000);
  }

  console.log("Partez !");
}

// countdown();
