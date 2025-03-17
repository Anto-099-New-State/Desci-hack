"use client";
import { useState } from "react";

export default function UploadPDF() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF file");

    const formData = new FormData();
    formData.append("pdf", file);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}api/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div>
      <h1>Upload a PDF</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button className="bg-green-600 p-1 rounded-md" onClick={handleUpload}>Upload</button>
      <p>{message}</p>
    </div>
  );
}