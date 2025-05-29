import React from 'react'
import FollowSuggest from './rightSideComponents/FollowSuggest'

function RightSide() {
  return (
    <div className=' w-[25%] flex flex-col gap-5'>
      <FollowSuggest/>
      <p className=' text-sm text-gray-400'>About . Help . Privacy . Terms . Locations . Language</p>
      <div className=' text-sm text-gray-400 flex items-center'>
        <img className=' w-[50px] h-[30px]' src="../images/BlueSe_logo.png" alt="" />
        Corporation $2025
      </div>
    </div>
  )
}

export default RightSide