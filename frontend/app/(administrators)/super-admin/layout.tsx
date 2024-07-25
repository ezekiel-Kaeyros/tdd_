'use client';
import { ReactNode } from 'react';
import NavigationBar from '../components/NavigationBar';
import NavBar from '@/components/NavBar';
import { SuperAdminProvider } from '../context/admin.context';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';

interface IProps {
  children: ReactNode;
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
