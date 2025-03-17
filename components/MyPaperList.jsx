"use client";
import { useState, useEffect } from "react";
import { Triangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ethers } from "ethers";
import contractABI from "@/app/contracts/contractFund.json";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const contractAddress = "0xf88c66091c1186C02A8F234C7DC74ea42898d7eb";

export default function MyPaperList() {
  const [papers, setPapers] = useState([]);
  const [address, setAddress] = useState("");
  const [goal, setGoal] = useState("");
  const [campaignId, setCampaignId] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectPaper, setSelectPaper] = useState(null);

  async function handleCreateCampaign(e, paperId) {
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
  
      const goalInWei = ethers.parseUnits(goal, "gwei"); // Convert from Gwei
  
      const tx = await contract.createCampaign(goalInWei);
      await tx.wait();
  
      const count = await contract.campaignCount();
      const newCampaignId = count.toString();
  
      // Store in MongoDB
      await fetch("https://desci.onrender.com/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paperId,
          campaignId: newCampaignId,
          goal,
          walletAddress: address, // Get from localStorage
        }),
      });
  
      setCampaignId((prev) => ({
        ...prev,
        [paperId]: newCampaignId,
      }));
  
      alert(`Campaign created and stored in database! ID: ${newCampaignId}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating campaign! Check the console.");
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    const storedAddress = localStorage.getItem("walletAddress");
    if (storedAddress) {
      setAddress(storedAddress);
    }
  }, []);

  useEffect(() => {
    if (!address) return;

    fetch(`https://desci.onrender.com/api/data/contract/${address}`)
      .then((res) => res.json())
      .then((data) => {
        setPapers(data);
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
                  {campaignId[paper._id] && (
                    <p className="text-green-600 text-sm">
                      Campaign ID: {campaignId[paper._id]}
                    </p>
                  )}
                </div>
              </div>

              {/* Fund Button & Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => setSelectPaper(paper)}
                    disabled={!!campaignId[paper._id]}
                  >
                    {campaignId[paper._id] ? "Fund created" : "Create Fund"}
                  </Button>
                </DialogTrigger>
                {!campaignId[paper._id] && (
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Fund Paper</DialogTitle>
                      <DialogDescription>
                        Create a fund for "{selectPaper?.filename}"
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="goal" className="text-right">
                          Goal
                        </Label>
                        <Input
                          id="goal"
                          className="col-span-3"
                          type="text"
                          value={goal}
                          onChange={(e) => setGoal(e.target.value)}
                          placeholder="Enter goal in Gwei"
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        className="mt-4 w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
                        onClick={(e) => handleCreateCampaign(e, selectPaper._id)}
                        disabled={loading}
                      >
                        {loading ? "Creating..." : "Create Campaign"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                )}
              </Dialog>
            </div>
          ))
        ) : (
          <p>No papers found.</p>
        )}
      </div>
    </section>
  );
}
