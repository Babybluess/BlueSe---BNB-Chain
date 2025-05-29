import React, { useState } from "react";
import { bscTestnet, sepolia } from "viem/chains";
import { useEnsName, useReadContract, useAccount } from "wagmi";

export const FriendModal = ({ signer, accountAddress, id }: { signer: string, accountAddress: string, id: number}) => {

    const [isActive, setActive] = useState(true)

    const { data: isFriend } = useReadContract({
        chainId: bscTestnet.id,
        address: `0x${process.env.NEXT_PUBLIC_DAO_CONTRACT}`,
        functionName: 'friendList',
        abi: [
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "friendList",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
        ],
        args: [`0x${signer.substring(2, 42)}`, BigInt(id)],
    });

    const { data: ensName } = useEnsName({
        address: accountAddress,
        chainId: bscTestnet.id,
    });

    return (
        <div className={`${isFriend && signer !== accountAddress ? "flex gap-2" : "hidden"}`} >
            <div className=" relative w-12 h-12">
                <img className=" rounded-xl" src={`https:/euc.li/sepolia/${ensName}`} alt="" />
                {isActive ? (
                    <div className=" absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-400"></div>
                ) : (
                    <div className=" absolute bottom-0 right-0 w-2 h-2 rounded-full bg-gray-400"></div>
                )}
            </div>
            <div className=" flex flex-col justify-between">
                <p className=" font-bold">{ensName}</p>
                {isActive ? (
                    <p className=" text-gray-400 text-sm">Active</p>
                ) : (
                    <p className=" text-gray-400 text-sm">Not Active</p>
                )}
            </div>
        </div>
    )
}