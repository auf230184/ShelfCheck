import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    pushToken: v.optional(v.string()),
  }),

  products: defineTable({
    userId: v.id("users"),
    barcode: v.string(),
    name: v.string(),
    brand: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    expiryDate: v.number(),
    quantity: v.number(),
    unit: v.string(),
    calories: v.optional(v.number()),
    protein: v.optional(v.number()),
    carbs: v.optional(v.number()),
    fat: v.optional(v.number()),
    fiber: v.optional(v.number()),
    sugar: v.optional(v.number()),
    salt: v.optional(v.number()),
    nutriScore: v.optional(v.string()),
    healthRating: v.union(
      v.literal("GREEN"),
      v.literal("YELLOW"),
      v.literal("RED")
    ),
  }).index("by_user", ["userId"]),
});