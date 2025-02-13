import { Triangle, Square, MoreVertical } from "lucide-react";

export default function PaperCard({ paper }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-lavender-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex space-x-2">
          <Triangle className="w-5 h-5 text-pink-500" />
          <Square className="w-5 h-5 text-lavender-500" />
        </div>
        <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
        {paper._id}
        </span>
      </div>
      <h3 className="font-semibold mb-2">{paper.fileUrl.substring(1,10)}</h3>
      <p className="text-sm text-gray-600 mb-4">{paper.filename.substring(0,6)}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{paper.date}</span>
        <button className="hover:bg-gray-100 p-1 rounded-full">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}