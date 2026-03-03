export const generateTextEmbedding = async (text) => {
  const vector = [];
  for (let i = 0; i < 50; i++) {
    vector.push(Math.random());
  }
  return vector;
};
