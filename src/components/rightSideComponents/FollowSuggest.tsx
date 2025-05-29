'use client';

import React, { useState } from 'react';
import { bscTestnet, sepolia } from 'viem/chains';
import { useReadContract } from 'wagmi';
import { FollowListing } from './FollowListing';
import { useAccount } from 'wagmi';

function FollowSuggest() {
  const [listMember, setMember] = useState<string[]>(['']);
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

  console.log('member', memberList);

  return (
    <div className=" w-full p-3 flex flex-col gap-5 rounded-xl bg-white">
      <div className=" flex justify-between">
        <p className=" font-bold text-gray-400">Following</p>
        <p className=" font-bold text-gray-500 cursor-pointer">See all</p>
      </div>
      {memberList !== undefined
        ? memberList.map((e: any, index: number) => <FollowListing addressAccount={e} signer={address} id={index} />)
        : ''}
    </div>
  );
}

export default FollowSuggest;
