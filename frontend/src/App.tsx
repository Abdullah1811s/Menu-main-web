import './App.css'
import NavBar from './components/custom_components/NavBar'
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
// import Loading from './components/custom_components/Loading';
import { useEffect, useState } from 'react';
import { cn } from './lib/utils';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { login } from './store/authSlice';

interface TokenPayload {
  id: string;
  email: string;
  role: 'user' | 'partner' | 'affiliate' | 'admin';
  availableRoles: string[];
}
function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hideNav, setHideNav] = useState<boolean>(false);


  useEffect(() => {
    const token = localStorage.getItem('frontendToken');

    if (!token) return;

    try {
      const decoded: TokenPayload = jwtDecode(token);
      if (decoded?.id && decoded?.role) {
        dispatch(login(decoded.role));
      }
    } catch (error) {
      console.error('Token decode error:', error);
      localStorage.removeItem('frontendToken');
    }
  }, [dispatch]);


  useEffect(() => {
    const pathname = location.pathname;

    const isOnInitial = pathname === '/';
    const isOnUser = pathname.includes('user-sign-up');
    const isOnPartner = pathname.includes('partner-sign-up');
    const isOnAffiliate = pathname.includes('affiliate-sign-up');
    const isDashboard = pathname.includes('dashboard');


    if (isOnInitial || isOnUser || isOnPartner || isOnAffiliate || isDashboard) {
      setHideNav(true);
    } else {
      setHideNav(false);
    }
  }, [location]);

  // if (!isLoading) return <Loading onComplete={() => setIsLoading(true)} />;

  return (
    <>
      {!hideNav && <NavBar />}
      <ThemeProvider defaultTheme="dark">
        <main
          className={cn(
            "w-full h-full flex flex-col items-center",
            "dark:text-[#FFFF] text-black"
          )}
        >
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#2C272A',
                color: '#DDA87C',
                border: '1px solid #DDA87C',
              },
              success: {
                icon: '🎡',
              },
              error: {
                icon: '❌',
              },
            }}
          />
          <Outlet />
        </main>

      </ThemeProvider>
    </>
  );
}

export default App;
