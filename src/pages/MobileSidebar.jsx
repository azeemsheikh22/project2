import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronDown,
  faChevronUp,
  faSearch,
  faTimes,
  faCarSide,
  faInfoCircle,
  faCheckSquare,
  faSquare,
} from "@fortawesome/free-solid-svg-icons"

export default function MobileSidebar({ 
  isOpen, 
  onClose, 
  selectedVehicles, 
  expandedGroups, 
  toggleGroup, 
  selectedItems, 
  toggleItemSelection, 
  deselectAll, 
  toggleSearchModal,
  fleetItems 
}) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 md:hidden">
     <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-lg flex flex-col h-full overflow-hidden animate-slide-in-right">
        {/* Header with close button */}
        <div className="bg-[#003049] text-white p-3 flex items-center justify-between">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faCarSide} className="mr-2" />
            <span className="font-medium">Vehicles Selected: {selectedVehicles}</span>
          </div>
          <button 
            className="text-white hover:bg-[#00253a] p-1 rounded transition-colors" 
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {/* Vehicle List Section */}
        <div className="bg-[#003049] text-white p-3 flex items-center justify-between border-t border-[#00253a]">
          <div className="flex items-center">
            <span className="font-medium">Vehicle List</span>
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
        <div className="bg-[#003049] text-white p-3 flex items-center justify-between border-t border-[#00253a]">
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
  )
}
