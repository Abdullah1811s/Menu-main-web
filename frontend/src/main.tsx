import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/LandingPage.tsx'
import Login from './components/custom_components/Login.tsx'
import Signup from './components/custom_components/Signup.tsx'
import UserOnBoard from './components/custom_components/UserOnBoard.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route path='' element={<LandingPage />} />
      <Route path='login' element={<Login />} />
      <Route path='signUp' element={<Signup />} />
      <Route path='UserOnBoard' element={<UserOnBoard />} />
    </Route>
  )
);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
