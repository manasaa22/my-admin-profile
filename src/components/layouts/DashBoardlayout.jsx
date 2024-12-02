import React, { useState } from 'react';

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigation = [
    { name: 'Users', icon: 'fa-users', href: '/users' },
    { name: 'Roles', icon: 'fa-shield', href: '/roles' },
    { name: 'Permissions', icon: 'fa-key', href: '/permissions' },
    { name: 'Settings', icon: 'fa-cog', href: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-between h-16 px-4 bg-indigo-600">
          <span className="text-xl font-bold text-white">Admin Dashboard</span>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1 text-white rounded-md lg:hidden hover:bg-indigo-500"
          >
            <i className="fas fa-times w-6 h-6"></i>
          </button>
        </div>
        
        <nav className="px-4 mt-6">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-indigo-50 hover:text-indigo-600"
            >
              <i className={`fas ${item.icon} w-5 h-5 mr-3`}></i>
              {item.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className={`${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-margin duration-300 ease-in-out`}>
        {/* Top Navigation */}
        <div className="bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-1 rounded-md lg:hidden hover:bg-gray-100"
            >
              <i className="fas fa-bars w-6 h-6"></i>
            </button>

            <div className="flex items-center flex-1 px-4 ml-4">
              <div className="max-w-lg w-full">
                <div className="relative">
                  <i className="fas fa-search absolute w-5 h-5 text-gray-400 left-3 top-3"></i>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <button className="p-1 mr-4 text-gray-400 rounded-full hover:text-gray-500 hover:bg-gray-100">
                <i className="fas fa-bell w-6 h-6"></i>
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center"
                >
                  <img
                    src="/api/placeholder/32/32"
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <i className="fas fa-chevron-down w-4 h-4 ml-2 text-gray-400"></i>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg">
                    <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Your Profile
                    </a>
                    <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </a>
                    <a href="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Sign out
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;