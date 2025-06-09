import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from "react-redux";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/LandingPage.tsx'
import Login from './components/custom_components/Login.tsx'
import Signup from './components/custom_components/Signup.tsx'
import UserOnBoard from './pages/UserOnBoard.tsx'
import InitialPage from './pages/InitialPage.tsx'
import store from './store/store.ts';
import AffiliateOnBoard from './pages/affiliateOnBoard.tsx';
import PartnerOnBoard from './pages/PartnerOnBoard.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='initial-page' element={<InitialPage />} />
      <Route path="/" element={<App />} >
        <Route path='landing-page' element={<LandingPage />} />
        <Route path='login' element={<Login />} />
        <Route path='signUp' element={<Signup />} />
        <Route path='user-sign-up' element={<UserOnBoard />} />
        <Route path='affiliate-sign-up' element={<AffiliateOnBoard />} />
        <Route path='partner-sign-up' element={<PartnerOnBoard />} />
      </Route>
    </>

  )
);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
