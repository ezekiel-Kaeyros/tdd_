import React, { useEffect, useState } from 'react';
import { getTSOById } from '../../actions/get-tsoById';
import { getUserById } from '../../actions/get-userById';

type Props = {
  message: string;
  date: string;
  tso_id: number;
  user_id: number;
};

const NotificationItem: React.FC<Props> = ({
  message,
  date,
  tso_id,
  user_id,
}) => {
  const [userById, setUserById] = useState<any>();
  const [company, setCompany] = useState<any>();

  useEffect(() => {
    const fetchInfos = async () => {
      if (tso_id !== 0) {
        const tso = await getTSOById(tso_id);
        setCompany(tso?.companie);
      } else {
        setUserById({ username: 'Super admin' });
        setCompany({ company: 'Super admin' });
      }

      const user = await getUserById(user_id);
      setUserById(user);
    };

    fetchInfos();
  }, [tso_id, user_id]);

  return (
    <div className="flex px-4 py-2 my-1 items-center justify-between">
      <div>
        <div className="text-sm font-bold text-gray-900">
          {' '}
          {company?.company}{' '}
        </div>
        <div className="text-sm text-red-800">{message}</div>
        <div className="text-sm mt-1 text-gray-800">{userById?.username}</div>
      </div>
      <div className="text-xs italic flex justify-center items-center px-2 text-right">
        {date.toString()}
      </div>
    </div>
  );
};

export default NotificationItem;
