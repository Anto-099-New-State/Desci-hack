"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractABI from "@/app/contracts/contractFund.json";

const contractAddress = "0xf88c66091c1186C02A8F234C7DC74ea42898d7eb";

export default function DonateToCampaign() {
  const [campaigns, setCampaigns] = useState([]);
  const [donationAmounts, setDonationAmounts] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch campaigns from backend
  useEffect(() => {
    fetch("https://desci.onrender.com/api/campaigns")
      .then((res) => res.json())
      .then((data) => setCampaigns(data))
      .catch((error) => console.error("Error fetching campaigns:", error));
  }, []);

  // Update the donation amount for a specific campaign
  const handleAmountChange = (e, campaignGoal) => {
    setDonationAmounts((prev) => ({
      ...prev,
      [campaignGoal]: e.target.value,
    }));
  };

  async function handleDonate(e, campaignId) {
    e.preventDefault();
  
    if (!window.ethereum) {
      alert("MetaMask is not installed! Install MetaMask and try again.");
      return;
    }
  
    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
      const donationAmount = donationAmounts[campaignId] || "0";
      const donationInWei = ethers.parseUnits(donationAmount, "gwei"); // Convert to Wei
  
      // Get wallet balance
      const balance = await provider.getBalance(signer.address);
      const balanceInWei = ethers.formatUnits(balance, "gwei");
  
      console.log("Wallet Balance:", balanceInWei, "Gwei");
      console.log("Donation Amount:", donationAmount, "Gwei");
  
      // Check if user has enough funds
      if (BigInt(donationInWei) > BigInt(ethers.parseUnits(balanceInWei, "gwei"))) {
        alert("Insufficient funds! Reduce donation amount.");
        setLoading(false);
        return;
      }
  
      // Send transaction with campaignId
      const tx = await contract.donate(campaignId, { value: BigInt(donationInWei) });
      await tx.wait();
  
      alert(`Successfully donated ${donationAmount} Gwei to Campaign ${campaignId}`);
    } catch (error) {
      console.error("Error donating:", error);
      alert("Error processing donation! Check console for details.");
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Donate to a Campaign</h2>

      {/* Display campaigns with donate button */}
      <div className="space-y-4">
        {campaigns.length > 0 ? (
          campaigns.map((campaign) => (
            <div key={campaign._id} className="flex justify-between items-center border p-4 rounded-lg shadow">
              <div>
                <p className="text-lg font-semibold">CamapignId: {campaign._id}</p>
                <p className="text-lg font-semibold">Goal: {campaign.goal} Gwei</p>
              </div>

              {/* Donation Input & Button */}
              <form onSubmit={(e) => handleDonate(e, campaign.goal)} className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Amount (Gwei)"
                  className="border rounded-lg px-3 py-1 text-sm w-24"
                  value={donationAmounts[campaign.goal] || ""}
                  onChange={(e) => handleAmountChange(e, campaign.goal)}
                  required
                />
                <button
                  type="submit"
                  className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Donate"}
                </button>
              </form>
            </div>
          ))
        ) : (
          <p>No campaigns available.</p>
        )}
      </div>
    </div>
  );
}
