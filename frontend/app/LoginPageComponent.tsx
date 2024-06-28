"use client"

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/Button';
import LoginForm from '@/components/forms/LoginForm';
import Modal from '@/components/Modal';
import { GetCookie } from '@/context/cookies/cookies';

import Folders from '../public/icons/folders.svg';
import TddLogo from '../public/icons/TDD-logo-form.svg';
import { useClickOutside } from './hooks/useClickOutside';

const LoginPageComponent = ({ modalVal }: { modalVal: boolean}) => {

    const [modal, setModal] = React.useState(modalVal);
    const { push } = useRouter();
    React.useEffect(() => {
        const token = GetCookie();
        if (token) {
        push('/convert');
        }
    });

    const domNode = useClickOutside(() => setModal(modalVal));

    return (
        <div>
            {modal ? (
                <Modal>
                    <div ref={domNode}>
                        <LoginForm modalVal={ false } />
                    </div>
                </Modal>
            ) : (
                ''
            )}

            <>
                <div className="w-fit mx-auto py-4">
                    <div className=" bg-secondaryBG rounded p-2">
                        <Image src={TddLogo} alt="tdd-icon" width={40} height={40} />
                    </div>
                </div>
                <div className="sm:container sm:mx-auto px-4 grid place-items-center h-[80vh] py-4">
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
                </div>
                <div>
                    <h3 className=" font-neueLeiden text-black text-sm text-center ">
                        Copyright ©2023
                    </h3>
                </div>
            </>
        </div>
    )
}

export default LoginPageComponent