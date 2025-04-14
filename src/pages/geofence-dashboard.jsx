import { useState } from "react"
import {
  MapPin,
  LayoutDashboard,
  Map,
  Repeat,
  FileText,
  Bell,
  ChevronDown,
  Edit,
  BarChart2,
  Check,
  Search,
  Calendar,
} from "lucide-react"
import Header from "../compunents/ui/Header"

export default function GeofenceDashboard() {
  const [selectedPlaces, setSelectedPlaces] = useState(0)

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header Component */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1800px] mx-auto px-4 lg:px-8 py-6">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl text-gray-800 font-medium">
            <span className="text-indigo-600 font-semibold">1146</span> Geofences
          </h1>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all shadow-sm hover:shadow flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              <span>Manage Categories</span>
            </button>
            <button className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-all shadow-sm hover:shadow flex items-center gap-2">
              <Map className="w-4 h-4" />
              <span>Create a New Geofence</span>
            </button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <InfoCard 
            count="1146" 
            title="Total Geofences" 
            actionText="Show All Geofences" 
            icon={<Map className="w-5 h-5 text-indigo-500" />}
            color="indigo"
          />
          <InfoCard 
            count="1146" 
            title="Geofences to Correct" 
            actionText="Correct Now" 
            icon={<Edit className="w-5 h-5 text-amber-500" />}
            color="amber"
          />
          <InfoCard 
            count="0" 
            title="Suggested Geofences" 
            actionText="View and Edit" 
            icon={<Bell className="w-5 h-5 text-emerald-500" />}
            color="emerald"
          />
        </div>

        {/* Selection Info */}
        <div className="mb-6">
          <p className="text-gray-700 font-medium flex items-center gap-2">
            <Check className="w-4 h-4 text-indigo-600" />
            <span>{selectedPlaces} places selected</span>
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row justify-between mb-6 gap-4">
          <div className="relative flex-grow max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400"
              placeholder="Search for a geofence..."
            />
          </div>
          
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-gray-700 font-medium">Show visits for:</span>
            <div className="relative">
              <select 
                className="appearance-none bg-white border border-gray-300 rounded-lg py-2.5 pl-4 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                defaultValue="today"
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-300 shadow-sm">
              <Calendar className="w-4 h-4 text-indigo-500" />
              <span className="text-gray-700">04/12/2025</span>
            </div>
          </div>
        </div>

        {/* Geofence Table */}
{/* Geofence Table */}
<div className="overflow-hidden rounded-xl shadow-sm border border-gray-200 bg-white">
  <div className="overflow-x-auto">
    <table className="w-full min-w-full divide-y divide-gray-200">
      <thead>
        <tr className="bg-gray-50">
          <th className="p-3 w-10 text-left">
            <label className="inline-flex items-center justify-center">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-opacity-25 transition-all cursor-pointer"
              />
              <span className="sr-only">Select All</span>
            </label>
          </th>
          <th className="p-3 text-left">
            <div className="flex items-center text-xs uppercase tracking-wider font-semibold text-gray-600">
              Total Visits
              <button className="ml-1 text-gray-500 hover:text-indigo-600 focus:outline-none">
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </th>
          <th className="p-3 text-left text-xs uppercase tracking-wider font-semibold text-gray-600">Geofence Name</th>
          <th className="p-3 text-left">
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-gray-600">Category</span>
              <div className="relative">
                <select 
                  className="appearance-none w-full bg-white border border-gray-300 rounded-md py-1.5 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
                  defaultValue="all"
                >
                  <option value="all">All Categories</option>
                  <option value="city">City</option>
                  <option value="tppl">TPPL Sites</option>
                  <option value="parking">Parking</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          </th>
          <th className="p-3 text-left text-xs uppercase tracking-wider font-semibold text-gray-600">Address</th>
          <th className="p-3 text-left text-xs uppercase tracking-wider font-semibold text-gray-600">City</th>
          <th className="p-3 w-24 text-center text-xs uppercase tracking-wider font-semibold text-gray-600">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        <GeofenceRow
          visits={107}
          name="City~ Karachi Fence for special"
          category="CITY"
          address="Karachi, Pakistan"
          city="Sindh"
        />
        <GeofenceRow
          visits={86}
          name="Karachi City Fence"
          category="General"
          address="Karachi, Pakistan"
          city="Sindh"
        />
        <GeofenceRow
          visits={62}
          name="ST NAVEED TRUCKING"
          category="TPPL Sites Sindh"
          address="24.86794444 67.30558333"
          city=""
        />
        <GeofenceRow
          visits={59}
          name="ST Al Raheem Filling Station"
          category="TPPL Sites Sindh"
          address="24.86727778 67.30580556"
          city=""
        />
        <GeofenceRow
          visits={54}
          name="MCR_Rasch Base"
          category="Haulier Base"
          address="30.15608225699278, 70.9"
          city=""
        />
        <GeofenceRow
          visits={50}
          name="P MCH_Punjab Parking"
          category="Private Parking"
          address="31.726425, 73.919477"
          city=""
        />
        <GeofenceRow
          visits={48}
          name="City~ Lahore Fence for special"
          category="CITY"
          address="Lahore, Pakistan"
          city="Punjab"
        />
        <GeofenceRow
          visits={46}
          name="P Machike"
          category="Private Parking"
          address="Machike, Pakistan"
          city="Sheikhupura"
        />
      </tbody>
    </table>
  </div>
