"use client";

import PaperCard from "./PaperCard";

export default function RecentlyAdded({uploads}) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Recently Added</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {uploads.map((data,index) => (
          <PaperCard key={index} paper={data} />
        ))}
      </div>
    </section>
  );
}