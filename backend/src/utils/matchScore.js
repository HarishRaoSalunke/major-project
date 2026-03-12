import { cosineSimilarity } from "./cosineSimilarity.js";
import { geoScore } from "./geoDistance.js";
import { calculateTimeScore } from "./timeScore.js";

export default function calculateMatchScore(lostItem, foundItem) {
  const textScore = cosineSimilarity(lostItem.embedding, foundItem.embedding);

  const locationScore = geoScore(lostItem.coordinates, foundItem.coordinates);

  //   const timeMatch =
  //     calculateTimeScore(lostItem.createdAt, foundItem.createdAt) / 100;
  const timeMatch = calculateTimeScore(lostItem.createdAt, foundItem.createdAt);

  return textScore * 0.5 + locationScore * 0.3 + timeMatch * 0.2;
}
