"use client";
import { useState } from "react";
import { ethers } from "ethers";
import contractABI from "@/app/contracts/contractFund.json";

const contractAddress = "0xf88c66091c1186C02A8F234C7DC74ea42898d7eb";

export default function CheckCampaign() {
  const [campaignId, setCampaignId] = useState("");
  const [goal, setGoal] = useState(null);
  const [fundsRaised, setFundsRaised] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchCampaignDetails(e) {
    e.preventDefault();
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      // Get campaign details
      const campaign = await contract.campaigns(campaignId);

      setGoal(ethers.formatUnits(campaign.goal, "gwei")); // Convert Wei to Gwei
      setFundsRaised(ethers.formatUnits(campaign.fundsRaised, "gwei")); // Convert Wei to Gwei
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to fetch campaign details!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold">Check Campaign Details</h2>
      <form onSubmit={fetchCampaignDetails}>
        <label>
          Campaign ID:
          <input
            className="text-gray-600 mt-4 border-r-2 border-black"
            type="text"
            value={campaignId}
            onChange={(e) => setCampaignId(e.target.value)}
            placeholder="Enter Campaign ID"
            required
          />
        </label>
        <br />
        <button className="mt-4 w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition" type="submit" disabled={loading}>
          {loading ? "Fetching..." : "Check"}
        </button>
      </form>

      {goal !== null && (
        <div>
          <p><strong>Goal Amount:</strong> {goal} Gwei</p>
          <p><strong>Funds Raised:</strong> {fundsRaised} Gwei</p>
        </div>
      )}
    </div>
  );
}
