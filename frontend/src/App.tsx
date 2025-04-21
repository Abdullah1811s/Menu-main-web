import './App.css'
import NavBar from './components/custom_components/NavBar'
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import Loading from './components/custom_components/Loading';
import { useState } from 'react';

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  if (!loadingComplete) {
    return <Loading onComplete={() => setLoadingComplete(true)} />
  }

  return (
    <>
      <NavBar />
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <main className="w-[90%] mx-auto flex flex-col items-center">
          <Outlet />
        </main>
      </ThemeProvider>
    </>
  );
}

export default App;
