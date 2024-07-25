'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { BACKEND_URL } from '@/types/backendUrl';
import userIcon from '../../../public/icons/usersicon.svg';
import { MdClose } from 'react-icons/md';
import { SuperAdminContext } from '../context/admin.context';
import Modal from '@/components/Modal';
import FormCard from './forms/FormCard';
import { Button } from '@/components/Button';
import { deleteTSO } from '../actions/delete-tso';
import closeIcon from '../../../public/icons/closeIcon.svg';
import toast from 'react-hot-toast';
import { mutate } from 'swr';
type Props = {
  userIcon?: any;
  userCount: number;
  adminIcon: any;
  adminCount?: number;
  tsoLogo: any;
  detailsIcon: any;
  link: string;
  tsoName: string;
  tsoId: number;
};

const TsoCards: React.FC<Props> = ({
  tsoId,
  userCount,
  adminCount,
  adminIcon,
  tsoLogo,
  link,
  tsoName,
}) => {
  const { state, dispatch } = useContext(SuperAdminContext);
  const [open, setOpen] = useState(false);
  async function deleteTso() {
    const response = await deleteTSO(tsoId);
    if (response.status === 200) {
      toast.success('Löschen erfolgreich!');
      mutate(`${BACKEND_URL}/companies/`);
    } else {
      toast.error('Beim Löschen des TSO ist ein Fehler aufgetreten!');
      setOpen(false);
    }
    return;
  }
  console.log(tsoId, tsoName);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.9 }}
      className=" bg-greenpale relative  shadow-sm rounded flex w-[300px] flex-col space-y-1 px-2 py-2 max-w-sm h-[130px]"
    >
      <div className=" text-lg text-white basis-1/5 flex justify-between w-full  ">
        <h1 className=" font-bold ">{tsoName}</h1>
        <div
          className=" p-2  text-white cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <MdClose className=" " />
        </div>
      </div>
      <Link
        href={link}
        className="flex gap-3 place-items-center justify-between basis-4/5 px-2 "
      >
        <Image
          src={`${BACKEND_URL}${tsoLogo}`}
          width={100}
          height={100}
          alt="icon"
        />
        <div className="flex gap-2 item-center">
          <div className="flex items-start">
            <Image src={userIcon} width={20} height={20} alt="usercount" />
            <div className="text-white ml-1">{userCount}</div>
          </div>
          {adminCount ? (
            <div className="flex gap-1 items-center">
              <Image src={adminIcon} width={20} height={20} alt="usercount" />
              <p className="text-gray-500">{adminCount}</p>
            </div>
          ) : (
            ''
          )}
        </div>
      </Link>
      {open ? (
        <Modal>
          <div>
            <div className="bg-slate-100 border border-slate-300 relative rounded-lg w-full shadow-sm p-8 max-w-md">
              <motion.div
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpen(false)}
                className="absolute cursor-pointer flex items-center justify-center  -right-4 -top-4 h-8 w-8"
              >
                <Image src={closeIcon} alt="close icon" />
              </motion.div>
              <div>Möchten Sie diese TSO wirklich löschen?</div>
              <div className=" flex justify-between gap-5 pt-8">
                <Button
                  variant={'outline'}
                  onClick={() =>
                    dispatch({
                      type: 'SUPER_ADMIN_MODAL_DELETE_TSO',
                      payload: false,
                    })
                  }
                >
                  cancel
                </Button>
                <Button onClick={() => deleteTso()} variant={'danger'}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        ''
      )}
    </motion.div>
  );
};

export default TsoCards;
