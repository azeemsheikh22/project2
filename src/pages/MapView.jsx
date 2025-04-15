import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronDown,
  faChevronUp,
  faSearch,
  faCarSide,
  faInfoCircle,
  faMapMarkerAlt,
  faLayerGroup,
  faEye,
  faRoad,
  faSatellite,
  faMap,
  faCheckSquare,
  faSquare,
  faBars,
} from "@fortawesome/free-solid-svg-icons"
import Header from "../compunents/ui/Header"
import MobileSidebar from "./MobileSidebar"

export default function MapView() {
  const [selectedVehicles, setSelectedVehicles] = useState(0)
  const [expandedGroups, setExpandedGroups] = useState({
    vehicleList: true,
    vehicleStatus: false, // Initially collapsed
  })
  const [selectedItems, setSelectedItems] = useState([])
  const [mapType, setMapType] = useState("map")
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleGroup = (group) => {
    setExpandedGroups({
      ...expandedGroups,
      [group]: !expandedGroups[group],
    })
  }

  const toggleItemSelection = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id))
      setSelectedVehicles(selectedVehicles - 1)
    } else {
      setSelectedItems([...selectedItems, id])
      setSelectedVehicles(selectedVehicles + 1)
    }
  }

  const deselectAll = () => {
    setSelectedItems([])
    setSelectedVehicles(0)
  }

  const toggleSearchModal = () => {
    setShowSearchModal(!showSearchModal)
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const fleetItems = [
    { id: 1, name: "Entire Fleet" },
    { id: 2, name: "Al Razzaq Filling Station (TPPL)" },
    { id: 3, name: "Cararaj River View Filling Station (TPPL)" },
    { id: 4, name: "Carvan Carriage Co. (TPPL)" },
    { id: 5, name: "Fairways OCC (TPPL)" },
    { id: 6, name: "Humayun Fuel Fleet (TPPL)" },
    { id: 7, name: "Khazan Associates (TPPL)" },
    { id: 8, name: "KOTC (TPPL)" },
    { id: 9, name: "Meezan Filling Station (TPPL)" },
    { id: 10, name: "PNC (TPPL)" },
    { id: 11, name: "Rasch (TPPL)" },
    { id: 12, name: "Sapghi (TPPL)" },
    { id: 13, name: "Self Carriage (TPPL)" },
    { id: 14, name: "Tristar (TPPL)" },
    { id: 15, name: "[Ungrouped]" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header Component */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 w-full">
        {/* Hamburger menu for mobile */}
        <div className="md:hidden fixed top-20 left-4 z-30">
          <button 
            onClick={toggleSidebar}
            className="bg-blue-500 w-[40px] h-[40px] overflow-hidden flex items-center justify-center rounded-full shadow-lg text-white hover:bg-gray-100 hover:text-black transition-colors"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>

        {/* Mobile Sidebar Component */}
        <MobileSidebar 
          isOpen={sidebarOpen}
          onClose={toggleSidebar}
          selectedVehicles={selectedVehicles}
          expandedGroups={expandedGroups}
          toggleGroup={toggleGroup}
          selectedItems={selectedItems}
          toggleItemSelection={toggleItemSelection}
          deselectAll={deselectAll}
          toggleSearchModal={toggleSearchModal}
          fleetItems={fleetItems}
        />

        {/* Main content area */}
        <div className="flex flex-col md:flex-row h-[calc(100vh-64px)]">
          {/* Left sidebar - only visible on desktop */}
          <div className="hidden md:block md:w-72 lg:w-80 2xl:w-96 bg-white border-r flex-shrink-0">
            <div className="flex flex-col h-full overflow-hidden">
              {/* Vehicle selection header */}
              <div className="bg-[#003049] text-white p-3 flex items-center justify-between">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faCarSide} className="mr-2" />
                  <span className="font-medium">Vehicles Selected: {selectedVehicles}</span>
                </div>
                <button 
                  className="text-white hover:bg-[#00253a] p-1 rounded transition-colors" 
                  onClick={() => toggleGroup("vehicleList")}
                >
                  <FontAwesomeIcon icon={expandedGroups.vehicleList ? faChevronUp : faChevronDown} />
                </button>
              </div>

              {/* Group dropdown and search */}
              {expandedGroups.vehicleList && (
                <>
                  <div className="p-3 border-b flex items-center gap-2">
                    <div className="relative flex-1">
                      <select className="w-full p-2 border border-gray-300 rounded appearance-none pr-8 bg-white focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all">
                        <option>All Groups</option>
                        <option>TPPL</option>
                        <option>Filling Stations</option>
                      </select>
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                      />
                    </div>
                    {/* Animated search button */}
                    <button 
                      className="border border-gray-300 rounded p-2 hover:bg-gray-100 transition-colors relative overflow-hidden group"
                      onClick={toggleSearchModal}
                    >
                      <FontAwesomeIcon 
                        icon={faSearch} 
                        className="text-gray-600 transform group-hover:scale-110 transition-transform duration-300" 
                      />
                      <span className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 rounded transition-opacity duration-300"></span>
                    </button>
                  </div>

                  {/* Vehicle list */}
                  <div className="flex-1 overflow-y-auto">
                    <ul className="divide-y divide-gray-200">
                      {fleetItems.map((item) => (
                                            <li 
                                            key={item.id} 
                                            className="flex items-center p-3 hover:bg-gray-50 transition-colors cursor-pointer"
                                            onClick={() => toggleItemSelection(item.id)}
                                          >
                                            <div className="mr-2 text-lg text-gray-600">
                                              <FontAwesomeIcon 
                                                icon={selectedItems.includes(item.id) ? faCheckSquare : faSquare} 
                                                className={selectedItems.includes(item.id) ? "text-blue-500" : "text-gray-400"}
                                              />
                                            </div>
                                            {item.id === 1 ? (
                                              <span className="font-bold text-gray-800">{item.name}</span>
                                            ) : (
                                              <span className="text-gray-700">{item.name}</span>
                                            )}
                                          </li>
                                        ))}
                                      </ul>
                                      <div className="p-3 text-center border-t">
                                        <button 
                                          className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                                          onClick={deselectAll}
                                        >
                                          Deselect All
                                        </button>
                                      </div>
                                    </div>
                                  </>
                                )}
                  
                                {/* Vehicle status */}
                                <div className="bg-[#003049] text-white p-3 flex items-center justify-between">
                                  <div className="flex items-center">
                                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                                    <span className="font-medium">Vehicle Status</span>
                                  </div>
                                  <button 
                                    className="text-white hover:bg-[#00253a] p-1 rounded transition-colors" 
                                    onClick={() => toggleGroup("vehicleStatus")}
                                  >
                                    <FontAwesomeIcon icon={expandedGroups.vehicleStatus ? faChevronUp : faChevronDown} />
                                  </button>
                                </div>
                                
                                {expandedGroups.vehicleStatus && (
                                  <div className="p-3 text-gray-700">
                                    <div className="flex items-center mb-2">
                                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                      <span>Moving (12)</span>
                                    </div>
                                    <div className="flex items-center mb-2">
                                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                                      <span>Stopped (8)</span>
                                    </div>
                                    <div className="flex items-center mb-2">
                                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                                      <span>Idle (3)</span>
                                    </div>
                                    <div className="flex items-center">
                                      <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
                                      <span>No Data (2)</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                  
                            {/* Map area */}
                            <div className="flex-1 relative">
                              {/* Google Maps iframe */}
                              <div className="w-full h-full relative">
                                <iframe 
                                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14160049.854754211!2d58.341959889691495!3d29.949429626728378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38db52d2f8fd751f%3A0x46b7a1f7e614925c!2sPakistan!5e0!3m2!1sen!2s!4v1744735981949!5m2!1sen!2s" 
                                  className="w-full h-full absolute inset-0"
                                  style={{ border: 0 }}
                                  allowFullScreen=""
                                  loading="lazy"
                                  referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                  
                                {/* Map controls - responsive */}
                                <div className="absolute top-16 right-4 flex flex-col space-y-2 z-10 md:flex-row md:space-y-0 md:space-x-2 md:top-4">
                                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded shadow-md flex items-center justify-center transition-colors">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                                    <span className="hidden md:inline">Add to Map</span>
                                    <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
                                  </button>
                                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded shadow-md flex items-center justify-center transition-colors">
                                    <FontAwesomeIcon icon={faLayerGroup} className="mr-2" />
                                    <span className="hidden md:inline">Map Options</span>
                                    <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
                                  </button>
                                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded shadow-md flex items-center justify-center transition-colors">
                                    <FontAwesomeIcon icon={faEye} className="mr-2" />
                                    <span className="hidden md:inline">Show Vehicles</span>
                                    <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
                                  </button>
                                </div>
                  
                                {/* Map type controls */}
                                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-md shadow-md flex z-10">
                                  <button 
                                    className={`px-4 py-2 flex items-center transition-colors ${mapType === 'traffic' ? 'bg-gray-200 font-medium' : 'hover:bg-gray-100'}`}
                                    onClick={() => setMapType('traffic')}
                                  >
                                    <FontAwesomeIcon icon={faRoad} className="mr-2 text-gray-700" />
                                    <span className="hidden sm:inline">Traffic</span>
                                  </button>
                                  <button 
                                    className={`px-4 py-2 flex items-center transition-colors ${mapType === 'map' ? 'bg-gray-200 font-medium' : 'hover:bg-gray-100'}`}
                                    onClick={() => setMapType('map')}
                                  >
                                    <FontAwesomeIcon icon={faMap} className="mr-2 text-gray-700" />
                                    <span className="hidden sm:inline">Map</span>
                                  </button>
                                  <button 
                                    className={`px-4 py-2 flex items-center transition-colors ${mapType === 'satellite' ? 'bg-gray-200 font-medium' : 'hover:bg-gray-100'}`}
                                    onClick={() => setMapType('satellite')}
                                  >
                                    <FontAwesomeIcon icon={faSatellite} className="mr-2 text-gray-700" />
                                    <span className="hidden sm:inline">Satellite</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </main>
                  
            
                      </div>
                    )
                  }
                  
