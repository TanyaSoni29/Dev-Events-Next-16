"use server";

import { Event } from "@/database";
import connectDB from "../mongodb";

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectDB();

    const event = await Event.findOne({ slug });
    return await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    }).lean(); // the mongodb returns the objects that are not simple object that we render on ui that's why we have to use this lean to convert mongodb object to plan object
  } catch (error) {
    return [];
  }
};

export const getAllEventSlugs = async (): Promise<string[]> => {
  try {
    await connectDB();

    const events = await Event.find({}, { slug: 1 }).lean();

    return events.map((event) => event.slug);
  } catch (error) {
    console.error("getAllEventSlugs error:", error);
    return [];
  }
};
