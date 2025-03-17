"use client";
import { useState } from "react";
import { ethers } from "ethers";
import contractABI from "@/app/contracts/contractFund.json";

const contractAddress = "0xf88c66091c1186C02A8F234C7DC74ea42898d7eb";

export default function CreateFund() {
  const [goal, setGoal] = useState("");
  const [campaignId, setCampaignId] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleCreateCampaign(e) {
    e.preventDefault();

    console.log("Ethers:", ethers);
    console.log("window.ethereum:", window.ethereum);

    if (!window.ethereum) {
      alert("MetaMask is not installed! Install MetaMask and try again.");
      return;
    }

    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const goalInWei = ethers.parseUnits(goal, "gwei"); // Convert from Gwei
      console.log("Goal in Wei:", goalInWei.toString());

      const tx = await contract.createCampaign(goalInWei);
      await tx.wait();

      const count = await contract.campaignCount();
      setCampaignId(count.toString());
      alert(`Campaign created! ID: ${count.toString()}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating campaign! Check the console.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold">Create a Campaign</h2>
      <form onSubmit={handleCreateCampaign}>
        <label>
          Goal (in Gwei):
          <input
            className="text-gray-700 border-r-2"
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Enter goal in Gwei"
            required
          />
        </label>
        <button className="mt-4 w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Campaign"}
        </button>
      </form>
      {campaignId && <p><strong>Campaign ID:</strong> {campaignId}</p>}
    </div>
  );
}
