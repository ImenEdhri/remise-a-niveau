export function formatId(id: string | number): string {
  let result: string = `${id}`;
  if (typeof id === "number" && id < 1000) {
    result = `${id}`;

    while (result.length < 4) {
      result = `0` + result;
    }
  } else if (typeof id === "string") {
    result = id.toUpperCase();
  }

  return `#${result}`;
}
