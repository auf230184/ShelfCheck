import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("products")
      .withIndex("by_user", q => q.eq("userId", args.userId))
      .order("asc")
      .collect();
  },
});

export const add = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("products", args);
  },
});

export const remove = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});