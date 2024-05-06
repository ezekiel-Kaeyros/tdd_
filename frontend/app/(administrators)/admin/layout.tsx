'use client';
import { ReactNode } from 'react';
import NavigationBar from '../components/NavigationBar';
import NavBar from '@/components/NavBar';
import { SuperAdminProvider } from '../context/admin.context';

interface IProps {
  children: ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <SuperAdminProvider>
      <NavBar />
      <div>
        <div className="flex justify-between">
          <div className="ml-4">
            <NavigationBar />
          </div>
        </div>
      </div>

      {children}
    </SuperAdminProvider>
  );
};

export default Layout;
