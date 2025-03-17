"use client";

import { useState, useEffect } from "react";
import PaperCard from "./PaperCard";

export default function RecentlyAdded({ uploads }) {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    fetch("https://desci.onrender.com/api/data")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPapers(data);
      })
      .catch((error) => console.error("Error fetching papers:", error));
  }, []);

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Recently Added</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {papers.length > 0 ? (
          papers.map((data, index) => <PaperCard key={index} paper={data} />)
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
  );
}
