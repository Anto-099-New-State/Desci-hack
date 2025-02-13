"use client";
import { ConnectButton, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, useAccount } from "wagmi";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { config } from "@/components/Web3Provider"; // Ensure correct import
import "@rainbow-me/rainbowkit/styles.css";

const client = new QueryClient();

const HomeContent = () => {
  const { address, isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected && address) {
      localStorage.setItem("walletAddress", address); // Save wallet address
      router.push("/"); // Redirect to dashboard
    }
  }, [isConnected, address, router]);

  return (
    <main className="flex flex-col justify-center items-center py-10 relative">
  {/* Button positioned in the top-left */}
  <div className="absolute top-4 right-4">
    <ConnectButton />
  </div>
</main>

  );
};

const Home = () => {
  return (
    <div>
      <Head>
        <title>Connect Wallet</title>
        <meta name="description" content="Wallet connection using RainbowKit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WagmiProvider config={config}>
        <QueryClientProvider client={client}>
          <RainbowKitProvider>
            <HomeContent /> {/* Wrapped inside the provider */}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
};

export default Home;