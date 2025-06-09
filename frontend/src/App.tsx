import './App.css'
import NavBar from './components/custom_components/NavBar'
import { Outlet, useNavigate } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import Loading from './components/custom_components/Loading';
import { useEffect, useState } from 'react';
import { cn } from './lib/utils';
import Footer from './components/custom_components/Footer';
import InitialPage from './pages/InitialPage';

function App() {
  const navigate = useNavigate();


  const [loading, setLoading] = useState(() => {
    return localStorage.getItem('loadingComplete') === 'true';
  });

  useEffect(() => {
    if (loading && window.location.pathname === '/') {
      navigate('initial-page');
    }
  }, [loading, navigate]);

  if (!loading) {
    return (
      <Loading
        onComplete={() => {
          setLoading(true);
          localStorage.setItem('loadingComplete', 'true');
        }}
      />
    );
  }

  const isOnInitial = window.location.href.includes('initial-page');
  const isOnUser = window.location.href.includes('user-sign-up');
  const isOnPartner = window.location.href.includes('partner-sign-up');
  const isOnAffiliate = window.location.href.includes('affiliate-sign-up');
  console.log(isOnPartner, isOnUser);
  return (
    <>
      {!(isOnInitial || isOnUser || isOnPartner || isOnAffiliate) && <NavBar />}
      <ThemeProvider defaultTheme="dark" >
        <main
          className={
            cn("w-full h-full flex flex-col items-center", "dark:text-[#FFFF] text-black")
          }
        >
          <Outlet />  
        </main>
      </ThemeProvider>
      {/* {!(isOnInitial || isOnUser || isOnPartner || isOnAffiliate) && <Footer />} */}


    </>
  );
}

export default App;
