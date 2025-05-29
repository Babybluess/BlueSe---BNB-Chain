"use client";
import React, { useState } from "react";
import { Navbar, MainContext } from "@/components";
import { usePathname } from "next/navigation";

function HomePage() {
  const pathname = usePathname();
  const params = pathname.split('/');
  const [address, setAddress] = useState(params[2].split('&')[0]);
  const [ensName, setEnsName] = useState(params[2].split('&')[1]);
  const [ensAvatar, setEnsAvatar] = useState(`https:/euc.li/sepolia/${params[2].split('&')[1]}`);

  return (
    <div className=" w-screen min-h-screen py-10 bg-gradient-to-br from-[#9346FB] to-[#512CB7] flex justify-center items-center">
      <div className=" w-[90%] flex flex-col">
        <Navbar address={address} name={ensName} avatar={ensAvatar}/>
        <MainContext address={address} name={ensName} avatar={ensAvatar} />
      </div>
    </div>
  );
}

export default HomePage;
