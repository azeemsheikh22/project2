import './App.css'
import { Routes, Route } from 'react-router-dom'
import GeofenceDashboard from './pages/geofence-dashboard'
import MapView from './pages/MapView'
import AlertOverview from './pages/AlertOverview'

function App() {
  return (
  
      <div className='h-screen bg-black w-full'>
        <Routes>
          <Route path="/geofence" element={<GeofenceDashboard />} />
          <Route path="/alerts" element={<AlertOverview />} />
          <Route path="/" element={<MapView  />} />
          {/* Add more routes here as needed */}
          {/* For example: */}
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </div>
   
  )
}

export default App
