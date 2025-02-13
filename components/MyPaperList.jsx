"use client";
import { useState, useEffect } from "react";
import { Triangle, MoreVertical } from "lucide-react";

export default function MyPaperList() {
  const [papers, setPapers] = useState([]);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const storedAddress = localStorage.getItem("walletAddress");
    if (storedAddress) {
      setAddress(storedAddress);
    }
  }, []);

  useEffect(() => {
    if (!address) return; // Prevent fetching if no address is found

    fetch(`https://desci.onrender.com/api/data/contract/${address}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPapers(data); // Ensure state is set correctly
      })
      .catch((error) => console.error("Error fetching papers:", error));
  }, [address]);

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">All Papers</h2>
      <div className="space-y-4">
        {papers.length > 0 ? (
          papers.map((paper) => (
            <div
              key={paper._id}
              className="bg-white p-6 rounded-xl border border-gray-200 flex items-start justify-between hover:shadow-sm transition-shadow"
            >
              <div className="flex space-x-4">
                <Triangle className="w-5 h-5 text-pink-500 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">{paper.filename}</h3>
                </div>
              </div>
              <button className="hover:bg-gray-100 p-1 rounded-full">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          ))
        ) : (
          <p>No papers found.</p>
        )}
      </div>
    </section>
  );
}
