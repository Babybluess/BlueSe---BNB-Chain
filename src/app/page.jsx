
"use client"
import React from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import Home from "./connectPage";
import { useAccount } from "wagmi";

function page () {
  const { address } = useAccount();
  return (
    <ThirdwebProvider 
      activeChain="ethereum"
      clientId= {process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
    >
      <Home address={address} />
    </ThirdwebProvider>
  )
}

export default page;
