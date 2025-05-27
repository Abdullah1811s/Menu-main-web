import './App.css'
import NavBar from './components/custom_components/NavBar'
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import Loading from './components/custom_components/Loading';
import { useState } from 'react';
import { cn } from './lib/utils';
import Footer from './components/custom_components/Footer';

function App() {
  // const [loadingComplete, setLoadingComplete] = useState(false);

  // if (!loadingComplete) {
  //   return <Loading onComplete={() => setLoadingComplete(true)} />
  // }

  return (
    <>
      <NavBar />
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <main className={`w-[90%] mx-auto flex  flex-col items-center ${cn("dark:text-[#FFFF] text-black ")}`}>
          <Outlet />
        </main>
      </ThemeProvider>
      <Footer/>
    </>
  );
}

export default App;
