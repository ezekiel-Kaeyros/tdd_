'use client';
import React from 'react';
import SideBarNav from './SideBarNav';

const Sidebar = () => {
  return (
    <div className="bg-greenpale fixed left-0 flex h-full flex-col  w-3/12 lg:w-1/12 px-2 pt-36">
      <div className="flex flex-col">
        <SideBarNav sidebarLink="Profile" />
        <SideBarNav sidebarLink="Configfiles" />
      </div>
    </div>
  );
};

export default Sidebar;
