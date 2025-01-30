export function calculatePercentage(fiveStarReview) {
    const minValue = 4; 
    const maxValue = 5;
  
    // Calculate the percentage based on the range
  
    if (4.75 < fiveStarReview) {
      return 100;
    } else if (3.75 < fiveStarReview && fiveStarReview < 4) {
      return 80;
    } else if (2.75 < fiveStarReview && fiveStarReview < 3) {
      return 60;
    } else if (1.75 < fiveStarReview && fiveStarReview < 2) {
      return 40;
    } else if (0.75 < fiveStarReview && fiveStarReview < 1) {
    return 20;
    } else {
      return ((fiveStarReview - minValue) / (maxValue - minValue)) * 20 + 80;
    }
  }