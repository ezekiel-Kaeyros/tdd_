"use client"
import React, { useContext } from 'react'

import closeIcon from "../public/icons/closeIcon.svg"
import Image from 'next/image'
import { FileContext } from '@/app/convert/context/file.context'
import { Button } from './Button'
import { usePathname } from 'next/navigation'

const MessageModal = () => {
    const { state, dispatch } = useContext(FileContext);
    const closeWindow = () => dispatch({ type: 'CLOSE_MESSAGE_WINDOW', payload: false });
    const pathName = usePathname ()
  return (
    <div className='h-screen w-screen absolute top-0'>
        <div className='absolute h-screen w-screen bg-slate-600 backdrop-filter backdrop-blur-md opacity-70'></div>
        <div className=' absolute flex justify-center items-center h-screen w-screen bg-transparent z-10'>
            <div className='flex flex-col justify-center gap-[1rem] bg-white p-5 h-[200px] w-[500px] border-t-4 border-red-500 relative'>
                <div className=' absolute right-2 top-2 cursor-pointer' onClick={ closeWindow }>
                    <Image src={ closeIcon } alt='closeIcon' width={ 20 } />
                </div>
                <div className=' flex justify-center'>
                    <h1>An Error Occured</h1>
                </div>
                <div className='flex justify-center overflow-scroll h-[50%]'>
                    {
                        state.messageModaleData
                    }
                    {/* Not Correct file format
                    <br />
                    Not Correct file format
                    <br />
                    Not Correct file format
                    <br />
                    Not Correct file format
                    <br />
                    Not Correct file format
                    <br /> */}
                    
                </div>
                <a className='w-full bg-blue-500 text-center text-white py-2 rounded-lg' href={ `${ pathName }` }>Close</a>
                {/* <Button variant="primary" onClick={ closeWindow } >
                    Close
                </Button> */}
            </div>
        </div>
    </div>
  )
}

export default MessageModal