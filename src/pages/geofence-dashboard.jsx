import { useState } from "react";
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
} from "lucide-react";
import Header from "../compunents/ui/Header";

export default function GeofenceDashboard() {
  const [selectedPlaces, setSelectedPlaces] = useState(0);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Sample data
  const geofenceData = [
    {
      id: 1,
      visits: 107,
      name: "City~ Karachi Fence for special",
      category: "CITY",
      address: "Karachi, Pakistan",
      city: "Sindh",
    },
    {
      id: 2,
      visits: 86,
      name: "Karachi City Fence",
      category: "General",
      address: "Karachi, Pakistan",
      city: "Sindh",
    },
    {
      id: 3,
      visits: 62,
      name: "ST NAVEED TRUCKING",
      category: "TPPL Sites Sindh",
      address: "24.86794444 67.30558333",
      city: "",
    },
    {
      id: 4,
      visits: 59,
      name: "ST Al Raheem Filling Station",
      category: "TPPL Sites Sindh",
      address: "24.86727778 67.30580556",
      city: "",
    },
    {
      id: 5,
      visits: 54,
      name: "MCR_Rasch Base",
      category: "Haulier Base",
      address: "30.15608225699278, 70.9",
      city: "",
    },
    {
      id: 6,
      visits: 50,
      name: "P MCH_Punjab Parking",
      category: "Private Parking",
      address: "31.726425, 73.919477",
      city: "",
    },
    {
      id: 7,
      visits: 48,
      name: "City~ Lahore Fence for special",
      category: "CITY",
      address: "Lahore, Pakistan",
      city: "Punjab",
    },
    {
      id: 8,
      visits: 46,
      name: "P Machike",
      category: "Private Parking",
      address: "Machike, Pakistan",
      city: "Sheikhupura",
    },
  ];

  // Handle select all
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    if (newSelectAll) {
      const allIds = geofenceData.map((item) => item.id);
      setSelectedRows(allIds);
      setSelectedPlaces(allIds.length);
    } else {
      setSelectedRows([]);
      setSelectedPlaces(0);
    }
  };

  // Handle row selection
  const handleRowSelect = (id) => {
    const newSelectedRows = selectedRows.includes(id)
      ? selectedRows.filter((rowId) => rowId !== id)
      : [...selectedRows, id];

    setSelectedRows(newSelectedRows);
    setSelectedPlaces(newSelectedRows.length);
    setSelectAll(newSelectedRows.length === geofenceData.length);
  };

  // Filter data based on category
  const filteredData =
    categoryFilter === "all"
      ? geofenceData
      : geofenceData.filter((item) =>
          item.category.toLowerCase().includes(categoryFilter.toLowerCase())
        );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header Component */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1800px] mx-auto px-4 lg:px-8 py-6">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl text-gray-800 font-medium">
            <span className="text-indigo-600 font-semibold">1146</span>{" "}
            Geofences
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

        {/* Custom Geofence Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
{/* Table Header */}
<div className="hidden md:grid grid-cols-12 gap-2 p-3 border-b border-gray-200 bg-gray-50">
  <div className="col-span-1 flex items-center justify-center">
    <input 
      type="checkbox" 
      checked={selectAll}
      onChange={handleSelectAll}
      className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-opacity-25 transition-all cursor-pointer"
    />
  </div>
  <div className="col-span-2 flex items-center">
    <span className="text-xs uppercase tracking-wider font-semibold text-gray-600">Total Visits</span>
    <button className="ml-1 text-gray-500 hover:text-indigo-600 focus:outline-none">
      <ChevronDown className="w-4 h-4" />
    </button>
  </div>
  <div className="col-span-2 text-xs uppercase tracking-wider font-semibold text-gray-600">
    Geofence Name
  </div>
  <div className="col-span-2">
    <div className="flex flex-col gap-2">
      <span className="text-xs uppercase tracking-wider font-semibold text-gray-600">Category</span>
      <div className="relative">
        <select 
          className="appearance-none w-full bg-white border border-gray-300 rounded-md py-1.5 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
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
  </div>
  <div className="col-span-2 text-xs uppercase tracking-wider font-semibold text-gray-600">
    Address
  </div>
  <div className="col-span-1 text-xs uppercase tracking-wider font-semibold text-gray-600">
    City
  </div>
  <div className="col-span-2 text-center text-xs uppercase tracking-wider font-semibold text-gray-600">
    Actions
  </div>
</div>

