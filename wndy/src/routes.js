import { Navigate, Outlet, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './Pages/index';
//
import { Blog } from './Pages/Blog';
import { Home } from './Pages/Home';
import { Profile } from './Pages/Profile';
import { Resume } from './Pages/Resume';
import { Work } from './Pages/Work';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <Home /> },
        { path: 'blog', element: <Blog /> },
        { path: 'profile', element: <Profile /> },
        { path: 'resume', element: <Resume /> },
        { path: 'work', element: <Work /> },
        { path: '*', element: <Navigate to="/" /> }
      ]
    },
    { path: '*', element: <Navigate to="/" replace /> },

  ]);
}
