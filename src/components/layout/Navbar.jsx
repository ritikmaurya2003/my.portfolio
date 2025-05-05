import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../context/AuthContext'
import Button from '../ui/Button'

const Navbar = ({ textEnter, textLeave }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const { currentUser, logout } = useAuth()

  // Check if user has scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Resume', path: '/resume' },
    { name: 'Contact', path: '/contact' },
    { name: 'Fun', path: '/fun' }
  ]

  // Add Resources link if user is authenticated
  if (currentUser) {
    navLinks.push({ name: 'Resources', path: '/resources' })
  }

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Failed to log out', error)
    }
  }

  return (
    <motion.nav 
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300 ${
        isScrolled ? 'nav-blur' : 'bg-transparent'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-bold"
          onMouseEnter={textEnter}
          onMouseLeave={textLeave}
        >
          R<span className="text-red-500">.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-all duration-300 hover:text-gray-300 ${
                location.pathname === link.path ? 'text-white' : 'text-gray-400'
              }`}
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Login/Logout Button */}
          {currentUser ? (
            <div className="relative group">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className=" p-2 rounded-full cursor-pointer"
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
              >
                <FontAwesomeIcon icon={faUser} />
              </motion.div>
              <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded-lg shadow-lg py-2 z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="px-4 py-2 border-b border-gray-700">
                  <p className="text-sm">{currentUser.email}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-[#111] transition duration-150"
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="glass p-2 rounded-full cursor-pointer"
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
              >
                <FontAwesomeIcon icon={faUser} />
              </motion.div>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            className="p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            onMouseEnter={textEnter}
            onMouseLeave={textLeave}
          >
            <div className="w-5 h-5 flex flex-col justify-between">
              <span className={`bg-black h-0.5 w-full transition-all duration-300 ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></span>
              <span className={`bg-black h-0.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`bg-black h-0.5 w-full transition-all duration-300 ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-black mt-4 rounded-lg overflow-hidden glass"
        >
          <div className="flex flex-col space-y-3 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-2 transition-colors ${
                  location.pathname === link.path ? 'text-white' : 'text-gray-400'
                }`}
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Login/Logout Link */}
            {currentUser ? (
              <button 
                onClick={handleLogout}
                className="text-left py-2 text-gray-400 hover:text-white transition-colors"
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                className="block py-2 text-gray-400 hover:text-white transition-colors"
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
              >
                Login
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar