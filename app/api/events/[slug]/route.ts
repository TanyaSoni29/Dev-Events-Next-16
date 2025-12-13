// a route that accept slug input and return the event details

import { Event, IEvent } from "@/database";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

// define route params type for type safety

type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(
  req: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    await connectDB();
    const { slug } = await params;

    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      return NextResponse.json(
        {
          message: "Invalid or missing slug parameter",
        },
        {
          status: 400,
        }
      );
    }

    const senitizedSlug = slug.trim().toLowerCase();
    const event: IEvent | null = await Event.findOne({
      slug: senitizedSlug,
    }).lean();

    if (!event) {
      return NextResponse.json(
        {
          message: `Event with slug "${senitizedSlug}" not found`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Event fetched successfully.",
        event,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch Event",
        error: error instanceof Error ? error.message : "Unknown Error",
      },
      { status: 500 }
    );
  }
}
