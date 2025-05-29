import React from 'react'
import LeftSide from './LeftSide'
import MainSide from './MainSide'
import RightSide from './RightSide'

function MainContext({address, name, avatar} : { address : string, name: string, avatar: string}) {
  return (
    <div className=' w-full py-5 px-10 rounded-b-xl flex justify-between bg-[#E7E7E7]'>
        <LeftSide address={address} name={name} avatar={avatar}/>
        <MainSide address={address} name={name} avatar={avatar}/>
        <RightSide/>
    </div>
  )
}

export default MainContext