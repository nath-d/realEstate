import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './screens/homepage/Homepage'
import PropertyListings from './screens/propertyListings/PropertyListings'
import RealEstateMap from './screens/realEstateMap/RealEstateMap'
import PropertyDetails from './screens/propertyDetails/PropertyDetails'
import AboutUsPage from './screens/aboutUs/AboutUsPage'
import BlogsPage from './screens/blogs/BlogsPage'
import BlogPost from './screens/blogs/BlogPost'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/properties' element={<PropertyListings />} />
          <Route path='/temp' element={<RealEstateMap />} />
          <Route path='/propertyDet' element={<PropertyDetails />} />
          <Route path='/about' element={<AboutUsPage />} />
          <Route path='/blogs' element={<BlogsPage />} />
          <Route path='/blogs/:id' element={<BlogPost />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
