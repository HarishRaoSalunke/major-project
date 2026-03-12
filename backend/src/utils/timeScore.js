export const calculateTimeScore = (date1, date2) => {
  const diffDays =
    Math.abs(new Date(date1) - new Date(date2)) / (1000 * 60 * 60 * 24);

  // if (diffDays <= 1) return 100;
  // if (diffDays <= 3) return 80;
  // if (diffDays <= 7) return 60;
  // if (diffDays <= 14) return 40;
  // return 20;
  if (diffDays <= 1) return 1;
  if (diffDays <= 3) return 0.8;
  if (diffDays <= 7) return 0.6;
  if (diffDays <= 14) return 0.4;
  return 0.2;
};
