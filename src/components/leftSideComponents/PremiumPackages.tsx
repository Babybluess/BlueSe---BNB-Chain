import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import HorizontalLinearAlternativeLabelStepper from '@/utils/HorizontalLinearAlternativeLabelStepper';

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

type modalData = {
  id: number;
  name: string;
  postTime: string;
  persMessage: string;
  chatTiming: string;
  price: string;
  color: string;
};

const dataPackage: modalData[] = [
  {
    id: 0,
    name: 'Golden Package',
    postTime: '10 posts/day',
    persMessage: '5 people/day',
    chatTiming: 'No Limmit',
    price: '100$/month',
    color: '#E9E764',
  },
  {
    id: 1,
    name: 'Diamond Package',
    postTime: '20 posts/day',
    persMessage: '10 people/day',
    chatTiming: 'No Limmit',
    price: '220$/month',
    color: '#2df0d6',
  },
  {
    id: 2,
    name: 'VIP Package',
    postTime: 'No Limit',
    persMessage: 'No Limit',
    chatTiming: 'No Limmit',
    price: '320$/month',
    color: '#f546e5',
  },
];

function PremiumPackages({ isOpen, setOpenPackage }: { isOpen: boolean; setOpenPackage: any }) {
  return (
    <Modal open={isOpen}>
      <Box sx={style}>
        <div className=" h-[50%] flex justify-center items-center">
          <img src="../images/BlueSe_logo.png" alt="" />
        </div>
        <div className=" w-full flex gap-5 p-5">
          {dataPackage.map((item: any) => (
            <div
              className={` w-[25vw] border-[1px] rounded-xl p-2 justify-center flex flex-col border-[${item.color}]`}
            >
              <h1 className={` text-[${item.color}] text-center  text-2xl pb-5`}>{item.name}</h1>
              <p>
                <span className=" font-semibold">Number of posts per day:</span> {item.postTime}
              </p>
              <p>
                <span className=" font-semibold">Number of friends you can chat:</span> {item.persMessage}{' '}
              </p>
              <p>
                <span className=" font-semibold">Number of messages:</span> {item.chatTiming}
              </p>
              <p>
                <span className=" font-semibold">Price:</span> {item.price}
              </p>
              <button
                className={` py-1 px-2 rounded-xl border-[1px] border-[${item.color}] text-[${item.color}] mt-5 hover:border-black hover:text-black hover:bg-[${item.color}]`}
              >
                Purchase
              </button>
            </div>
          ))}
        </div>
        <HorizontalLinearAlternativeLabelStepper />
        <CloseIcon onClick={() => setOpenPackage(false)} className=" text-red-500 cursor-pointer" />
      </Box>
    </Modal>
  );
}

export default PremiumPackages;
