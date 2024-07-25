// 'use client';
import React from 'react';

import dynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';

// import NavigationBar from '../components/NavigationBar';
// import NavBar from '@/components/NavBar';
import { SuperAdminProvider } from '../context/admin.context';

const NavigationBar = dynamic(() => import('../components/NavigationBar'), { ssr: false }); 
// const NavBar = dynamic(() => import('../components/NavBar'), { ssr: false }); 
const NavBar = dynamic(() => import('@/components/NavBar'), { ssr: false }); 

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <SuperAdminProvider>
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
      <NavBar />
      <div className="ml-8">
        <NavigationBar />
      </div>
      {children}
      {/* <Footer _companies={''} /> */}
    </SuperAdminProvider>
  );
};

export default Layout;
