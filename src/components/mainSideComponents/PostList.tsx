'use client';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import { bscTestnet } from 'viem/chains';
import { useEnsName, useReadContract, useWriteContract, useAccount } from 'wagmi';
import { CommentModal } from './CommentModal';
import { ListItemSecondaryAction } from '@mui/material';

function PostList({
  id,
  address,
  avatar,
  item,
  owner,
}: {
  id: number;
  address: string;
  avatar: string;
  item: any;
  owner: string;
}) {
  const [isActive, setActive] = useState(true);
  const { writeContractAsync } = useWriteContract();
  const [comment, setComment] = useState();
  const [isOpenMenu, setOpenMenu] = useState(false);

  const ensName = useEnsName({
    address: `0x${owner.substring(2)}`,
    chainId: bscTestnet.id,
  });

  //Like post
  const likePost = () => {
    const accept = writeContractAsync({
      chainId: bscTestnet.id,
      address: `0x${process.env.NEXT_PUBLIC_DAO_CONTRACT}`,
      functionName: 'likePost',
      abi: [
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_id',
              type: 'uint256',
            },
          ],
          name: 'likePost',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      args: [BigInt(id)],
    });

    const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 10000));
    toast.promise(resolveAfter3Sec, {
      pending: 'Like post pending 🚀',
      success: 'Successful 👌',
      error: 'Rejected 🤯',
    });

    setTimeout(() => {
      location.reload();
    }, 20000);
  };

  //Quit like
  const quitLike = () => {
    const accept = writeContractAsync({
      chainId: bscTestnet.id,
      address: `0x${process.env.NEXT_PUBLIC_DAO_CONTRACT}`,
      functionName: 'quitLike',
      abi: [
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_id',
              type: 'uint256',
            },
          ],
          name: 'quitLike',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      args: [BigInt(id)],
    });

    const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 10000));
    toast.promise(resolveAfter3Sec, {
      pending: 'Quit like pending 🚀',
      success: 'Successful 👌',
      error: 'Rejected 🤯',
    });

    setTimeout(() => {
      location.reload();
    }, 20000);
  };

  //check like
  const { data: isLike } = useReadContract({
    chainId: bscTestnet.id,
    address: `0x${process.env.NEXT_PUBLIC_DAO_CONTRACT}`,
    functionName: 'isLiked',
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        name: 'isLiked',
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
    args: [`0x${address.substring(2, 42)}`, BigInt(id)],
  });

  //Commnet post
  const commentPost = () => {
    const accept = writeContractAsync({
      chainId: bscTestnet.id,
      address: `0x${process.env.NEXT_PUBLIC_DAO_CONTRACT}`,
      functionName: 'commentPost',
      abi: [
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_id',
              type: 'uint256',
            },
            {
              internalType: 'string',
              name: '_context',
              type: 'string',
            },
            {
              internalType: 'address',
              name: '_replyPers',
              type: 'address',
            },
          ],
          name: 'commentPost',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      args: [BigInt(id), comment, `0x${owner.substring(2, 42)}`],
    });

    const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 10000));
    toast.promise(resolveAfter3Sec, {
      pending: 'Comment post pending 🚀',
      success: 'Successful 👌',
      error: 'Rejected 🤯',
    });

    setTimeout(() => {
      location.reload();
    }, 20000);
  };

  // List comment
  const [commentlist, setList] = useState<any>([]);

  if (item.totalComment > 0) {
    for (let i = 0; i < item.totalComment; i++) {
      const { data: items } = useReadContract({
        chainId: bscTestnet.id,
        address: `0x${process.env.NEXT_PUBLIC_DAO_CONTRACT}`,
        functionName: 'commentList',
        abi: [
          {
            inputs: [
              {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
              },
            ],
            name: 'commentList',
            outputs: [
              {
                internalType: 'uint256',
                name: 'idPost',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'string',
                name: 'context',
                type: 'string',
              },
              {
                internalType: 'address',
                name: 'replyPerson',
                type: 'address',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
        ],
        args: [BigInt(id), BigInt(i)],
      });

      commentlist.push(items);
    }
  }

  const array = commentlist.splice(0, Number(item.totalComment));

  console.log('comment list', array);

  // Report this post
  const reportPost = () => {
    const report = writeContractAsync({
      chainId: bscTestnet.id,
      address: `0x${process.env.NEXT_PUBLIC_DAO_CONTRACT}`,
      functionName: 'reportPost',
      abi: [
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_id',
              type: 'uint256',
            },
          ],
          name: 'reportPost',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      args: [BigInt(id)],
    });

    const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 10000));
    toast.promise(resolveAfter3Sec, {
      pending: 'Repost post pending 🚀',
      success: 'Successful 👌',
      error: 'Rejected 🤯',
    });

    setTimeout(() => {
      location.reload();
    }, 20000);
  };

  return (
    <div className=" w-full flex flex-col gap-5 p-3 bg-white justify-between rounded-xl ">
      {/* header  */}
      <div className=" flex justify-between relative">
        <div className=" flex gap-2">
          <div className=" relative w-12 h-12">
            <img className=" rounded-xl" src={`https:/euc.li/bscTestnet/${ensName.data}`} alt="" />
            {isActive ? (
              <div className=" absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-400"></div>
            ) : (
              <div className=" absolute bottom-0 right-0 w-2 h-2 rounded-full bg-gray-400"></div>
            )}
          </div>
          <div className=" flex flex-col justify-between">
            <p className=" font-bold">{ensName.data}</p>
            {isActive ? (
              <p className=" text-gray-400 text-sm">Active</p>
            ) : (
              <p className=" text-gray-400 text-sm">Not Active</p>
            )}
          </div>
        </div>
        <div onClick={() => setOpenMenu(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 cursor-pointer"
          >
            <path
              fill-rule="evenodd"
              d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div
          className={` ${isOpenMenu ? ' absolute flex right-8 bg-slate-200 border-[1px] border-black  rounded-lg px-1 py-1 ' : 'hidden'}`}
        >
          <button onClick={() => reportPost()} className=" text-sm pl-1 hover:text-red-400">
            Report this post
          </button>
          <div onClick={() => setOpenMenu(false)} className="text-red-500 text-xs cursor-pointer px-2 font-bold">
            X
          </div>
        </div>
      </div>
      {/* cap  */}
      <p>{item.caption}</p>
      {/* post  */}
      <div className=" w-full flex justify-center items-center">
        {item.typeContext === 'image' ? (
          <img width={100} className=" w-full object-cover rounded-xl" src={item.context} alt="" />
        ) : item.typeContext === 'audio' ? (
          <iframe src={item.context} className=" w-full"></iframe>
        ) : item.typeContext === 'file' ? (
          <embed src={item.context} type="application/pdf" height="100vh" width="100%"></embed>
        ) : null}
      </div>
      {/* Infor Post  */}
      <div className=" flex justify-between text-sm text-gray-500">
        <p>{Number(item.totalLike)} likes</p>
        <p>
          {Number(item.totalComment)} comments . {0} sends
        </p>
      </div>
      {/* Interact  */}
      <div className=" flex gap-5">
        {isLike ? (
          <div className=" flex gap-1 cursor-pointer" onClick={() => quitLike()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isLike ? '#703EFF' : '#9CA3AF'}
              className="w-5 h-5"
            >
              <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
            </svg>
            <p className={`text-sm font-semibold ${isLike ? 'text-[#703EFF]' : 'text-gray-500'}`}>Quit</p>
          </div>
        ) : (
          <div className=" flex gap-1 cursor-pointer" onClick={() => likePost()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isLike ? '#703EFF' : '#9CA3AF'}
              className="w-5 h-5"
            >
              <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
            </svg>
            <p className={`text-sm font-semibold ${isLike ? 'text-[#703EFF]' : 'text-gray-500'}`}>Like</p>
          </div>
        )}
        <div className=" flex gap-1 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#9CA3AF" className="w-5 h-5">
            <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
            <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
          </svg>
          <p className="font-semibold text-gray-500 text-sm">Comment</p>
        </div>
        <div className=" flex gap-1 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#9CA3AF" className="w-5 h-5">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
          <p className="font-semibold text-gray-500 text-sm">Send</p>
        </div>
      </div>
      {/* comment  */}
      <div className=" flex justify-between items-center">
        <div className=" w-10 h-10 ">
          <img className=" rounded-full" src={avatar} alt="" />
        </div>
        <div className=" w-[90%] bg-[#E7E7E7] flex rounded-xl p-2 gap-1">
          <input
            onChange={(e: any) => setComment(e.target.value)}
            type="text"
            placeholder="Add a comment..."
            className=" w-[90%] text-gray-500 border-[#E7E7E7] bg-[#E7E7E7] p-2"
            name="comment"
            id="comment"
          />
          <button className=" bg-[#E7E7E7] text-[#703EFF] font-bold text-sm" onClick={() => commentPost()}>
            Comment
          </button>
        </div>
      </div>
      {array.map((item: any, index: number) => (
        <>{item !== undefined && <CommentModal address={item[1]} context={item[2]} />}</>
      ))}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
}

export default PostList;
