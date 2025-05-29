import React from 'react';
import { bscTestnet, sepolia } from 'viem/chains';
import { useEnsName } from 'wagmi';

export const CommentModal = ({ address, context }: { address : string, context: string }) => {
  const { data: ensName } = useEnsName({
    address: address,
    chainId: bscTestnet.id,
  });

//   console.log(item.owner, item.context);

  return (
    <div className=" flex justify-between items-center">
      <div className=" w-10 h-10 ">
        <img className=" rounded-full" src={`https:/euc.li/sepolia/${ensName}`} alt="" />
      </div>
      <p className=" w-[90%] text-gray-500 border-gray-500 border-[1px] rounded-xl bg-[#E7E7E7] p-2">{context}</p>
    </div>
  );
};
