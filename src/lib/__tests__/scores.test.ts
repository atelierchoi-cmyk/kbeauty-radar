import { test } from "node:test";
import assert from "node:assert/strict";
import {
  marketGapIndex,
  gapLabel,
  trendDirection,
  formatPct,
  averageScore,
  dataConfidenceLabel,
} from "../scores";

test("marketGapIndex: positive when global beats Korea", () => {
  assert.equal(marketGapIndex(85, 74), 11);
});

test("gapLabel: labels a large positive gap as stronger overseas", () => {
  assert.equal(gapLabel(11), "Stronger overseas");
});

test("gapLabel: labels a large negative gap as stronger in Korea", () => {
  assert.equal(gapLabel(-8), "Stronger in Korea");
});

test("gapLabel: labels a small gap as balanced", () => {
  assert.equal(gapLabel(2), "Balanced");
});

test("trendDirection: classifies up/down/neutral", () => {
  assert.equal(trendDirection(5), "up");
  assert.equal(trendDirection(-5), "down");
  assert.equal(trendDirection(0.1), "neutral");
});

test("formatPct: adds a plus sign for positive values", () => {
  assert.equal(formatPct(14.2), "+14.2%");
  assert.equal(formatPct(-3.4), "-3.4%");
});

test("averageScore: averages a list and returns 0 for empty input", () => {
  assert.equal(averageScore([80, 90, 70]), 80);
  assert.equal(averageScore([]), 0);
});

test("dataConfidenceLabel: buckets scores into High/Medium/Low", () => {
  assert.equal(dataConfidenceLabel(90), "High");
  assert.equal(dataConfidenceLabel(60), "Medium");
  assert.equal(dataConfidenceLabel(30), "Low");
});
