import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FavoritesProvider } from './contexts/FavoritesContext.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Homepage from './screens/homepage/Homepage'
import PropertyListings from './screens/propertyListings/PropertyListings'
import RealEstateMap from './screens/realEstateMap/RealEstateMap'
import PropertyDetails from './screens/propertyDetails/PropertyDetails'
import AboutUsPage from './screens/aboutUs/AboutUsPage'
import ContactUsPage from './screens/contactUs/ContactUsPage'
import BlogsPage from './screens/blogs/BlogsPage'
import BlogPost from './screens/blogs/BlogPost'
import LoginPage from './screens/login/LoginPage'
import SignupPage from './screens/signup/SignupPage'
import ForgotPasswordPage from './screens/forgotPassword/ForgotPasswordPage'
import ProfilePage from './screens/profile/ProfilePage'
import AuthCallback from './screens/auth/AuthCallback'
import VerifyEmail from './screens/auth/VerifyEmail'
import ResetPassword from './screens/auth/ResetPassword'
import FavoritesPage from './screens/favorites/FavoritesPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <FavoritesProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/properties' element={<PropertyListings />} />
            <Route path='/temp' element={<RealEstateMap />} />
            <Route path='/propertyDet' element={<PropertyDetails />} />
            <Route path='/about' element={<AboutUsPage />} />
            <Route path='/contact' element={<ContactUsPage />} />
            <Route path='/blogs' element={<BlogsPage />} />
            <Route path='/blogs/:id' element={<BlogPost />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/forgot-password' element={<ForgotPasswordPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/favorites' element={<FavoritesPage />} />
            <Route path='/auth/callback' element={<AuthCallback />} />
            <Route path='/verify-email' element={<VerifyEmail />} />
            <Route path='/reset-password' element={<ResetPassword />} />
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </>
  )
}

export default App
