import React from 'react'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

const Header = () => {
  return (
    <div className='flex justify-between items-center'>
        <KeyboardArrowDownOutlinedIcon  className='text-gray-500'/>
        <p className=' text-gray-500'>Now Playing</p>
        <MoreHorizOutlinedIcon  className='text-gray-500' />
    </div>
  )
}

export default Header