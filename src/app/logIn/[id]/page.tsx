'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEnsText, useReadContract, useWriteContract } from 'wagmi';
import { bscTestnet, sepolia } from 'viem/chains';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { namehash } from 'viem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar, TextField } from '@mui/material';
import { normalize } from 'viem/ens';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 5,
  borderRadius: 5,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 2,
  paddingX: 5,
  paddingY: 2,
};

function page() {
  const pathname = usePathname();
  const params = pathname.split('/');
  const [address, setAddress] = useState(params[2].split('&')[0]);
  const [ensName, setEnsName] = useState(params[2].split('&')[1]);
  const [ensAvatar, setEnsAvatar] = useState(`https:/euc.li/sepolia/${params[2].split('&')[1]}`);
  const [isSuccess, setSuccess] = useState(false);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [secretKey, setSecretKey] = useState<any[]>([]);
  const [secretKey1, setSecretKey1] = useState('');
  const [secretKey2, setSecretKey2] = useState('');
  const [secretKey3, setSecretKey3] = useState('');
  const [secretKey4, setSecretKey4] = useState('');
  const [secretKey5, setSecretKey5] = useState('');
  const [secretKey6, setSecretKey6] = useState('');
  const { writeContractAsync } = useWriteContract();

  const accessDAO = () => {
    const accessHome = writeContractAsync({
      chainId: bscTestnet.id,
      address: `0x${process.env.NEXT_PUBLIC_DAO_CONTRACT}`,
      functionName: 'memberCommunity',
      abi: [
        {
          inputs: [
            {
              internalType: 'address',
              name: '_signer',
              type: 'address',
            },
          ],
          name: 'memberCommunity',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      args: [`0x${address.substring(2, 42)}`],
    });
    console.log(accessHome);

    const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 15000));
    toast.promise(resolveAfter3Sec, {
      pending: 'Access pending 🚀',
      success: 'Welcome to BluSe Dao 👌',
      error: 'Rejected to access 🤯',
    });

    setSuccess(true);
  };

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

  const isMember = memberList?.includes(address);

  //Set secret key
  const createSecretKey = async () => {
    const keyList = [secretKey1, secretKey2, secretKey3, secretKey4, secretKey5, secretKey6];

    setSecretKey(keyList);

    const setText = writeContractAsync({
      chainId: bscTestnet.id,
      address: `0x${process.env.NEXT_PUBLIC_RESOLVER_CONTRACT}`,
      functionName: 'setText',
      abi: [
        {
          inputs: [
            { internalType: 'bytes32', name: 'node', type: 'bytes32' },
            { internalType: 'string', name: 'key', type: 'string' },
            { internalType: 'string', name: 'value', type: 'string' },
          ],
          name: 'setText',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      args: [namehash(ensName), 'keywords', keyList],
    });

    const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 5000));
    toast.promise(resolveAfter3Sec, {
      pending: 'Access pending 🚀',
      success: 'Welcome to BluSe Dao 👌',
      error: 'Rejected to access 🤯',
    });

    setTimeout(() => {
      location.reload();
    }, 15000);
  };

  const { data } = useEnsText({
    name: normalize(ensName),
    key: 'keywords',
  });

  const checkSuccess = data === `${secretKey1},${secretKey2},${secretKey3},${secretKey4},${secretKey5},${secretKey6}`;

  //Submit
  const handleSubmit = () => {
    if (checkSuccess) {
      router.push(`/homePage/${params[2]}`);
    } else {
      alert('Secret key is not correct');
    }
  };

  return (
    <section className="bg-gradient-to-br from-[#9346FB] to-[#512CB7] w-screen h-screen justify-center items-center flex dark:bg-gray-900">
      {ensName !== "undefined" ? (
        <div className="w-[50%] justify-center py-5 gap-5 items-center flex flex-col bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
          <div className=" h-[50%]">
            <img src="../images/BlueSe_logo.png" alt="" />
          </div>
          <div className=" flex gap-2 justify-center items-center">
            <p>
              {address.substring(0, 6)}...{address.substring(36, 42)}
            </p>
            <div id="Arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
            <div id="ENS domain" className=" flex gap-2 justify-center items-center">
              <div id="Avatar" className=" rounded-full w-10 h-10">
                <img className=" w-full h-full rounded-full" src={ensAvatar} alt="" />
              </div>
              <p className=" font-semibold">{ensName}</p>
            </div>
          </div>
          {isMember ? (
            <>
              {data === null || data === undefined ? (
                <button
                  onClick={() => handleOpen()}
                  className=" font-semibold p-2 bg-green-500 hover:bg-red-300 text-white rounded-xl"
                >
                  Create secret key
                </button>
              ) : (
                <button
                  onClick={() => handleOpen()}
                  className=" font-semibold p-2 bg-blue-500 hover:bg-red-300 text-white rounded-xl"
                >
                  Type your secret key
                </button>
              )}
            </>
          ) : (
            <button
              onClick={() => accessDAO()}
              className=" font-semibold p-2 bg-blue-500 hover:bg-red-300 text-white rounded-xl"
            >
              Become BlueSe member
            </button>
          )}
        </div>
      ) : (
        <div className="w-[50%] justify-center py-5 gap-5 items-center flex flex-col bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
          <div className=" h-[50%]">
            <img src="../images/BlueSe_logo.png" alt="" />
          </div>
          <div className=" flex gap-2 justify-center items-center">
            <p className=" text-lg">
              <span className=" font-semibold">Your account:</span> {address.substring(0, 6)}...
              {address.substring(36, 42)}.eth
            </p>
          </div>
          <p className=" text-gray-500 px-5">
            You don't have ENS Domain. Please sign up with ENS Domain to access DAO.{' '}
            <a href={'https://app.ens.domains/'} className=" font-semibold text-[#9346FB] cursor-pointer">
              Sign up
            </a>
          </p>
        </div>
      )}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className=" h-[50%] flex justify-center items-center">
            <img src="../images/BlueSe_logo.png" alt="" />
          </div>
          <Avatar sx={{ width: 100, height: 100, display: 'relative' }}>
            <img src={ensAvatar} alt="" />
          </Avatar>
          <Typography id="modal-modal-description" sx={{ fontWeight: 'bold', fontSize: 20 }}>
            {ensName}
          </Typography>
          <Box
            sx={{
              width: '100%',
              height: '10%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography id="modal-modal-description" sx={{ pb: 1, mr: 0.5 }}>
              Secret key 1
            </Typography>
            <TextField
              id="outlined-basic"
              label="Type your key 1"
              variant="outlined"
              onChange={(item) => setSecretKey1(item.target.value)}
              size="small"
              required
            />
          </Box>
          <Box
            sx={{
              width: '100%',
              height: '10%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography id="modal-modal-description" sx={{ pb: 1, mr: 0.5 }}>
              Secret key 2
            </Typography>
            <TextField
              id="outlined-basic"
              label="Type your key 2"
              variant="outlined"
              onChange={(item) => setSecretKey2(item.target.value)}
              size="small"
              required
            />
          </Box>
          <Box
            sx={{
              width: '100%',
              height: '10%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography id="modal-modal-description" sx={{ pb: 1, mr: 0.5 }}>
              Secret key 3
            </Typography>
            <TextField
              id="outlined-basic"
              label="Type your key 3"
              variant="outlined"
              onChange={(item) => setSecretKey3(item.target.value)}
              size="small"
              required
            />
          </Box>
          <Box
            sx={{
              width: '100%',
              height: '10%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography id="modal-modal-description" sx={{ pb: 1, mr: 0.5 }}>
              Secret key 4
            </Typography>
            <TextField
              id="outlined-basic"
              label="Type your key 4"
              variant="outlined"
              onChange={(item) => setSecretKey4(item.target.value)}
              size="small"
              required
            />
          </Box>
          <Box
            sx={{
              width: '100%',
              height: '10%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography id="modal-modal-description" sx={{ pb: 1, mr: 0.5 }}>
              Secret key 5
            </Typography>
            <TextField
              id="outlined-basic"
              label="Type your key 5"
              variant="outlined"
              onChange={(item) => setSecretKey5(item.target.value)}
              size="small"
              required
            />
          </Box>
          <Box
            sx={{
              width: '100%',
              height: '10%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography id="modal-modal-description" sx={{ pb: 1, mr: 0.5 }}>
              Secret key 6
            </Typography>
            <TextField
              id="outlined-basic"
              label="Type your key 6"
              variant="outlined"
              onChange={(item) => setSecretKey6(item.target.value)}
              size="small"
              required
            />
          </Box>
          {data === null || data === undefined ? (
            <Button variant="contained" onClick={() => createSecretKey()}>
              Save your Secret key
            </Button>
          ) : (
            <Button variant="contained" onClick={() => handleSubmit()}>
              Submit
            </Button>
          )}
        </Box>
      </Modal>
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
    </section>
  );
}

export default page;
