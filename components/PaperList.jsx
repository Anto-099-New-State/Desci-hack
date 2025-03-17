"use client"
import { Triangle, MoreVertical } from "lucide-react";
import { useState,useEffect } from "react";



export default function PaperList() {
  const [papers,setPapers]=useState([]);
  useEffect(() => {
  
      fetch(`https://desci.onrender.com/api/data/`)
        .then((res) => res.json())
        .then((data) => {
          setPapers(data);
        })
        .catch((error) => console.error("Error fetching papers:", error));
    }, []);
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">All Papers</h2>
      <div className="space-y-4">
        {papers.length > 0 ? ( 
        papers.map((paper) => (
          <div
            key={paper._id}
            className="bg-white p-6 rounded-xl border border-lavender-100 flex items-start justify-between hover:shadow-sm transition-shadow"
          >
            <div className="flex space-x-4">
              <Triangle className="w-5 h-5 text-pink-500 mt-1" />
              <li>
                <h3 className="font-semibold mb-1">{paper.filename}</h3>
                <p className="text-sm text-gray-600">{(paper.textContent?.slice(0, 250)) || "No content available"}</p>
                </li>
            </div>
            <button className="hover:bg-gray-100 p-1 rounded-full">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        )) ) : (
          <p>loading...</p>  
        )}
      </div>
    </section>
  );
}