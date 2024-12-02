import React, { useState } from 'react';
import Modal from '../components/shared/Modal'; // Assuming Modal is in a separate file

const PermissionsManagement = () => {
  const [permissions, setPermissions] = useState([
    {
      id: '1',
      module: 'Users',
      actions: [
        { id: 'users.create', name: 'Create Users', enabled: true },
        { id: 'users.read', name: 'View Users', enabled: true },
        { id: 'users.update', name: 'Update Users', enabled: true },
        { id: 'users.delete', name: 'Delete Users', enabled: true }
      ]
    },
    {
      id: '2',
      module: 'Roles',
      actions: [
        { id: 'roles.create', name: 'Create Roles', enabled: true },
        { id: 'roles.read', name: 'View Roles', enabled: true },
        { id: 'roles.update', name: 'Update Roles', enabled: true },
        { id: 'roles.delete', name: 'Delete Roles', enabled: true }
      ]
    },
    {
      id: '3',
      module: 'Settings',
      actions: [
        { id: 'settings.read', name: 'View Settings', enabled: true },
        { id: 'settings.update', name: 'Update Settings', enabled: true }
      ]
    }
  ]);

  const [isAddPermissionOpen, setIsAddPermissionOpen] = useState(false);
  const [newPermission, setNewPermission] = useState({
    module: '',
    actionName: '',
    actionId: ''
  });

  const [showPermissionConfirmation, setShowPermissionConfirmation] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

  const [showRoleConfirmation, setShowRoleConfirmation] = useState(false);

  const handleTogglePermission = (moduleId, actionId) => {
    setSelectedAction({ moduleId, actionId });
    setShowPermissionConfirmation(true); // Show confirmation modal
  };

  const confirmPermissionChange = () => {
    if (selectedAction) {
      const { moduleId, actionId } = selectedAction;
      setPermissions(permissions.map(module => {
        if (module.id === moduleId) {
          return {
            ...module,
            actions: module.actions.map(action => {
              if (action.id === actionId) {
                return { ...action, enabled: !action.enabled };
              }
              return action;
            })
          };
        }
        return module;
      }));
      setShowPermissionConfirmation(false);
    }
  };

  const cancelPermissionChange = () => {
    setShowPermissionConfirmation(false); // Close the confirmation modal
  };

  const handleAddPermission = () => {
    if (!newPermission.module || !newPermission.actionName) {
      alert('Please fill in all required fields');
      return;
    }

    const actionId = newPermission.actionName.toLowerCase().replace(/\s+/g, '.');
    const existingModule = permissions.find(m => m.module === newPermission.module);

    if (existingModule) {
      setPermissions(permissions.map(module => {
        if (module.module === newPermission.module) {
          return {
            ...module,
            actions: [...module.actions, {
              id: actionId,
              name: newPermission.actionName,
              enabled: true
            }]
          };
        }
        return module;
      }));
    } else {
      setPermissions([...permissions, {
        id: String(permissions.length + 1),
        module: newPermission.module,
        actions: [{
          id: actionId,
          name: newPermission.actionName,
          enabled: true
        }]
      }]);
    }

    setIsAddPermissionOpen(false);
    setNewPermission({ module: '', actionName: '', actionId: '' });
  };

  const handleRoleChange = () => {
    setShowRoleConfirmation(true);
  };

  const confirmRoleChange = () => {
    console.log('Roles saved');
    setShowRoleConfirmation(false); // Close the confirmation modal
  };

  const cancelRoleChange = () => {
    setShowRoleConfirmation(false); // Close the confirmation modal
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Permissions Management</h1>
        <button
          onClick={() => setIsAddPermissionOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <i className="fas fa-plus mr-2"></i>
          Add Permission
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {permissions.map((module) => (
          <div key={module.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{module.module}</h2>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {module.actions.length} permissions
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {module.actions.map((action) => (
                <div
                  key={action.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <i className={`fas fa-key text-gray-400 mr-3`}></i>
                    <div>
                      <div className="font-medium">{action.name}</div>
                      <div className="text-sm text-gray-500">{action.id}</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={action.enabled}
                      onChange={() => handleTogglePermission(module.id, action.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Permission change confirmation modal */}
      <Modal
        isOpen={showPermissionConfirmation}
        onClose={cancelPermissionChange}
        title="Are you sure?"
      >
        <div className="space-y-4">
          <p>Do you want to toggle this permission?</p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={cancelPermissionChange}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={confirmPermissionChange}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>

      {/* Role change confirmation modal */}
      <Modal
        isOpen={showRoleConfirmation}
        onClose={cancelRoleChange}
        title="Do you want to save changes?"
      >
        <div className="space-y-4">
          <p>Do you want to save the changes you made to the roles?</p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={cancelRoleChange}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={confirmRoleChange}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal for Adding Permissions */}
      <Modal
        isOpen={isAddPermissionOpen}
        onClose={() => setIsAddPermissionOpen(false)}
        title="Add New Permission"
      >
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Module Name</label>
            <input
              type="text"
              value={newPermission.module}
              onChange={(e) => setNewPermission({ ...newPermission, module: e.target.value })}
              placeholder="Enter module name"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Permission Name</label>
            <input
              type="text"
              value={newPermission.actionName}
              onChange={(e) => setNewPermission({ ...newPermission, actionName: e.target.value })}
              placeholder="Enter permission name"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => setIsAddPermissionOpen(false)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleAddPermission}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Permission
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PermissionsManagement;
