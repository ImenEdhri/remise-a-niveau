export function wordFrequency(text) {
  const words = text.toLowerCase().split(/\s+/).filter(Boolean);
  const frequency = {};
  words.forEach((word) => {
    if (!frequency[word]) {
      frequency[word] = 1;
    } else {
      frequency[word] += 1;
    }
  });
  return frequency;
}
wordFrequency("Le  chat et le chien");
// wordFrequency("Le chat et le chien") → { le: 2, chat: 1, et: 1, chien: 1 }
