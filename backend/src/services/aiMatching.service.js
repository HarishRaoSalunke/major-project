import LostItem from "../models/lostItem.model.js";
import { cosineSimilarity } from "../utils/cosineSimilarity.js";
import { geoScore } from "../utils/geoDistance.js";
import { calculateTimeScore } from "../utils/timeScore.js";
import { calculateFinalScore } from "./scoring.service.js";
import { notifyMatch } from "./notification.service.js";

export const processMatching = async (newItem) => {
  try {
    const oppositeType = newItem.type === "lost" ? "found" : "lost";

    const candidates = await LostItem.find({
      type: oppositeType,
      status: "active",
    });

    for (let candidate of candidates) {
      //   const textScore =
      //     cosineSimilarity(newItem.embedding, candidate.embedding) * 100;
      const textScore =
        newItem.embedding && candidate.embedding
          ? cosineSimilarity(newItem.embedding, candidate.embedding) * 100
          : 0;

      const imageScore =
        newItem.imageEmbedding && candidate.imageEmbedding
          ? cosineSimilarity(newItem.imageEmbedding, candidate.imageEmbedding) *
            100
          : 0;

      const locationScore = geoScore(
        newItem.coordinates,
        candidate.coordinates,
      );

      const timeScore = calculateTimeScore(
        newItem.createdAt,
        candidate.createdAt,
      );

      const { finalScore, breakdown } = calculateFinalScore(
        textScore,
        imageScore,
        locationScore,
        timeScore,
      );
      const alreadyMatched = newItem.matches.some(
        (m) => m.itemId.toString() === candidate._id.toString(),
      );
      //   if (finalScore > 60) {
      //     newItem.matches.push({
      //       itemId: candidate._id,
      //       score: finalScore,
      //       breakdown,
      //     });

      if (!alreadyMatched && finalScore > 60) {
        // Push to new item
        newItem.matches.push({
          itemId: candidate._id,
          score: finalScore,
          breakdown,
        });

        // Push reverse match to candidate
        candidate.matches.push({
          itemId: newItem._id,
          score: finalScore,
          breakdown,
        });

        await candidate.save();
        if (newItem.type === "lost") {
          await notifyMatch(newItem, candidate, finalScore);
        } else {
          await notifyMatch(candidate, newItem, finalScore);
        }
      }
    }

    await newItem.save();
  } catch (error) {
    console.log("AI Matching Error:", error);
  }
};
