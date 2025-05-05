import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'

const Footer = ({ textEnter, textLeave }) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link 
              to="/" 
              className="text-2xl font-bold"
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
            >
              R<span className="text-red-500">.</span>
            </Link>
            <p className="mt-4 text-gray-400">
              Building digital experiences with attention to detail and a passion for clean code.
            </p>
            <div className="mt-6 flex space-x-4">
              <motion.a 
                href="https://github.com/ritikmaurya2003" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
              >
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </motion.a>
              <motion.a 
                href="https://linkedin.com/in/ritikmaurya08" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
              >
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </motion.a>
              <motion.a 
                href="https://x.com/exoticxritik" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
              >
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/exoticxritik/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
              >
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-400 hover:text-white transition-colors"
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                >
                  About Me
                </Link>
              </li>
              <li>
                <Link 
                  to="/projects" 
                  className="text-gray-400 hover:text-white transition-colors"
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link 
                  to="/resume" 
                  className="text-gray-400 hover:text-white transition-colors"
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                >
                  Resume
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-400 hover:text-white transition-colors"
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/resources" 
                  className="text-gray-400 hover:text-white transition-colors"
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                >
                  Premium Resources
                </Link>
              </li>
              <li>
                <Link 
                  to="/fun" 
                  className="text-gray-400 hover:text-white transition-colors"
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                >
                  Fun Games
                </Link>
              </li>
             
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <span className="block">Email:</span>
                <a 
                  href="mailto:ritikhere.info@gmail.com" 
                  className="hover:text-white transition-colors"
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                >
                  ritikhere.info@gmail.com
                </a>
              </li>
              <li className="text-gray-400">
                <span className="block">Location:</span>
                <span>Lucknow, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {currentYear} Ritik. All rights reserved.</p>
         
        </div>
      </div>
    </footer>
  )
}

export default Footer