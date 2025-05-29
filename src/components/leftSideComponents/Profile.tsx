'use client';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar, TextField } from '@mui/material';
import { bscTestnet, sepolia } from 'viem/chains';
import { useEnsText, useWriteContract } from 'wagmi';
import { namehash } from 'viem';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecordModal } from './RecordModal';
import { normalize } from 'viem/ens';
import PremiumPackages from './PremiumPackages';

function Profile({ address, name, avatar }: { address: string; name: string; avatar: string }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedFile, setSelectedFile]: any = useState();
  const [isChoose, setChoose] = useState(false);
  const { writeContractAsync } = useWriteContract();
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [telegram, setTelegram] = useState<string>('');
  const [github, setGithub] = useState<string>('');
  const listKey = ['email', 'phone', 'org.telegram', 'com.github'];
  const [secretKey1, setSecretKey1] = useState('');
  const [secretKey2, setSecretKey2] = useState('');
  const [secretKey3, setSecretKey3] = useState('');
  const [secretKey4, setSecretKey4] = useState('');
  const [secretKey5, setSecretKey5] = useState('');
  const [secretKey6, setSecretKey6] = useState('');
  const [openPackage, setOpenPackage] = useState(false);

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

  const handleSubmit = async (key: string, value: string) => {
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
      args: [namehash(name), key, value],
    });

    console.log(setText);

    const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 10000));
    toast.promise(resolveAfter3Sec, {
      pending: 'Record pending 🚀',
      success: 'Successful 👌',
      error: 'Rejected 🤯',
    });
  };

  //check secret key
  const { data } = useEnsText({
    name: normalize(name),
    key: 'keywords',
  });

  if (data !== undefined && data !== null) {
    console.log('data', data);
  }

  const checkSecretKey = data === `${secretKey1},${secretKey2},${secretKey3},${secretKey4},${secretKey5},${secretKey6}`;

  return (
    <div className=" w-full p-3 flex flex-col gap-3 rounded-xl bg-white">
      <div className=" flex gap-2 items-center">
        <div className=" w-20 h-20">
          <img className=" rounded-xl" src={avatar} alt="" />
        </div>
        <div>
          <p className=" font-bold text-lg">{name}</p>
          <p className=" text-sm text-gray-400">
            {address.substring(0, 6)}...{address.substring(35, 42)}
          </p>
        </div>
      </div>
      <div className=" flex">
        <p className=" text-gray-400 w-[50%] border-r-2 border-gray-400">
          Posts <span className="text-[#865CFF]">1</span>
        </p>
        <p className=" text-gray-400 text-end w-[50%] ">
          Followers <span className="text-[#865CFF]">2</span>
        </p>
      </div>
      <button
        onClick={() => setOpen(true)}
        className=" w-full py-2 border-2 border-gray-400 rounded-xl text-gray-300 hover:text-[#865CFF] hover:border-[#865CFF] hover:shadow-inner hover:shadow-[#865CFF]"
      >
        Edit Profile
      </button>
      {listKey.map((item: string) => (
        <RecordModal name={name} ensName={item} />
      ))}
      <div className=" w-[40%] flex gap-1 cursor-pointer" onClick={() => handleOpen()}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path
            fill-rule="evenodd"
            d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
            clip-rule="evenodd"
          />
        </svg>
        <p>Setting</p>
      </div>
      <div className=" w-[40%] flex gap-1 cursor-pointer " onClick={() => setOpenPackage(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path
            fill-rule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
            clip-rule="evenodd"
          />
        </svg>
        <p>Premium</p>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className=" h-[50%] flex justify-center items-center">
            <img src="../images/BlueSe_logo.png" alt="" />
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit your profile
          </Typography>
          <Avatar sx={{ width: 100, height: 100, display: 'relative' }}>
            <img src={avatar} alt="" />
          </Avatar>
          <Typography id="modal-modal-description" sx={{ fontWeight: 'bold', fontSize: 20 }}>
            {name}
          </Typography>
          <Box sx={{ width: '100%', height: '30%' }}>
            <Typography id="modal-modal-description" sx={{ pb: 1 }}>
              eth address
            </Typography>
            <Typography color="initial" className=" w-full p-2 rounded-lg border-2 border-blue-400">
              {address}
            </Typography>
          </Box>
          <Box sx={{ width: '100%', height: '10%', display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              id="outlined-basic"
              label="Type your email"
              variant="outlined"
              onChange={(item) => setEmail(item.target.value)}
              size="small"
              className=" w-[50vw]"
            />
            <Button variant="outlined" onClick={() => handleSubmit('email', email)}>
              Save new email
            </Button>
          </Box>
          <Box sx={{ width: '100%', height: '10%', display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              id="outlined-basic"
              label="Type your phone"
              variant="outlined"
              onChange={(item) => setPhone(item.target.value)}
              size="small"
              className=" w-[50vw]"
            />
            <Button variant="outlined" onClick={() => handleSubmit('phone', phone)}>
              Save new phone
            </Button>
          </Box>
          <Box sx={{ width: '100%', height: '10%', display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              id="outlined-basic"
              label="Type your telegram"
              variant="outlined"
              onChange={(item) => setTelegram(item.target.value)}
              size="small"
              className=" w-[50vw]"
            />
            <Button variant="outlined" onClick={() => handleSubmit('org.telegram', telegram)}>
              Save new tele
            </Button>
          </Box>
          <Box sx={{ width: '100%', height: '10%', display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              id="outlined-basic"
              label="Type your github"
              variant="outlined"
              onChange={(item) => setGithub(item.target.value)}
              size="small"
              className=" w-[50vw]"
            />
            <Button variant="outlined" onClick={() => handleSubmit('com.github', github)}>
              Save new github
            </Button>
          </Box>
          <Box sx={{ width: '100%', height: '10%', display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <TextField
              id="outlined-basic"
              label="Type your key 1"
              variant="outlined"
              onChange={(item) => setSecretKey1(item.target.value)}
              size="small"
              required
              className=" w-[10vw]"
            />
            <TextField
              id="outlined-basic"
              label="Type your key 2"
              variant="outlined"
              onChange={(item) => setSecretKey2(item.target.value)}
              size="small"
              required
              className=" w-[10vw]"
            />
            <TextField
              id="outlined-basic"
              label="Type your key 3"
              variant="outlined"
              onChange={(item) => setSecretKey3(item.target.value)}
              size="small"
              required
              className=" w-[10vw]"
            />
            <TextField
              id="outlined-basic"
              label="Type your key 4"
              variant="outlined"
              onChange={(item) => setSecretKey4(item.target.value)}
              size="small"
              required
              className=" w-[10vw]"
            />
            <TextField
              id="outlined-basic"
              label="Type your key 5"
              variant="outlined"
              onChange={(item) => setSecretKey5(item.target.value)}
              size="small"
              required
              className=" w-[10vw]"
            />
            <TextField
              id="outlined-basic"
              label="Type your key 6"
              variant="outlined"
              onChange={(item) => setSecretKey6(item.target.value)}
              size="small"
              required
              className=" w-[10vw]"
            />
          </Box>
          {checkSecretKey ? (
            <Button variant="contained" onClick={() => location.reload()}>
              Save
            </Button>
          ) : (
            <Button variant="contained" onClick={() => alert('Secret key is not correct')}>
              Save
            </Button>
          )}
        </Box>
      </Modal>
      <PremiumPackages isOpen={openPackage} setOpenPackage={setOpenPackage} />
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

export default Profile;
