"use client";
import React from "react";
import { useParams } from "next/navigation";

const paperDetails = {
  1: { title: "AI in Medicine", funded: 500, goal: 1000, description: "Research on AI applications in healthcare." },
  2: { title: "Blockchain for Science", funded: 1200, goal: 2000, description: "Exploring blockchain solutions for research funding." },
};

export default function Funds() {
  const { id } = useParams();
  console.log(id);
  const paper = paperDetails[1]; // Convert id to a number

  if (!paper) return <p className="text-center text-red-500">Paper not found.</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold">{paper.title}</h2>
      <p className="text-gray-700">{paper.description}</p>
      <p className="text-gray-600 mt-4">Funded: ${paper.funded} / ${paper.goal}</p>

      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(paper.funded / paper.goal) * 100}%` }}></div>
      </div>

      <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
        Fund This Paper
      </button>
    </div>
  );
}
