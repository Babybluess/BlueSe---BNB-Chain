import React from "react";
import { bscTestnet, sepolia } from "viem/chains";
import { useEnsName, useReadContract } from "wagmi";

export const StoreItem = ({address, id} : {address : string, id:number}) => {

    const { data: ensName } = useEnsName({
        address: address,
        chainId: bscTestnet.id,
    });

    const { data: isBan } = useReadContract({
      chainId: bscTestnet.id,
      address: `0x${process.env.NEXT_PUBLIC_DAO_CONTRACT}`,
      functionName: 'bannedAccount',
      abi: [
        {
          inputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          name: 'bannedAccount',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
      ],
      args: [`0x${address.substring(2, 42)}`],
    });


    return (
        <div className={` ${id == 4 || isBan ? "hidden" : "justify-center items-center flex flex-col" }`} >
          <div className=" w-16 h-16 cursor-pointer rounded-xl border-2 border-[#703EFF]">
            <img
              className=" w-full h-full rounded-xl object-cover"
              src={`https:/euc.li/sepolia/${ensName}`}
              alt=""
            />
          </div>
          <p className=" font-semibold text-xs">{ensName}</p>
        </div>
    )
}