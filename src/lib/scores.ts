/**
 * Score utilities. All of these operate on numbers already stored on the
 * seed data (0-100 scale) — they don't invent new precision, they just
 * combine and label what's already there in a transparent, testable way.
 * See /methodology for the plain-language explanation shown to users.
 */

export function marketGapIndex(globalScore: number, koreaScore: number): number {
  return Math.round((globalScore - koreaScore) * 10) / 10;
}

export function gapLabel(gap: number): string {
  if (gap > 5) return "Stronger overseas";
  if (gap < -5) return "Stronger in Korea";
  return "Balanced";
}

export function polarizationScore(positiveRatio: number, negativeRatioEstimate = 1 - positiveRatio): number {
  // Higher when both positive and negative are simultaneously high relative
  // to a neutral middle — i.e. when there isn't much lukewarm middle ground.
  const middle = Math.max(0, 1 - positiveRatio - negativeRatioEstimate);
  return Math.round((1 - middle) * (positiveRatio > 0.35 && negativeRatioEstimate > 0.15 ? 1 : 0.6) * 100);
}

export function trendDirection(pct: number): "up" | "down" | "neutral" {
  if (pct > 0.5) return "up";
  if (pct < -0.5) return "down";
  return "neutral";
}

export function formatPct(pct: number, digits = 1): string {
  const sign = pct > 0 ? "+" : "";
  return `${sign}${pct.toFixed(digits)}%`;
}

export function averageScore(scores: number[]): number {
  if (scores.length === 0) return 0;
  return Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10;
}

export function weightedAttentionScore(input: {
  searchInterest: number; // 0-100
  socialMentions: number; // 0-100
  reviewGrowth: number; // 0-100
  channelExpansion: number; // 0-100
  contentSpread: number; // 0-100
}): number {
  const weights = {
    searchInterest: 0.3,
    socialMentions: 0.25,
    reviewGrowth: 0.2,
    channelExpansion: 0.15,
    contentSpread: 0.1,
  };
  const total =
    input.searchInterest * weights.searchInterest +
    input.socialMentions * weights.socialMentions +
    input.reviewGrowth * weights.reviewGrowth +
    input.channelExpansion * weights.channelExpansion +
    input.contentSpread * weights.contentSpread;
  return Math.round(total);
}

export function dataConfidenceLabel(score: number): "High" | "Medium" | "Low" {
  if (score >= 75) return "High";
  if (score >= 50) return "Medium";
  return "Low";
}
