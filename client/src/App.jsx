import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './screens/homepage/Homepage'
import PropertyListings from './screens/propertyListings/PropertyListings'
import RealEstateMap from './screens/realEstateMap/RealEstateMap'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/properties' element={<PropertyListings />} />
          <Route path='/temp' element={<RealEstateMap />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
