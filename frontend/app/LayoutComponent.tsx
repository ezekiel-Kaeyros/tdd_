"use client"; 
import MessageModal from '@/components/MessageModal'
import { AuthProvider } from '@/context/AuthContext'
import React, { useContext } from 'react'
import { FileContext } from './convert/context/file.context';

const LayoutComponent = ({ children }: { children: React.ReactNode}) => {

    const { state, dispatch } = useContext(FileContext);
  return (
    <div className='relative'>
        <AuthProvider>
            {children}
            { state.messageModalToggle && <MessageModal /> }
        </AuthProvider>
    </div>
  )
}

export default LayoutComponent