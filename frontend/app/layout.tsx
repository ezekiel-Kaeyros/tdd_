import localFont from 'next/font/local';
import './globals.css';
import { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext'; 
import { Toaster } from 'react-hot-toast'; 
import { ToastContainer } from 'react-toastify';
import LayoutComponent from './LayoutComponent';
import { FileContextProvider } from './convert/context/file.context';

export const metadata = {
  title: 'TDD App',
  description: 'TDD App',
};

const neueLeiden = localFont({
  src: '../public/fonts/NeueLeiden-Regular.woff2',
  variable: '--font-NeueLeiden',
});

interface IProps {
  children: ReactNode;
}

const neueLeidenbold = localFont({
  src: '../public/fonts/NeueLeiden-Bold.woff2',
  variable: '--font-NeueLeidenBold',
});

export default function RootLayout({ children }: IProps) {
  return (
    <html
      lang="en"
      className={`${neueLeiden.variable} ${neueLeidenbold.variable}`}
    >
      <body className="bg-lightGreen font-neueLeiden">
        {/* <Toaster
          position="bottom-right"
          toastOptions={{ duration: 10000 }}
        /> */}
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
        <FileContextProvider>
          {/* <LayoutComponent children={ children } /> */}
          <LayoutComponent>
            { children }
          </LayoutComponent>
        </FileContextProvider>

        {/* <AuthProvider>{children}</AuthProvider> */}
      </body>
    </html>
  );
}