</div>

        
        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of <span className="font-medium">1146</span> results
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1.5 border border-indigo-600 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">1</button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">2</button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">3</button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">Next</button>
          </div>
        </div>
      </main>
    </div>
  )
}

// Info Card Component
function InfoCard({ count, title, actionText, icon, color }) {
  const colorClasses = {
    indigo: "text-indigo-600 hover:text-indigo-800",
    amber: "text-amber-600 hover:text-amber-800",
    emerald: "text-emerald-600 hover:text-emerald-800"
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-shrink-0 p-3 bg-gray-50 rounded-lg">
          {icon}
        </div>
        <div className="text-3xl font-bold text-gray-800">{count}</div>
      </div>
      <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">{title}</h3>
      <button className={`flex items-center text-sm font-medium ${colorClasses[color]} mt-2`}>
        <span>{actionText}</span>
        <ChevronDown className="w-4 h-4 ml-1 transform rotate-270" />
      </button>
    </div>
  )
}

// Geofence Table Row Component
function GeofenceRow({ visits, name, category, address, city }) {
  const maxVisits = 107 // Maximum visits in the dataset
  const percentage = (visits / maxVisits) * 100
  
  // Category icon mapping
  const getCategoryIcon = (category) => {
    switch(category) {
      case "CITY": return <MapPin className="w-4 h-4 text-indigo-500" />;
      case "TPPL Sites Sindh": return <FileText className="w-4 h-4 text-amber-500" />;
      case "Private Parking": return <MapPin className="w-4 h-4 text-emerald-500" />;
      case "Haulier Base": return <MapPin className="w-4 h-4 text-blue-500" />;
      default: return <MapPin className="w-4 h-4 text-gray-500" />;
    }
  }

  // Get category badge color
  const getCategoryBadgeColor = (category) => {
    switch(category) {
      case "CITY": return "bg-indigo-100 text-indigo-800";
      case "TPPL Sites Sindh": return "bg-amber-100 text-amber-800";
      case "Private Parking": return "bg-emerald-100 text-emerald-800";
      case "Haulier Base": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  }

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="p-3 whitespace-nowrap">
        <div className="flex items-center justify-center">
          <label className="inline-flex items-center">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-opacity-25 transition-all cursor-pointer"
            />
            <span className="sr-only">Select row</span>
          </label>
        </div>
      </td>
      <td className="p-3 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <span className="font-medium text-gray-900 w-8 text-right">{visits}</span>
          <div className="w-full max-w-[100px] bg-gray-200 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-indigo-500 h-2.5 rounded-full" 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      </td>
      <td className="p-3 whitespace-nowrap">
        <div className="font-medium text-gray-900 hover:text-indigo-600 cursor-pointer">{name}</div>
      </td>
      <td className="p-3 whitespace-nowrap">
        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryBadgeColor(category)}">
          {getCategoryIcon(category)}
          <span className="ml-1.5">{category}</span>
        </div>
      </td>
      <td className="p-3 whitespace-nowrap text-sm text-gray-700">{address}</td>
      <td className="p-3 whitespace-nowrap text-sm text-gray-700">{city || "—"}</td>
      <td className="p-3 whitespace-nowrap">
        <div className="flex items-center justify-center space-x-2">
          <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </button>
          <button className="p-1.5 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50">
            <BarChart2 className="h-4 w-4" />
            <span className="sr-only">Analytics</span>
          </button>
          <button className="p-1.5 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50">
            <Check className="h-4 w-4" />
            <span className="sr-only">Approve</span>
          </button>
        </div>
      </td>
    </tr>
  )
}


