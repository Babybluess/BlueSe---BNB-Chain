// // async function pinFileToIPFS(file) {
// //   try {
// //     // const text = "Hello World!";
// //     // const blob = new Blob([text], { type: "text/plain" });
// //     const data = new FormData();
// //     data.append("file", file);

// //     const res = await fetch({`https://${process.env.NEXT_PUBLIC_PINATA_DOMAIN}/pinning/pinFileToIPFS`},
// //       method: "POST",
// //       headers: {
// //         Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
// //       },
// //       body: data,
// //     );
// //     const resData = await res.json();
// //     console.log(resData);
// //   } catch (error) {
// //     console.log(error);
// //   }


// import pinataSDK from '@pinata/sdk';
// const pinata = new pinataSDK(process.env.NEXT_PUBLIC_PINATA_API_KEY, process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY);
// // import fs from 'fs'; 
// import axios from 'axios';


// export async function handleUpload (nameNFT :any, urlNFTLocation: any) {
//     try {
//       if (urlNFTLocation !== null) {
//         const formData = new FormData();
//         formData.append('file', urlNFTLocation);
//         const pinataBody = {
//           options: {
//             cidVersion: 1,
//           },
//           metadata: {
//             name: nameNFT,
//           }
//         }
//         formData.append('pinataOptions', JSON.stringify(pinataBody.options));
//         formData.append('pinataMetadata', JSON.stringify(pinataBody.metadata));
//         const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
//         const res = await axios.post(url, formData, {
//         maxBodyLength: Infinity,
//         headers: {
//           'Content-Type': `multipart/form-data`,
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}` 
//         }
//       });
//       return res.data.IpfsHash
//       } else {
//         alert('select file first')
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }

// export const queryPinataFiles = async (ipfsHash:any) => {
//     try {
//       const url = `https://${process.env.NEXT_PUBLIC_PINATA_DOMAIN}/ipfs/${ipfsHash}`;
//       const response = await axios.get(url, pinataConfig);
//       console.log('response', response.data.rows)
//       console.log('type response', typeof response.data.rows)
//       return response.data.rows
//     } catch (error) {
//       console.log(error)
//     }
//   };

// const pinataConfig = {
//   root: `https://${process.env.NEXT_PUBLIC_PINATA_DOMAIN}`,
//   headers: {
//     'pinata_api_key': process.env.NEXT_PUBLIC_PINATA_API_KEY,
//     'pinata_secret_api_key': process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY
//   }
// };