{/* Mobile Filter */}
<div className="md:hidden p-4 bg-gray-50 border-b border-gray-200">
  <div className="flex items-center justify-between mb-3">
    <div className="flex items-center gap-2">
      <input 
        type="checkbox" 
        checked={selectAll}
        onChange={handleSelectAll}
        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-opacity-25"
      />
      <span className="text-xs uppercase tracking-wider font-semibold text-gray-600">Select All</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-xs uppercase tracking-wider font-semibold text-gray-600">Sort by:</span>
      <button className="flex items-center text-gray-600 text-sm">
        Visits <ChevronDown className="w-4 h-4 ml-1" />
      </button>
    </div>
  </div>
  <div className="relative">
    <select 
      className="appearance-none w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
      value={categoryFilter}
      onChange={(e) => setCategoryFilter(e.target.value)}
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


          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {filteredData.map((item) => (
              <GeofenceGridRow
                key={item.id}
                id={item.id}
                visits={item.visits}
                name={item.name}
                category={item.category}
                address={item.address}
                city={item.city}
                isSelected={selectedRows.includes(item.id)}
                onSelect={() => handleRowSelect(item.id)}
                maxVisits={107} // Maximum visits in the dataset
              />
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">8</span> of{" "}
            <span className="font-medium">1146</span> results
          </div>
          <div className="flex gap-2">
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
      </main>
    </div>
  );
}

// Info Card Component
function InfoCard({ count, title, actionText, icon, color }) {
  const colorClasses = {
    indigo: "text-indigo-600 hover:text-indigo-800",
    amber: "text-amber-600 hover:text-amber-800",
    emerald: "text-emerald-600 hover:text-emerald-800",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-shrink-0 p-3 bg-gray-50 rounded-lg">{icon}</div>
        <div className="text-3xl font-bold text-gray-800">{count}</div>
      </div>
      <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">{title}</h3>
      <button
        className={`flex items-center text-sm font-medium ${colorClasses[color]} mt-2`}
      >
        <span>{actionText}</span>
        <ChevronDown className="w-4 h-4 ml-1 transform rotate-270" />
      </button>
    </div>
  );
}
// Geofence Grid Row Component (replacement for table row)
// Geofence Grid Row Component (replacement for table row)
function GeofenceGridRow({
  id,
  visits,
  name,
  category,
  address,
  city,
  isSelected,
  onSelect,
  maxVisits,
}) {
  const percentage = (visits / maxVisits) * 100;

  // Category icon mapping
  const getCategoryIcon = (category) => {
    switch (category) {
      case "CITY":
        return <MapPin className="w-4 h-4 text-indigo-500" />;
      case "TPPL Sites Sindh":
        return <FileText className="w-4 h-4 text-amber-500" />;
      case "Private Parking":
        return <MapPin className="w-4 h-4 text-emerald-500" />;
      case "Haulier Base":
        return <MapPin className="w-4 h-4 text-blue-500" />;
      default:
        return <MapPin className="w-4 h-4 text-gray-500" />;
    }
  };

  // Get category badge color
  const getCategoryBadgeColor = (category) => {
    switch (category) {
      case "CITY":
        return "bg-indigo-100 text-indigo-800";
      case "TPPL Sites Sindh":
        return "bg-amber-100 text-amber-800";
      case "Private Parking":
        return "bg-emerald-100 text-emerald-800";
      case "Haulier Base":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Mobile card view
  const mobileView = (
    <div
      className={`block md:hidden p-4 border-b border-gray-200 ${
        isSelected ? "bg-indigo-50" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-opacity-25"
          />
          <span className="font-medium text-gray-900">{name}</span>
        </div>
        <div
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryBadgeColor(
            category
          )}`}
        >
          {getCategoryIcon(category)}
          <span className="ml-1.5">{category}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-2">
        <div>
          <span className="text-xs text-gray-500">Visits</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-medium text-gray-900">{visits}</span>
            <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-500 h-2.5 rounded-full"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div>
          <span className="text-xs text-gray-500">City</span>
          <div className="text-sm text-gray-700 mt-1">{city || "—"}</div>
        </div>
      </div>

      <div className="mb-2">
        <span className="text-xs text-gray-500">Address</span>
        <div className="text-sm text-gray-700 mt-1">{address}</div>
      </div>

      <div className="flex justify-end space-x-2 mt-3">
        <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors">
          <Edit className="h-4 w-4" />
        </button>
        <button className="p-1.5 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors">
          <BarChart2 className="h-4 w-4" />
        </button>
        <button className="p-1.5 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors">
          <Check className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  // Desktop grid view
  const desktopView = (
    <div
      className={`hidden md:grid grid-cols-12 gap-2 p-3 hover:bg-gray-50 transition-colors ${
        isSelected ? "bg-indigo-50" : ""
      }`}
    >
      <div className="col-span-1 flex items-center justify-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-opacity-25 transition-all cursor-pointer"
        />
      </div>
      <div className="col-span-2">
        <div className="flex items-center gap-3">
          <span className="font-medium text-gray-900 w-8 text-right">
            {visits}
          </span>
          <div className="w-full max-w-[100px] bg-gray-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-500 h-2.5 rounded-full"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="col-span-2 font-medium text-gray-900 hover:text-indigo-600 cursor-pointer truncate">
        {name}
      </div>
      <div className="col-span-2">
        <div
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryBadgeColor(
            category
          )}`}
        >
          {getCategoryIcon(category)}
          <span className="ml-1.5 truncate">{category}</span>
        </div>
      </div>
      <div className="col-span-2 text-sm text-gray-700 truncate">{address}</div>
      <div className="col-span-1 text-sm text-gray-700">{city || "—"}</div>
      <div className="col-span-2 flex items-center justify-center space-x-2">
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
    </div>
  );

  return (
    <>
      {mobileView}
      {desktopView}
    </>
  );
}
