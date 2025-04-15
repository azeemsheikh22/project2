import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GeofenceDashboard from './pages/geofence-dashboard'
import MapView from './pages/MapView'

function App() {
  return (
    <Router>
      <div className='h-screen bg-black w-full'>
        <Routes>
          <Route path="/geofence" element={<GeofenceDashboard />} />
          <Route path="/" element={<MapView  />} />
          {/* Add more routes here as needed */}
          {/* For example: */}
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
