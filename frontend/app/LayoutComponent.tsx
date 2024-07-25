// "use client";
// import React, { useContext } from 'react';

// import MessageModal from '@/components/MessageModal';
// import { AuthProvider } from '@/context/AuthContext';

// import { FileContext } from './convert/context/file.context';

// const LayoutComponent = ({ children }: { children: React.ReactNode}) => {

//     const { state, dispatch } = useContext(FileContext);
//   return (
//     <div className='relative'>
//         <AuthProvider>
//             {children}
//             { state.messageModalToggle && <MessageModal /> }
//         </AuthProvider>
//     </div>
//   )
// }

// export default LayoutComponent








"use client";
import React from 'react';

import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';

import MessageModal from '@/components/MessageModal';
import { AuthProvider } from '@/context/AuthContext';

import {
  FileContext,
  FileContextProvider,
} from './convert/context/file.context';

const LayoutComponent = ({ children }: { children: React.ReactNode}) => {

    const { state } = React.useContext(FileContext);
  return (
    <>
      <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light"
        />
      <Toaster position="top-center" reverseOrder={false} />
      <FileContextProvider>
        {/* <LayoutComponent children={ children } /> */}
        <div className='relative'>
            <AuthProvider>
                {children}
                { state.messageModalToggle && <MessageModal /> }
            </AuthProvider>
        </div>
        {/* <LayoutComponent>
        </LayoutComponent> */}
      </FileContextProvider>
    </>
    
  )
}

export default LayoutComponent