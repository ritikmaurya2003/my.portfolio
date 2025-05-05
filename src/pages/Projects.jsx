import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

const Projects = ({ textEnter, textLeave }) => {
  // State for filter
  const [filter, setFilter] = useState('all')
  
  // Project data
  const projects = [
    {
      id: 1,
      title: 'Personal Portfolio',
      description: 'Explore the complete source code of my personal portfolio, built with modern web technologies and designed for smooth, responsive user experience.',
      image: '/SourceCode.png',
      category: 'web',
      tech: ['React', 'Tailwind CSS', 'Framer Motion'],
      link: '#'
    },
    {
      id: 2,
      title: 'Cab Booking App',
      description: 'A user-friendly cab booking application that allows users to book rides, track drivers, and choose from multiple ride options in real-time.',
      image: '/cab.png',
      category: 'web',
      tech: ['React', 'Firebase', 'Tailwind CSS'],
      link: 'https://ritzride.netlify.app/'
    },
    {
      id: 3,
      title: 'Online Book Store',
      description: 'An interactive online bookstore platform where users can explore, search, and purchase books with secure payment and admin management features.',
      image: '/book.png',
      category: 'web',
      tech: ['React Native', 'Redux', 'Firebase', 'API Integration'],
      link: '#'
    }
    
  ]
  
  // Filter projects based on selected category
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter)
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const projectVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-16 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">My Projects</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A showcase of my work across web, mobile, IoT and design projects.
          </p>
        </motion.div>
        
        {/* Filter Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <Button 
            variant={filter === 'all' ? 'primary' : 'secondary'}
            onClick={() => setFilter('all')}
            onMouseEnter={textEnter}
            onMouseLeave={textLeave}
          >
            All Projects
          </Button>
          <Button 
            variant={filter === 'web' ? 'primary' : 'secondary'}
            onClick={() => setFilter('web')}
            onMouseEnter={textEnter}
            onMouseLeave={textLeave}
          >
            Web
          </Button>
          <Button 
            variant={filter === 'mobile' ? 'primary' : 'secondary'}
            onClick={() => setFilter('mobile')}
            onMouseEnter={textEnter}
            onMouseLeave={textLeave}
          >
            Mobile
          </Button>
          <Button 
            variant={filter === 'iot' ? 'primary' : 'secondary'}
            onClick={() => setFilter('iot')}
            onMouseEnter={textEnter}
            onMouseLeave={textLeave}
          >
            IoT
          </Button>
          <Button 
            variant={filter === 'design' ? 'primary' : 'secondary'}
            onClick={() => setFilter('design')}
            onMouseEnter={textEnter}
            onMouseLeave={textLeave}
          >
            Design
          </Button>
        </motion.div>
        
        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div 
                key={project.id}
                variants={projectVariants}
                layout
              >
                <Card 
                  className="h-full flex flex-col"
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                >
                  <div className="relative overflow-hidden rounded-t-2xl aspect-video">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, index) => (
                        <span key={index} className="text-xs bg-white bg-opacity-10 px-2 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a 
                      href={project.link} 
                      className="mt-auto text-center glass py-2 px-4 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
                    >
                      View Project
                    </a>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400">No projects found in this category.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default Projects