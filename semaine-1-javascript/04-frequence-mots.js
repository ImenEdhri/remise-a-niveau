function wordFrequency(text) {
  const words = text.toLowerCase().split(" ");
  const frequency = {};
  words.forEach((word) => {
    if (!frequency[word]) {
      frequency[word] = 1;
    } else {
      frequency[word] += 1;
    }
  });
  console.log(frequency);
  return frequency;
}
wordFrequency("Le chat et le chien");
// wordFrequency("Le chat et le chien") → { le: 2, chat: 1, et: 1, chien: 1 }
