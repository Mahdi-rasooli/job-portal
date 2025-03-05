import React from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <button onClick={toggleSidebar} className="absolute top-4 right-4">Close</button>
      <ul className="list-none p-4">
        <li className="py-2 cursor-pointer">Home</li>
        <li className="py-2 cursor-pointer">Profile</li>
        <li className="py-2 cursor-pointer">Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
