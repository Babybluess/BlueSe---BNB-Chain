import React from 'react'
import Store from './mainSideComponents/Store'
import CreatePost from './mainSideComponents/CreatePost'
import PostList from './mainSideComponents/PostList'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import { useReadContract } from 'wagmi'
import { bscTestnet, sepolia } from 'viem/chains'

function MainSide({ address, name, avatar }: { address: string, name: string, avatar: string }) {

  const { data: postList } = useReadContract({
    chainId: bscTestnet.id,
    address: `0x${process.env.NEXT_PUBLIC_DAO_CONTRACT}`,
    functionName: 'getAllPost',
    abi: [
      {
        "inputs": [],
        "name": "getAllPost",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "context",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "caption",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "typeContext",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalLike",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalComment",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct BlueSe.Post[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
      },
    ],
    args: [],
  });

  console.log("xx", postList)


  return (
    <ThirdwebProvider
      activeChain="ethereum"
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
    >
      <div className=' w-[45%] flex flex-col gap-5'>
        <Store />
        <CreatePost address={address} name={name} avatar={avatar} />
        {
          postList !== undefined && postList.map((item:any, index:number) => (
            <PostList id={index} address={address} avatar={avatar} item={item} owner={item.owner}/>
          ))
        }
      </div>
    </ThirdwebProvider>
  )
}

export default MainSide