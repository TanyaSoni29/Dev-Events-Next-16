import EventDetails from "@/components/EventDetails";
import { Suspense } from "react";
import { getAllEventSlugs } from "@/lib/actions/event.action";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const slugs = await getAllEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

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
