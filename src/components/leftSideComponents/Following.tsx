import React, { useState } from 'react';
import { FriendModal } from './FriendModal';
import { useAccount, useReadContract } from 'wagmi';
import { bscTestnet, sepolia } from 'viem/chains';

function Following() {
  const { address } = useAccount();

  const { data: memberList } = useReadContract({
    chainId: bscTestnet.id,
    address: `0x${process.env.NEXT_PUBLIC_DAO_CONTRACT}`,
    functionName: 'getAllMember',
    abi: [
      {
        inputs: [],
        name: 'getAllMember',
        outputs: [
          {
            internalType: 'address[]',
            name: '',
            type: 'address[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    args: [],
  });

  return (
    <div className=" w-full p-3 flex flex-col gap-5 rounded-xl bg-white">
      <div className=" flex justify-between">
        <p className=" font-bold text-gray-400">Following</p>
        <p className=" font-bold text-gray-500 cursor-pointer">See all</p>
      </div>
      <div className=" flex flex-col gap-5">
        {memberList !== undefined &&
          address !== undefined &&
          memberList.map((item: any, index: number) => (
            <FriendModal signer={address} accountAddress={item} id={index} />
          ))}
      </div>
    </div>
  );
}

export default Following;
