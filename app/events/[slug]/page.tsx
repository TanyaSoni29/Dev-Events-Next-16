import EventDetails from "@/components/EventDetails";
import { Suspense } from "react";

type PageProps = {
  params: {
    slug: string;
  };
};

const EventDetailsPage = async ({ params }: PageProps) => {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <EventDetails slug={params.slug} />
      </Suspense>
    </main>
  );
};

export default EventDetailsPage;
