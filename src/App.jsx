import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DashboardLayout from './components/layouts/DashBoardlayout';
import PermissionsManagement from './pages/PermissionManagement';
import RolesManagement from './pages/RolesManagement';
import SettingsManagement from './pages/SettingsManagement';
import UsersManagement from './pages/UserManagement';
function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<UsersManagement />} />
          <Route path="/roles" element={<RolesManagement />} />
          <Route path="/permissions" element={<PermissionsManagement />} />
          <Route path="/settings" element={<SettingsManagement/>}/>
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;