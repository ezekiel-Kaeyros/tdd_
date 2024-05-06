'use client';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import NotificationIcon from '../../../../public/icons/notificationicon.svg';
import NotificationList from './NotificationList';
import { motion } from 'framer-motion';
import io, { Socket } from 'socket.io-client';
import { BACKEND_URL } from '@/types/backendUrl';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { getNotifications } from '../../actions/get-notifications';
import { getAllNotifications } from '../../actions/get-all-notifications';
import { SuperAdminContext } from '../../context/admin.context';
import { useAuth } from '@/app/hooks/useAuth';
import { useClickOutside } from '@/app/hooks/useClickOutside';
const NotificationButton = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const [notification, setNotification] = useState(false);
  const { dispatch } = useContext(SuperAdminContext);
  const { user } = useAuth();
  let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

  async function socketInitializer() {
    socket = io(BACKEND_URL);

    if (user?.role == 0) {
      socket.on(`new-notificationall`, (_data) => {
        setNotification(true);
      });
    } else {
      socket.on(`new-notification${user?.company_id}`, (_data) => {
        setNotification(true);
      });
    }
  }

  useEffect(() => {
    socketInitializer();

    return () => {
      socket?.disconnect();
    };
  });

  const retrieveNotifications = async () => {
    if (user?.role == 1) {
      const response = await getNotifications();
      dispatch({
        type: 'GET_NOTIFICATIONS',
        payload: response?.notifications,
      });
    } else {
      const response = await getAllNotifications();
      dispatch({
        type: 'GET_NOTIFICATIONS',
        payload: response?.notifications,
      });
    }
  };

  let domNode = useClickOutside(() => {
    setToggle(false);
  });
  return (
    <div ref={domNode} className="mr-4 relative">
      <motion.div
        whileHover={{ scale: 1 }}
        whileTap={{ scale: 0.95 }}
        className="relative cursor-pointer"
        onClick={() => {
          setToggle(!toggle), setNotification(false), retrieveNotifications();
        }}
      >
        <Image src={NotificationIcon} alt="Notification icon" />
        {notification ? (
          <span className="p-2 w-3 h-3 flex justify-center items-center text-white rounded-full bg-red-500 text-xs absolute -right-2 -top-1">
            {''}
          </span>
        ) : (
          ''
        )}
      </motion.div>
      {toggle ? (
        <div>
          <NotificationList />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default NotificationButton;
