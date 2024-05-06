'use client';

import Image from 'next/image';
import TddLogo from '../public/icons/TDD-logo-form.svg';
import { useEffect, useState } from 'react';
import Folders from '../public/icons/folders.svg';
import Modal from '../components/Modal';
import LoginForm from '../components/forms/LoginForm';
import { Button } from '../components/Button';
import { useRouter } from 'next/navigation';
import { GetCookie } from '@/context/cookies/cookies';
import { useClickOutside } from './hooks/useClickOutside';

const Home = () => {
  const [modal, setModal] = useState(false);
  const { push } = useRouter();
  useEffect(() => {
    const token = GetCookie();
    if (token) {
      push('/convert');
    }
  });

  const domNode = useClickOutside(() => setModal(false));

  return (
    <div>
      {modal ? (
        <Modal>
          <div ref={domNode}>
            <LoginForm />
          </div>
        </Modal>
      ) : (
        ''
      )}

      <>
        <nav className="w-fit mx-auto py-4">
          <div className=" bg-secondaryBG rounded p-2">
            <Image src={TddLogo} alt="tdd-icon" width={40} height={40} />
          </div>
        </nav>
        <main className="sm:container sm:mx-auto px-4 grid place-items-center h-[80vh] py-4">
          <div className="flex flex-col space-y-3 justify-center items-center relative max-w-2xl w-full">
            <h1 className="text-4xl text-center sm:text-5xl  font-bold  text-greenpale">
              Welcome to TDD app
            </h1>
            <p className="text-black mb-4 text-base text-center max-w-sm font-neueLeiden ">
              Welcome to TDD, the utility of conversion for a greater perfomance
            </p>
            <div className="flex pt-4 z-20">
              <Button onClick={() => setModal(true)}>Login</Button>
            </div>
            <div className="mt-8 ">
              <Image src={Folders} alt="" />
            </div>
          </div>
        </main>
        <footer>
          <h3 className=" font-neueLeiden text-black text-sm text-center ">
            Copyright ©2023
          </h3>
        </footer>
      </>
    </div>
  );
};

export default Home;
