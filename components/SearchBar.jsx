"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState(""); // Stores search input
  const [data, setData] = useState([]); // Stores API data
  const [filteredData, setFilteredData] = useState([]); // Stores filtered results

  useEffect(() => {
    fetch("https://desci.onrender.com/api/data")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setFilteredData(res);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter data dynamically based on search term
    const filtered = data.filter((item) =>
      item.filename.toLowerCase().includes(value) // Adjust 'title' based on API structure
    );

    setFilteredData(filtered);
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        
        <input
          type="text"
          placeholder="Paper about French Revolution"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-12 py-4 bg-white rounded-xl shadow-sm border border-lavender-100 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
      </div>

      {searchTerm && (
        <ul className="mt-4 bg-white shadow-lg rounded-xl p-4">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <li key={index} className="border-b py-2 text-gray-700">
                {item.filename} 
              </li>
            ))
          ) : (
            <p className="text-gray-500">No results found.</p>
          )}
        </ul>
      )}
    </div>
  );
}
