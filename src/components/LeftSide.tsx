import React, { useState } from 'react';
import Profile from './leftSideComponents/Profile';
import Following from './leftSideComponents/Following';

function LeftSide({ address, name, avatar }: { address: string; name: string; avatar: string }) {
  return (
    <div className=" w-[25%] flex flex-col gap-5">
      <Profile address={address} name={name} avatar={avatar} />
      <Following />
    </div>
  );
}

export default LeftSide;
