import React from 'react';
import EditSettings from './EditSettings';

type Props = {
  data: any;
};

const AdminUser: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y bg-lightWhite divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3 pl-4">
                      <div className="flex items-center h-5"></div>
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      Edit
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      Delete
                    </th>
                  </tr>
                </thead>
                {data?.lenth !== 0 ? (
                  <tbody className="divide-y divide-gray-200">
                    {data?.map((user: any) => (
                      <>
                        <tr>
                          <td className="py-3 pl-4"></td>
                          <td
                            className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
                            key={user?.id}
                          >
                            {user?.username}
                          </td>
                          <td className="px-6 py-4 text-sm  text-gray-800 whitespace-nowrap">
                            {user?.email}
                          </td>
                          <td className="px-6 py-4 text-sm text-right font-medium  whitespace-nowrap">
                            {user?.role === 2
                              ? 'User'
                              : user?.role === 1
                              ? 'Admin'
                              : 'SuperAdmin'}
                          </td>
                          <td className="px-6 py-6 text-sm font-medium flex justify-end items-end  h-max  text-right whitespace-nowrap ">
                            <EditSettings role={user?.role} id={user?.id} />
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                ) : (
                  'No users'
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUser;
