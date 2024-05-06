'use client';
import React, { useContext } from 'react';
import NotificationItem from './NotificationItem';
import Link from 'next/link';
import { SuperAdminContext } from '../../context/admin.context';

const NotificationList = () => {
  const { state } = useContext(SuperAdminContext);
  return (
    <div className="absolute bg-white w-[250px] top-8 z-10 right-0 rounded-md shadow-lg">
      <div className="flex px-4 pt-4 pb-4 justify-between">
        <div className="font-bold text-lg">Notifications</div>
        {state.notifications && (
          <Link className="text-greenpale" href="#">
            {'Show all >'}
          </Link>
        )}
      </div>

      {state.notifications ? (
        state?.notifications
          ?.slice(-4)
          ?.reverse()
          ?.map((val: any) => (
            <div key={val?.id}>
              <NotificationItem
                message={val?.body}
                date={val.created_at}
                user_id={val?.user_id}
                tso_id={val?.tso}
              />
            </div>
          ))
      ) : (
        <div className="text-center">No notifications</div>
      )}
    </div>
  );
};

export default NotificationList;
