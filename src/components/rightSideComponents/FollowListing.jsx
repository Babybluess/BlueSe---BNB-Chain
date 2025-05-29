import React, { useState } from 'react';
import { bscTestnet, sepolia } from 'viem/chains';
import { useAccount, useEnsName, useReadContract, useWriteContract } from 'wagmi';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import GroupRemoveOutlinedIcon from '@mui/icons-material/GroupRemoveOutlined';

export const FollowListing = ({ addressAccount, signer, id }) => {
  const [follow, isFollow] = useState(false);
  const [newFriend, setNewFriend] = useState(false);
  const [requests, setRequests] = useState([{ sender: '--', receiver: '--' }]);

  const { data: ensName } = useEnsName({
    address: addressAccount,
    chainId: bscTestnet.id,
  });

  const { data: isFriend } = useReadContract({
    chainId: bscTestnet.id,
    address: `0x${process.env.NEXT_PUBLIC_DAO_CONTRACT}`,
    functionName: 'checkFriend',
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: '_friend',
            type: 'address',
          },
        ],
        name: 'checkFriend',
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
    args: [`0x${addressAccount.substring(2, 42)}`],
    account: [`0x${signer.substring(2, 42)}`],
  });

  console.log('is friend', isFriend);

  const { address } = useAccount();

  const { writeContractAsync } = useWriteContract();

  const addFriend = async () => {
    const add = writeContractAsync({
      chainId: bscTestnet.id,
      address: `0x${process.env.NEXT_PUBLIC_DAO_CONTRACT}`,
      functionName: 'addFriend',
      abi: [
        {
          inputs: [
            {
              internalType: 'address',
              name: '_friendAddress',
              type: 'address',
            },
          ],
          name: 'addFriend',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      args: [`0x${addressAccount.substring(2, 42)}`],
    });

    isFollow(true);

    const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 10000));
    toast.promise(resolveAfter3Sec, {
      pending: 'Wait pending 🚀',
      success: 'Successfully add friend 👌',
      error: 'Rejected to request 🤯',
    });

  };

  const acceptRequest = async () => {
    const accept = writeContractAsync({
      chainId: bscTestnet.id,
      address: `0x${process.env.NEXT_PUBLIC_DAO_CONTRACT}`,
      functionName: 'acceptRequest',
      abi: [
        {
          inputs: [
            {
              internalType: 'address',
              name: '_sender',
              type: 'address',
            },
          ],
          name: 'acceptRequest',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      args: [`0x${addressAccount.substring(2, 42)}`],
    });

    const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 10000));
    toast.promise(resolveAfter3Sec, {
      pending: 'Wait pending 🚀',
      success: 'Successfully add friend 👌',
      error: 'Rejected to request 🤯',
    });

    setNewFriend(true);

    setTimeout(() => {
      location.reload();
    }, 20000);
  };

  const { data: requestList } = useReadContract({
    chainId: bscTestnet.id,
    address: `0x${process.env.NEXT_PUBLIC_DAO_CONTRACT}`,
    functionName: 'getAllRequest',
    abi: [
      {
        inputs: [],
        name: 'getAllRequest',
        outputs: [
          {
            components: [
              {
                internalType: 'address',
                name: 'sender',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'receiver',
                type: 'address',
              },
            ],
            internalType: 'struct BlueSe.FriendRequest[]',
            name: '',
            type: 'tuple[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    args: [],
  });

  let sender = '';
  let receiver = '';
  let hasRequest = false;

  if (requestList !== undefined && requestList.length > 0) {
    for (let i = 0; i < requestList.length; i++) {
      sender = requestList[i].sender;
      receiver = requestList[i].receiver;
      if (sender == addressAccount && receiver == address) {
        hasRequest = true;
      }
    }
  }

  const { data: friend } = useReadContract({
    chainId: bscTestnet.id,
    address: `0x${process.env.NEXT_PUBLIC_DAO_CONTRACT}`,
    functionName: 'friendList',
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
        name: 'friendList',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    args: [`0x${signer.substring(2, 42)}`, BigInt(id)],
  });

  const check = friend !== undefined && friend == addressAccount;

  //Warning Number
  const { data: warnningNumber } = useReadContract({
    chainId: bscTestnet.id,
    address: `0x${process.env.NEXT_PUBLIC_DAO_CONTRACT}`,
    functionName: 'warningAccount',
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        name: 'warningAccount',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    args: [`0x${addressAccount.substring(2, 42)}`],
  });

  console.log('warnning', warnningNumber);

  //Ban
  const banAccount = () => {
    const ban = writeContractAsync({
      chainId: bscTestnet.id,
      address: `0x${process.env.NEXT_PUBLIC_DAO_CONTRACT}`,
      functionName: 'banAccount',
      abi: [
        {
          inputs: [
            {
              internalType: 'address',
              name: '_account',
              type: 'address',
            },
          ],
          name: 'banAccount',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      args: [`0x${addressAccount.substring(2, 42)}`],
    });

    const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 10000));
    toast.promise(resolveAfter3Sec, {
      pending: 'Ban account pending 🚀',
      success: 'Successfully ban account 👌',
      error: 'Rejected to ban 🤯',
    });

    setTimeout(() => {
      location.reload();
    }, 20000);
  };

  //check Ban
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
    args: [`0x${addressAccount.substring(2, 42)}`],
  });

  return (
    <div
      className={` ${addressAccount == address || isFriend || newFriend || id == 4 || isBan ? 'hidden' : 'flex flex-col'} relative `}
    >
      <div className=" flex justify-between">
        <div className=" flex gap-2">
          <div className=" relative w-12 h-12">
            <img className=" rounded-xl" src={`${process.env.NEXT_PUBLIC_SUB_DOMAIN}${ensName}`} alt="" />
          </div>
          <div className=" flex flex-col justify-between">
            <p className=" font-bold">{ensName}</p>
          </div>
        </div>
        {!hasRequest ? (
          <>
            {follow === true ? (
              <button className=" font-semibold bg-gray-300 text-[#865CFF] rounded-xl py-1 px-2 cursor-not-allowed">
                Request to follow
              </button>
            ) : (
              <button
                onClick={() => addFriend()}
                className=" text-white font-semibold bg-[#865CFF] rounded-xl py-1 px-2"
              >
                Follow
              </button>
            )}
          </>
        ) : (
          <button
            onClick={() => acceptRequest()}
            className=" text-white font-semibold bg-[#865CFF] rounded-xl py-1 px-2"
          >
            Accept new friend
          </button>
        )}
      </div>
      {signer === process.env.NEXT_PUBLIC_DAO_OWNER_ADDRESS ? (
        <>
          {Number(warnningNumber) >= 3 ? (
            <div onClick={() => banAccount()} className=" flex absolute bottom-3 cursor-pointer -right-10 text-red-500">
              <GroupRemoveOutlinedIcon fontSize="medium" />
            </div>
          ) : (
            <div className=" flex absolute bottom-3 -right-16 text-red-500">
              <ReportGmailerrorredOutlinedIcon fontSize="large" />
              <div className=" text-xs w-4 h-4 rounded-full bg-white border-[1px] border-red-500 text-center">
                {Number(warnningNumber)}
              </div>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};
