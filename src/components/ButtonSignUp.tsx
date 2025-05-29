import React, { useEffect, useState } from 'react';
import { bscTestnet, sepolia } from 'viem/chains';
import { useReadContract, useWriteContract } from 'wagmi';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ButtonSignUp({ newEnsName, address, duration }: { newEnsName: string; address: string; duration: number }) {
  const { writeContractAsync } = useWriteContract();
  const [commitSuccess, setCommitSuccess] = useState(false);

  // check available
  const { data: contractReadData, isSuccess: contractReadSuccess } = useReadContract({
    chainId: bscTestnet.id,
    address: `0x${process.env.NEXT_PUBLIC_REGISTRAR_CONTROLLER}`,
    abi: [
      {
        inputs: [{ internalType: 'string', name: 'name', type: 'string' }],
        name: 'available',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'available',
    args: [newEnsName],
  });

  console.log('available', contractReadData, contractReadSuccess);

  // commitment hash
  const { data: makeCommitment } = useReadContract({
    chainId: bscTestnet.id,
    address: `0x${process.env.NEXT_PUBLIC_REGISTRAR_CONTROLLER}`,
    functionName: 'makeCommitment',
    abi: [
      {
        inputs: [
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'address', name: 'owner', type: 'address' },
          { internalType: 'uint256', name: 'duration', type: 'uint256' },
          { internalType: 'bytes32', name: 'secret', type: 'bytes32' },
          { internalType: 'address', name: 'resolver', type: 'address' },
          { internalType: 'bytes[]', name: 'data', type: 'bytes[]' },
          { internalType: 'bool', name: 'reverseRecord', type: 'bool' },
          { internalType: 'uint16', name: 'ownerControlledFuses', type: 'uint16' },
        ],
        name: 'makeCommitment',
        outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
        stateMutability: 'pure',
        type: 'function',
      },
    ],
    args: [
      newEnsName,
      `0x${address.substring(2, 46)}`,
      BigInt(duration),
      `0x${process.env.NEXT_PUBLIC_ADDRESS_0}`,
      `0x${process.env.NEXT_PUBLIC_RESOLVER}`,
      [],
      false,
      0,
    ],
  });

  console.log('make commit', makeCommitment);

  //rent price
  const { data: rentPrice } = useReadContract({
    chainId: bscTestnet.id,
    address: `0x${process.env.NEXT_PUBLIC_REGISTRAR_CONTROLLER}`,
    functionName: 'rentPrice',
    abi: [
      {
        inputs: [
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'uint256', name: 'duration', type: 'uint256' },
        ],
        name: 'rentPrice',
        outputs: [
          {
            components: [
              { internalType: 'uint256', name: 'base', type: 'uint256' },
              { internalType: 'uint256', name: 'premium', type: 'uint256' },
            ],
            internalType: 'struct IPriceOracle.Price',
            name: 'price',
            type: 'tuple',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    args: [newEnsName, BigInt(duration)],
  });

  console.log('rent Price', rentPrice);

  // commit
  const commitNewENS = async () => {
    const commit = writeContractAsync({
      chainId: bscTestnet.id,
      address: `0x${process.env.NEXT_PUBLIC_REGISTRAR_CONTROLLER}`,
      functionName: 'commit',
      abi: [
        {
          inputs: [{ internalType: 'bytes32', name: 'commitment', type: 'bytes32' }],
          name: 'commit',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      args: [makeCommitment],
    });
    console.log(commit);

    setCommitSuccess(true);

    const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 30000));
    toast.promise(resolveAfter3Sec, {
      pending: 'Wait 60 seconds 🚀',
      success: 'Successful 👌',
      error: 'Rejected 🤯',
    });
  };

  // register
  const registerNewENS = () => {
    const register = writeContractAsync({
      chainId: bscTestnet.id,
      address: `0x${process.env.NEXT_PUBLIC_REGISTRAR_CONTROLLER}`,
      functionName: 'register',
      abi: [
        {
          inputs: [
            { internalType: 'string', name: 'name', type: 'string' },
            { internalType: 'address', name: 'owner', type: 'address' },
            { internalType: 'uint256', name: 'duration', type: 'uint256' },
            { internalType: 'bytes32', name: 'secret', type: 'bytes32' },
            { internalType: 'address', name: 'resolver', type: 'address' },
            { internalType: 'bytes[]', name: 'data', type: 'bytes[]' },
            { internalType: 'bool', name: 'reverseRecord', type: 'bool' },
            { internalType: 'uint16', name: 'ownerControlledFuses', type: 'uint16' },
          ],
          name: 'register',
          outputs: [],
          stateMutability: 'payable',
          type: 'function',
        },
      ],
      args: [
        newEnsName,
        `0x${address.substring(2, 46)}`,
        BigInt(duration),
        `0x${process.env.NEXT_PUBLIC_ADDRESS_0}`,
        `0x${process.env.NEXT_PUBLIC_RESOLVER}`,
        [],
        false,
        0,
      ],
    });
    console.log(register);

    setCommitSuccess(false);

    const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 30000));
    toast.promise(resolveAfter3Sec, {
      pending: 'Wait register pending 🚀',
      success: 'Successful 👌',
      error: 'Rejected 🤯',
    });
  };

  return (
    <>
      {commitSuccess === true ? (
        <button
          onClick={() => registerNewENS()}
          className="w-full text-white bg-green-400 font-medium rounded-lg text-md px-5 py-2.5 text-center shadow-inner shadow-white"
        >
          Register new ENS name
        </button>
      ) : (
        <button
          onClick={() => commitNewENS()}
          className="w-full text-white bg-green-400 font-medium rounded-lg text-md px-5 py-2.5 text-center shadow-inner shadow-white"
        >
          Create new ENS name
        </button>
      )}
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
    </>
  );
}

export default ButtonSignUp;
