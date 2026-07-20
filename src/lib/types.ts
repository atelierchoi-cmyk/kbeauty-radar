export type GrowthStage =
  | "Established"
  | "Global Leader"
  | "Fast Growing"
  | "Viral Rising"
  | "Emerging"
  | "Watchlist";

export interface Brand {
  id: string;
  name: string;
  englishName: string;
  slug: string;
  logoInitial: string;
  logoColor: string;
  positioning: string;
  description: string;
  countryOfOrigin: string;
  foundedYear: number;
  officialUrl: string;
  categories: string[];
  growthStage: GrowthStage;
  competitorSlugs: string[];
  scores: {
    globalAttention: number;
    reviewSentiment: number;
    growthMomentum: number;
    koreaStrength: number;
    globalStrength: number;
    viralImpact: number;
    productDiversity: number;
    dataConfidence: number;
  };
  weeklyGrowthPct: number;
  topCountry: string;
  keyReasons: string[];
  sparkline: number[];
  strengths: string[];
  watchouts: string[];
  positiveKeywords: string[];
  negativeKeywords: string[];
  marketBreakdown: {
    country: string;
    attention: number;
    sentiment: number;
    reviewVolume: number;
    growthPct: number;
    topKeywords: string[];
  }[];
  timeline: {
    date: string;
    type: string;
    label: string;
  }[];
  summary: string[];
}

export interface Product {
  id: string;
  brandSlug: string;
  name: string;
  englishName: string;
  slug: string;
  category: string;
  description: string;
  size: string;
  priceMin: number;
  priceMax: number;
  currency: string;
  keyIngredientSlugs: string[];
  skinTypes: string[];
  skinConcerns: string[];
  reformulated: boolean;
  usageStep: string;
  imageTone: string;
  imageUrl?: string;
  globalReviewScore: number;
  koreaScore: number;
  globalScore: number;
  reviewVolume: number;
  dataConfidence: number;
  lastUpdated: string;
  bestFor: string[];
  considerBefore: string[];
  likes: string[];
  dislikes: string[];
  skinTypeResponse: {
    type: string;
    satisfaction: number;
    positiveKeywords: string[];
    negativeKeywords: string[];
    sampleSize: number;
  }[];
  countryResponse: {
    country: string;
    score: number;
    reviewVolume: number;
    growthPct: number;
  }[];
  retailLinks: {
    name: string;
    type: "Official Store" | "Affiliate Link";
    url: string;
  }[];
}

export interface ReviewAggregate {
  id: string;
  productSlug: string;
  source: string;
  country: string;
  rating: number;
  reviewCount: number;
  positiveRatio: number;
  verifiedPurchaseRatio: number;
  incentivizedRatio: number;
  dataDate: string;
  isDemo: true;
}

export interface CelebrityEvent {
  id: string;
  celebrityName: string;
  brandSlug: string;
  productSlug: string;
  eventDate: string;
  platform: string;
  eventType: string;
  commercialStatus: "Organic mention" | "Product seeding" | "Paid partnership" | "Unconfirmed";
  sourceLabel: string;
  attentionLift: { window: string; pct: number }[];
  socialMentionsChange: number;
  reviewGrowthPct: number;
  sentimentChangePts: number;
  confidenceLevel: "High" | "Medium" | "Low";
  isDemo: true;
}

export interface Country {
  slug: string;
  name: string;
  region: string;
  overallAttention: number;
  risingBrandSlugs: string[];
  risingProductSlugs: string[];
  popularCategories: string[];
  popularIngredientSlugs: string[];
  priceBand: string;
  channels: string[];
  positiveKeywords: string[];
  negativeKeywords: string[];
  koreaGapNote: string;
  climate: string;
}

export interface Ingredient {
  slug: string;
  name: string;
  overview: string;
  attentionChangePct: number;
  relatedBrandSlugs: string[];
  relatedProductSlugs: string[];
  positiveKeywords: string[];
  negativeKeywords: string[];
  skinTypeNotes: { type: string; note: string }[];
  countryAttention: { country: string; score: number }[];
}

export interface Brief {
  slug: string;
  title: string;
  category: string;
  summary: string;
  author: string;
  publishedAt: string;
  dataAsOf: string;
  relatedBrandSlugs: string[];
  relatedProductSlugs: string[];
  sources: string[];
  body: string[];
}

export interface DataSource {
  id: string;
  name: string;
  url: string;
  country: string;
  sourceType: string;
  officialRetailer: boolean;
  supportsVerifiedPurchase: boolean;
  allowsIncentivizedReviews: boolean;
  trustWeight: number;
}

export interface TrendEvent {
  id: string;
  brandSlug: string;
  productSlug?: string;
  eventType: string;
  eventDate: string;
  description: string;
  relatedPerson?: string;
  source: string;
  confidenceLevel: "High" | "Medium" | "Low";
  impactValue: number;
}
