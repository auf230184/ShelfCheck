import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: { pushToken: v.optional(v.string()) },
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", { pushToken: args.pushToken });
  },
});

export const updatePushToken = mutation({
  args: { userId: v.id("users"), pushToken: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, { pushToken: args.pushToken });
  },
});

export const get = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});