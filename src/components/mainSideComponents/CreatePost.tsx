import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar, TextField } from '@mui/material';
import { useStorageUpload } from '@thirdweb-dev/react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { bscTestnet, sepolia } from 'viem/chains';
import { useEnsText, useWriteContract } from 'wagmi';
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

function CreatePost({ address, name, avatar }: { address: string; name: string; avatar: string }) {
  const [open, setOpen] = React.useState(false);
  const [typeFile, setTypeFile] = useState();
  const [file, setFile] = useState<any>();
  const [caption, setCaption] = useState<any>();
  const [secretKey1, setSecretKey1] = useState('');
  const [secretKey2, setSecretKey2] = useState('');
  const [secretKey3, setSecretKey3] = useState('');
  const [secretKey4, setSecretKey4] = useState('');
  const [secretKey5, setSecretKey5] = useState('');
  const [secretKey6, setSecretKey6] = useState('');

  const handleClose = () => setOpen(false);
  const handleOpen = (type: any) => {
    setOpen(true);
    setTypeFile(type);
  };

  const { writeContractAsync } = useWriteContract();

  const uploadFile = () => {
    const accept = writeContractAsync({
      chainId: bscTestnet.id,
      address: `0x${process.env.NEXT_PUBLIC_DAO_CONTRACT}`,
      functionName: 'createPost',
      abi: [
        {
          inputs: [
            {
              internalType: 'string',
              name: '_context',
              type: 'string',
            },
            {
              internalType: 'string',
              name: '_caption',
              type: 'string',
            },
            {
              internalType: 'string',
              name: '_type',
              type: 'string',
            },
          ],
          name: 'createPost',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      args: [file, caption, typeFile],
    });

    const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 10000));
    toast.promise(resolveAfter3Sec, {
      pending: 'Record pending 🚀',
      success: 'Successful 👌',
      error: 'Rejected 🤯',
    });

    setTimeout(() => {
      location.reload();
    }, 20000);
  };

  const { data } = useEnsText({
    name: normalize(name),
    key: 'keywords',
  });

  if (data !== undefined && data !== null) {
    console.log('data', data);
  }

  const checkSecretKey = data === `${secretKey1},${secretKey2},${secretKey3},${secretKey4},${secretKey5},${secretKey6}`;

  return (
    <div className=" w-full flex gap-3 p-3 bg-white justify-between rounded-xl ">
      <div className=" w-12 h-12 flex justify-center items-center">
        <img className=" rounded-xl" src={avatar} alt="" />
      </div>
      <div className=" w-[65%] border-none rounded-xl">
        <input
          type="text"
          placeholder="start a post..."
          className=" h-full w-full p-2 text-gray-400 border-none "
          onChange={(e: any) => setCaption(e.target.value)}
        />
      </div>
      <div className=" flex gap-2 justify-center items-center">
        <div className=" cursor-pointer bg-[#E7E7E7] rounded-lg p-1" onClick={(e: any) => handleOpen('image')}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#703EFF" className="w-6 h-6">
            <path
              fill-rule="evenodd"
              d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div className=" cursor-pointer bg-[#E7E7E7] rounded-lg p-1" onClick={(e: any) => handleOpen('audio')}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#703EFF" className="w-6 h-6">
            <path
              fill-rule="evenodd"
              d="M5.636 4.575a.75.75 0 0 1 0 1.061 9 9 0 0 0 0 12.728.75.75 0 1 1-1.06 1.06c-4.101-4.1-4.101-10.748 0-14.849a.75.75 0 0 1 1.06 0Zm12.728 0a.75.75 0 0 1 1.06 0c4.101 4.1 4.101 10.75 0 14.85a.75.75 0 1 1-1.06-1.061 9 9 0 0 0 0-12.728.75.75 0 0 1 0-1.06ZM7.757 6.697a.75.75 0 0 1 0 1.06 6 6 0 0 0 0 8.486.75.75 0 0 1-1.06 1.06 7.5 7.5 0 0 1 0-10.606.75.75 0 0 1 1.06 0Zm8.486 0a.75.75 0 0 1 1.06 0 7.5 7.5 0 0 1 0 10.606.75.75 0 0 1-1.06-1.06 6 6 0 0 0 0-8.486.75.75 0 0 1 0-1.06ZM9.879 8.818a.75.75 0 0 1 0 1.06 3 3 0 0 0 0 4.243.75.75 0 1 1-1.061 1.061 4.5 4.5 0 0 1 0-6.364.75.75 0 0 1 1.06 0Zm4.242 0a.75.75 0 0 1 1.061 0 4.5 4.5 0 0 1 0 6.364.75.75 0 0 1-1.06-1.06 3 3 0 0 0 0-4.243.75.75 0 0 1 0-1.061ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div className=" cursor-pointer bg-[#E7E7E7] rounded-lg p-1" onClick={(e: any) => handleOpen('file')}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#703EFF" className="w-6 h-6">
            <path
              fill-rule="evenodd"
              d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875ZM12.75 12a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V18a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V12Z"
              clip-rule="evenodd"
            />
            <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
          </svg>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className=" h-[50%] flex justify-center items-center">
            <img src="../images/BlueSe_logo.png" alt="" />
          </div>
          <Avatar sx={{ width: 100, height: 100, display: 'relative' }}>
            <img src={avatar} alt="" />
          </Avatar>
          <Typography id="modal-modal-description" sx={{ fontWeight: 'bold', fontSize: 20 }}>
            {name}
          </Typography>
          <Box sx={{ width: '100%', height: '30%' }}>
            <TextField
              id="outlined-basic"
              label="Type your file link"
              variant="outlined"
              onChange={(item) => setFile(item.target.value)}
              size="small"
              className=" w-[70vw]"
            />
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
          {/* checkSecretKey */}
          {true ? (
            <Button variant="contained" onClick={() => uploadFile()}>
              Post
            </Button>
          ) : (
            <Button variant="contained" onClick={() => alert('Secert key is not correct')}>
              Post
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
    </div>
  );
}

export default CreatePost;
