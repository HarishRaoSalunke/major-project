export const calculateFinalScore = (
  textScore,
  imageScore,
  locationScore,
  timeScore,
) => {
  const finalScore =
    textScore * 0.4 +
    imageScore * 0.25 +
    locationScore * 0.2 +
    timeScore * 0.15;

  return {
    finalScore: Math.round(finalScore),
    breakdown: {
      textScore,
      imageScore,
      locationScore,
      timeScore,
    },
  };
};
