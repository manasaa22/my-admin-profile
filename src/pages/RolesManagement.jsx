import React, { useState } from 'react';

const RolesManagement = () => {
  const [roles, setRoles] = useState([
    {
      id: '1',
      name: 'Administrator',
      description: 'Full system access',
      permissions: ['users.create', 'users.read', 'users.update', 'users.delete', 'roles.create', 'roles.read', 'roles.update', 'roles.delete'],
      userCount: 3
    },
    {
      id: '2',
      name: 'Editor',
      description: 'Can manage content and basic user operations',
      permissions: ['users.read', 'users.update', 'roles.read'],
      userCount: 5
    },
    {
      id: '3',
      name: 'Viewer',
      description: 'Read-only access to the system',
      permissions: ['users.read', 'roles.read'],
      userCount: 10
    }
  ]);

  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: []
  });

  const permissionModules = {
    Users: [
      { id: 'users.create', name: 'Create Users', description: 'Can create new users' },
      { id: 'users.read', name: 'View Users', description: 'Can view user details' },
      { id: 'users.update', name: 'Update Users', description: 'Can modify user information' },
      { id: 'users.delete', name: 'Delete Users', description: 'Can remove users from the system' }
    ],
    Roles: [
      { id: 'roles.create', name: 'Create Roles', description: 'Can create new roles' },
      { id: 'roles.read', name: 'View Roles', description: 'Can view role details' },
      { id: 'roles.update', name: 'Update Roles', description: 'Can modify role settings' },
      { id: 'roles.delete', name: 'Delete Roles', description: 'Can delete roles' }
    ],
    Settings: [
      { id: 'settings.read', name: 'View Settings', description: 'Can view system settings' },
      { id: 'settings.update', name: 'Update Settings', description: 'Can modify system settings' }
    ]
  };

  const handleAddRole = () => {
    if (!newRole.name.trim()) {
      alert('Role name is required');
      return;
    }
    
    const roleId = String(roles.length + 1);
    setRoles([...roles, { 
      ...newRole, 
      id: roleId,
      userCount: 0
    }]);
    setIsAddRoleOpen(false);
    setNewRole({
      name: '',
      description: '',
      permissions: []
    });
  };

  const handleEditRole = (role) => {
    setSelectedRole(role);
    setNewRole({
      name: role.name,
      description: role.description,
      permissions: [...role.permissions]
    });
    setIsEditRoleOpen(true);
  };

  const handleUpdateRole = () => {
    if (!newRole.name.trim()) {
      alert('Role name is required');
      return;
    }

    setRoles(roles.map(role => 
      role.id === selectedRole.id 
        ? { ...role, ...newRole }
        : role
    ));
    setIsEditRoleOpen(false);
    setSelectedRole(null);
    setNewRole({
      name: '',
      description: '',
      permissions: []
    });
  };

  const handleDeleteRole = (roleId) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(role => role.id !== roleId));
    }
  };

  const handlePermissionToggle = (permissionId) => {
    setNewRole(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(id => id !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
        <div className="relative bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{title}</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times"></i>
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    );
  };

  const PermissionsList = ({ permissions, selectedPermissions, onToggle }) => (
    <div className="space-y-6">
      {Object.entries(permissions).map(([module, perms]) => (
        <div key={module} className="bg-white rounded-lg border p-4">
          <h3 className="text-lg font-semibold mb-4">{module}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {perms.map(permission => (
              <div key={permission.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50">
                <input
                  type="checkbox"
                  id={permission.id}
                  checked={selectedPermissions.includes(permission.id)}
                  onChange={() => onToggle(permission.id)}
                  className="mt-1"
                />
                <div>
                  <label
                    htmlFor={permission.id}
                    className="text-sm font-medium cursor-pointer"
                  >
                    {permission.name}
                  </label>
                  <p className="text-sm text-gray-500">{permission.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Roles Management</h1>
        <button
          onClick={() => setIsAddRoleOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <i className="fas fa-plus mr-2"></i>
          Add Role
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          <input
            type="text"
            placeholder="Search roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredRoles.map((role) => (
              <tr key={role.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{role.name}</td>
                <td className="px-6 py-4">{role.description}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-sm bg-gray-100 rounded-full">
                    {role.userCount} users
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.length > 3 ? (
                      <span className="px-2 py-1 text-sm bg-gray-100 rounded-full">
                        {role.permissions.length} permissions
                      </span>
                    ) : (
                      role.permissions.map(permission => (
                        <span key={permission} className="px-2 py-1 text-sm bg-gray-100 rounded-full">
                          {permission}
                        </span>
                      ))
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEditRole(role)}
                      className="p-2 text-gray-600 hover:text-gray-900"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      onClick={() => handleDeleteRole(role.id)}
                      className="p-2 text-red-600 hover:text-red-700"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Role Modal */}
      <Modal
        isOpen={isAddRoleOpen}
        onClose={() => setIsAddRoleOpen(false)}
        title="Create New Role"
      >
        <div className="grid gap-4">
          <div>
            <label className="block font-medium mb-1">Role Name</label>
            <input
              type="text"
              value={newRole.name}
              onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
              placeholder="Enter role name"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              value={newRole.description}
              onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
              placeholder="Enter role description"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Permissions</label>
            <PermissionsList
              permissions={permissionModules}
              selectedPermissions={newRole.permissions}
              onToggle={handlePermissionToggle}
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => setIsAddRoleOpen(false)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleAddRole}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Role
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Role Modal */}
      <Modal
        isOpen={isEditRoleOpen}
        onClose={() => setIsEditRoleOpen(false)}
        title={`Edit Role: ${selectedRole?.name}`}
      >
        <div className="grid gap-4">
          <div>
            <label className="block font-medium mb-1">Role Name</label>
            <input
              type="text"
              value={newRole.name}
              onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
              placeholder="Enter role name"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              value={newRole.description}
              onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
              placeholder="Enter role description"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Permissions</label>
            <PermissionsList
              permissions={permissionModules}
              selectedPermissions={newRole.permissions}
              onToggle={handlePermissionToggle}
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => setIsEditRoleOpen(false)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateRole}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Update Role
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RolesManagement;