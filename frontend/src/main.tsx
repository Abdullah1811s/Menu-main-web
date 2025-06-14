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
import {
  AffiliatePrivateRoute,
  UserPrivateRoute
} from './components/index.ts'
import { AuthLoader } from './utils/authLoader.ts';
import UserDashboard from './pages/UserDashboard.tsx';
import AffiliateDashboard from './pages/AffiliateDashboard.tsx';

//this function will check if the user is authenticated 

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<InitialPage />} loader={AuthLoader} />
      <Route path="landing-page" element={<LandingPage />} />
      <Route path="login" element={<Login />} />
      <Route path="signUp" element={<Signup />} />
      <Route path="user-sign-up" element={<UserOnBoard />} />
      <Route path="affiliate-sign-up" element={<AffiliateOnBoard />} />
      <Route path="partner-sign-up" element={<PartnerOnBoard />} />


      //======================USER ROUTES==============================

      <Route path="user/:userId" element={<UserPrivateRoute />}>
        <Route index element={<LandingPage />} />
        <Route path='dashboard' element={<UserDashboard />} />
      </Route>

      //=====================AFFILIATE ROUTES=============================
      <Route path='/affiliate/:id' element={<AffiliatePrivateRoute />}>
        <Route index element={<LandingPage />} />
        <Route path='dashboard' element={<AffiliateDashboard />} />
      </Route>


    </Route>
  )
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)