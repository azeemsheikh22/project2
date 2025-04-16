import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
  faChevronDown, 
  faFilter, 
  faPlus, 
  faSearch, 
  faBell, 
  faExclamationTriangle,
  faCalendarAlt,
  faSortAmountDown,
  faEye,
  faPencilAlt,
  faChartLine,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons"
import Header from "../compunents/ui/Header"

export default function AlertOverview() {
  const [searchTerm, setSearchTerm] = useState("")
  const [timeFilter, setTimeFilter] = useState("today")
  const [sortBy, setSortBy] = useState("most-triggered")
  const [showFilters, setShowFilters] = useState(false)
  
  const alerts = [
    {
      id: "5809",
      title: "VTS-Suspicious Parking-City Fence",
      description: "Long Stop",
      lastTriggered: "Last Triggered: 2 hours ago",
      count: 2812,
      severity: "high",
      type: "parking"
    },
    {
      id: "4753",
      title: "VTS-Suspicious Parking-City Fence",
      description: "Long Stop",
      lastTriggered: "Last Triggered: 4 hours ago",
      count: 2105,
      severity: "high",
      type: "parking"
    },
    {
      id: "4181",
      title: "VTS-Suspicious Parking-City Fence",
      description: "Long Stop",
      lastTriggered: "Last Triggered: 6 hours ago",
      count: 2026,
      severity: "high",
      type: "parking"
    },
    {
      id: "5914",
      title: "VTS-Cessation of transmission",
      description: "Interruption of Transmission",
      lastTriggered: "Last Triggered: 8 hours ago",
      count: 448,
      severity: "medium",
      type: "transmission"
    },
    {
      id: "7494",
      title: "Panic Alert",
      description: "Panic Alert",
      lastTriggered: "Last Triggered: 2025-04-12 05:16 PM",
      count: 322,
      severity: "critical",
      type: "emergency"
    },
    {
      id: "2370",
      title: "VTS-Cessation of transmission",
      description: "Interruption of Transmission",
      lastTriggered: "Last Triggered: 12 hours ago",
      count: 175,
      severity: "medium",
      type: "transmission"
    },
    {
      id: "3652",
      title: "VTS-Over Speeding-City Fence",
      description: "Speed Exceeding Alert",
      lastTriggered: "Last Triggered: 1 day ago",
      count: 34,
      severity: "medium",
      type: "speed"
    },
    {
      id: "4188",
      title: "VTS-Over Speeding-City Fence",
      description: "Speed Exceeding Alert",
      lastTriggered: "Last Triggered: 2 days ago",
      count: 28,
      severity: "medium",
      type: "speed"
    },
    {
      id: "1827",
      title: "VTS-Night Driving-General",
      description: "Activity",
      lastTriggered: "Last Triggered: 3 days ago",
      count: 8,
      severity: "low",
      type: "activity"
    },
  ]

  // Filter alerts based on search term
  const filteredAlerts = alerts.filter(alert => 
    alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Get severity color
  const getSeverityColor = (severity) => {
    switch(severity) {
      case "critical": return "bg-red-600";
      case "high": return "bg-orange-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  }

  // Get alert type icon
  const getAlertTypeIcon = (type) => {
    switch(type) {
      case "parking": return <FontAwesomeIcon icon={faExclamationTriangle} className="text-orange-500" />;
      case "transmission": return <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500" />;
      case "emergency": return <FontAwesomeIcon icon={faBell} className="text-red-600" />;
      case "speed": return <FontAwesomeIcon icon={faChartLine} className="text-yellow-500" />;
      case "activity": return <FontAwesomeIcon icon={faInfoCircle} className="text-green-500" />;
      default: return <FontAwesomeIcon icon={faInfoCircle} className="text-gray-500" />;
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header Component */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1800px] mx-auto px-4 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Alert Overview</h1>
              <p className="text-gray-600 mt-1">Monitor and manage all system alerts</p>
            </div>
            <button className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white py-2.5 px-4 rounded-lg transition-colors shadow-sm">
              <FontAwesomeIcon icon={faPlus} />
              <span>Create a New Policy</span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search alerts by title or description..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FontAwesomeIcon 
                icon={faSearch} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <button 
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FontAwesomeIcon icon={faFilter} />
                <span>Filters</span>
                <FontAwesomeIcon icon={faChevronDown} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              
              <div className="relative">
                <select 
                  className="appearance-none pl-10 pr-8 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                >
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
                <FontAwesomeIcon 
                  icon={faCalendarAlt} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                />
                <FontAwesomeIcon 
                  icon={faChevronDown} 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                />
              </div>
              
              <div className="relative">
                <select 
                  className="appearance-none pl-10 pr-8 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="most-triggered">Most Triggered</option>
                  <option value="least-triggered">Least Triggered</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
                <FontAwesomeIcon 
                  icon={faSortAmountDown} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                />
                <FontAwesomeIcon 
                  icon={faChevronDown} 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                />
              </div>
            </div>
          </div>
          
          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="critical" className="h-4 w-4 text-indigo-600 rounded" />
                      <label htmlFor="critical" className="ml-2 text-sm text-gray-700">Critical</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="high" className="h-4 w-4 text-indigo-600 rounded" />
                      <label htmlFor="high" className="ml-2 text-sm text-gray-700">High</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="medium" className="h-4 w-4 text-indigo-600 rounded" />
                      <label htmlFor="medium" className="ml-2 text-sm text-gray-700">Medium</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="low" className="h-4 w-4 text-indigo-600 rounded" />
                      <label htmlFor="low" className="ml-2 text-sm text-gray-700">Low</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alert Type</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="parking" className="h-4 w-4 text-indigo-600 rounded" />
                      <label htmlFor="parking" className="ml-2 text-sm text-gray-700">Parking</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="transmission" className="h-4 w-4 text-indigo-600 rounded" />
                      <label htmlFor="transmission" className="ml-2 text-sm text-gray-700">Transmission</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="emergency" className="h-4 w-4 text-indigo-600 rounded" />
                      <label htmlFor="emergency" className="ml-2 text-sm text-gray-700">Emergency</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="speed" className="h-4 w-4 text-indigo-600 rounded" />
                      <label htmlFor="speed" className="ml-2 text-sm text-gray-700">Speed</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">From</label>
                      <input type="date" className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">To</label>
                      <input type="date" className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end gap-2">
                <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
                  Reset Filters
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Alert Cards Grid - Improved and Enlarged */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAlerts.map((alert) => (
            <AlertCard
              key={alert.id}
              id={alert.id}
              title={alert.title}
              description={alert.description}
              lastTriggered={alert.lastTriggered}
              count={alert.count}
              severity={alert.severity}
              type={alert.type}
              severityColor={getSeverityColor(alert.severity)}
              typeIcon={getAlertTypeIcon(alert.type)}
            />
          ))}
        </div>
        
        {/* Empty State */}
        {filteredAlerts.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400 text-xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              We couldn't find any alerts matching your search criteria. Try adjusting your filters or search term.
            </p>
            <button 
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              onClick={() => setSearchTerm("")}
            >
              Clear Search
            </button>
          </div>
        )}
        
        {/* Pagination */}
        {filteredAlerts.length > 0 && (
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center">
            <div className="text-sm text-gray-700 mb-4 sm:mb-0">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredAlerts.length}</span> of <span className="font-medium">{alerts.length}</span> results
            </div>
            <div className="flex space-x-1">
              <button className="px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1.5 border border-indigo-600 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">
                1
              </button>
              <button className="px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function AlertCard({ id, title, description, lastTriggered, count, severity, type, severityColor, typeIcon }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex">
        {/* Left side with ID badge and count */}
        <div className="relative w-28 bg-gray-50 flex items-center justify-center py-6">
          <div className={`absolute top-3 left-3 ${severityColor} text-white text-xs rounded-full w-12 h-12 flex items-center justify-center font-medium shadow-md`}>
            {id}
          </div>
          <div className="text-4xl font-bold text-gray-700">{count}</div>
        </div>

        {/* Right side with details */}
        <div className="p-5 flex-1">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <span className="mr-2 text-lg">{typeIcon}</span>
              <h3 className="text-base font-semibold text-indigo-700 truncate">{title}</h3>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              severity === 'critical' ? 'bg-red-100 text-red-800' :
              severity === 'high' ? 'bg-orange-100 text-orange-800' :
              severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {severity.charAt(0).toUpperCase() + severity.slice(1)}
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-2">{description}</p>
          <p className="text-xs text-gray-500 mb-4">{lastTriggered}</p>

          <div className="flex text-sm mt-3 pt-3 border-t border-gray-100">
            <a href="#" className="flex items-center text-indigo-600 hover:text-indigo-800 mr-6">
              <FontAwesomeIcon icon={faEye} className="mr-2" />
              <span>Policy Summary</span>
            </a>
            <a href="#" className="flex items-center text-indigo-600 hover:text-indigo-800">
              <FontAwesomeIcon icon={faPencilAlt} className="mr-2" />
              <span>Edit Policy</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

