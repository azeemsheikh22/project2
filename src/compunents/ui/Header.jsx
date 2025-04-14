import { useState, useEffect, useRef } from "react"
import {
  MapPin,
  LayoutDashboard,
  Map,
  Repeat,
  FileText,
  Bell,
  Clock,
  ChevronDown,
  Menu,
  X,
  User,
  HelpCircle,
  LogOut,
  Settings,
  MessageSquare,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import logo from "../../assets/logo.png"

// Navigation Item Component with hover effects
function NavItem({ icon, label, active = false }) {
  return (
    <motion.div
      className={`relative flex items-center justify-center px-4 py-3 border-r border-gray-700 cursor-pointer transition-all duration-300 hover:bg-[#1a4971] ${
        active ? "bg-[#337ab7]" : ""
      }`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.div>
        <span className="text-xs mt-1 font-medium">{label}</span>
        {active && (
          <motion.div 
            className="absolute bottom-0 left-0 h-1 bg-yellow-400 w-full"
            layoutId="activeIndicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>
    </motion.div>
  )
}

// Dropdown Menu Component
function DropdownMenu({ isOpen, items, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {items.map((item, index) => (
            <motion.a
              key={index}
              href={item.href || "#"}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              whileHover={{ x: 5 }}
              onClick={() => {
                if (item.onClick) item.onClick();
                onClose();
              }}
            >
              {item.icon && <span className="mr-2 text-gray-500">{item.icon}</span>}
              {item.label}
            </motion.a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [isHelpDropdownOpen, setIsHelpDropdownOpen] = useState(false)
  
  const userDropdownRef = useRef(null)
  const helpDropdownRef = useRef(null)
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Handle clicks outside dropdown to close them
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false)
      }
      if (helpDropdownRef.current && !helpDropdownRef.current.contains(event.target)) {
        setIsHelpDropdownOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  // User dropdown menu items
  const userMenuItems = [
    { icon: <User size={16} />, label: "Profile" },
    { icon: <Settings size={16} />, label: "Settings" },
    { icon: <LogOut size={16} />, label: "Logout" }
  ]
  
  // Help dropdown menu items
  const helpMenuItems = [
    { icon: <MessageSquare size={16} />, label: "Support" },
    { icon: <FileText size={16} />, label: "Documentation" },
    { icon: <HelpCircle size={16} />, label: "FAQs" }
  ]

  return (
    <motion.header 
      className={`sticky top-0 z-50 w-full ${
        isScrolled 
          ? "bg-[#002135] shadow-lg" 
          : "bg-[#003049]"
      } text-white transition-all duration-300`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="w-full max-w-[1800px] mx-auto lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="w-[205px] h-[40px] flex items-center justify-center overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.img 
              src={logo} 
              alt="Company Logo"
              className="h-full object-contain cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center pr-2 sm:py-5 py-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={35} /> : <Menu size={35} />}
            </motion.button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1">
            <NavItem icon={<MapPin />} label="LIVE MAP" />
            <NavItem icon={<LayoutDashboard />} label="DASHBOARD" />
            <NavItem icon={<Map />} label="GEOFENCE" active />
            <NavItem icon={<Repeat />} label="REPLAY" />
            <NavItem icon={<FileText />} label="REPORTS" />
            <NavItem icon={<Bell />} label="LIVE ALERT" />
            <NavItem icon={<Clock />} label="Driver TimeLine" />
          </nav>

          {/* User Profile - Desktop */}
          <div className="hidden md:flex items-center px-4">
            {/* User Dropdown */}
            <div className="relative" ref={userDropdownRef}>
              <motion.div 
                className="flex items-center cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setIsUserDropdownOpen(!isUserDropdownOpen)
                  setIsHelpDropdownOpen(false)
                }}
              >
                <motion.div 
                  className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden mr-2 flex items-center justify-center"
                  whileHover={{ borderRadius: "30%" }}
                >
                  <User className="text-gray-700" size={20} />
                </motion.div>
                <span className="mr-2 font-medium">TPPLINFO</span>
                <motion.div
                  animate={{ rotate: isUserDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </motion.div>
              
              {/* User Dropdown Menu */}
              <DropdownMenu 
                isOpen={isUserDropdownOpen} 
                items={userMenuItems}
                onClose={() => setIsUserDropdownOpen(false)}
              />
            </div>
            
            <span className="mx-4 text-gray-400">|</span>
            
            {/* Help Dropdown */}
            <div className="relative" ref={helpDropdownRef}>
              <motion.div 
                className="flex items-center cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setIsHelpDropdownOpen(!isHelpDropdownOpen)
                  setIsUserDropdownOpen(false)
                }}
              >
                <span className="mr-2 font-medium">Help</span>
                <motion.div
                  animate={{ rotate: isHelpDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </motion.div>
              
              {/* Help Dropdown Menu */}
              <DropdownMenu 
                isOpen={isHelpDropdownOpen} 
                items={helpMenuItems}
                onClose={() => setIsHelpDropdownOpen(false)}
              />
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col py-2 border-t border-gray-700">
                <MobileNavItem icon={<MapPin size={18} />} label="LIVE MAP" />
                <MobileNavItem icon={<LayoutDashboard size={18} />} label="DASHBOARD" />
                <MobileNavItem icon={<Map size={18} />} label="GEOFENCE" active />
                <MobileNavItem icon={<Repeat size={18} />} label="REPLAY" />
                <MobileNavItem icon={<FileText size={18} />} label="REPORTS" />
                <MobileNavItem icon={<Bell size={18} />} label="LIVE ALERT" />
                <MobileNavItem icon={<Clock size={18} />} label="Driver TimeLine" />
                
                <div className="border-t border-gray-700 mt-2 pt-2">
                  <MobileNavItem 
                    icon={<User size={18} />} 
                    label="TPPLINFO" 
                    onClick={() => {
                      // Handle mobile user menu click
                    }}
                  />
                  <MobileNavItem 
                    icon={<HelpCircle size={18} />} 
                    label="Help"
                    onClick={() => {
                      // Handle mobile help menu click
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

// Mobile Navigation Item
function MobileNavItem({ icon, label, active = false, onClick }) {
  return (
    <motion.div
      className={`flex items-center px-4 py-3 ${active ? "bg-[#337ab7]" : ""}`}
      whileTap={{ backgroundColor: "#1a4971" }}
      onClick={onClick}
    >
      <div className="mr-3">{icon}</div>
      <span className="font-medium">{label}</span>
      {active && (
        <motion.div 
          className="ml-auto h-2 w-2 rounded-full bg-yellow-400"
          layoutId="mobileActiveIndicator"
        />
      )}
    </motion.div>
  )
}
