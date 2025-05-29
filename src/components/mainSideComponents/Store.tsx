import React from "react";
import { bscTestnet, sepolia } from "viem/chains";
import { useReadContract } from "wagmi";
import { StoreItem } from "./StoreItem";

function Store() {

  const { data: memberList } = useReadContract({
    chainId: bscTestnet.id,
    address: `0x${process.env.NEXT_PUBLIC_DAO_CONTRACT}`,
    functionName: 'getAllMember',
    abi: [
      {
        "inputs": [],
        "name": "getAllMember",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
      },
    ],
    args: [],
  });

  return (
    <div className=" w-full flex gap-4 p-3 bg-white rounded-xl overflow-hidden ">
      { memberList !== undefined && memberList.map((item: any, index: number) => (
          <StoreItem address={item} id={index}/>
      ))}
    </div>
  );
}

export default Store;
