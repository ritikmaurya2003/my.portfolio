import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { toast } from 'react-toastify'

const Resources = ({ textEnter, textLeave }) => {
  // Free resources data
  const freeResources = [
    {
      id: 1,
      title: 'Resume Template',
      description: 'A clean and ATS-optimized resume template suitable for both tech and non-tech roles.',
      image: '/Resume.png',
      downloadLink: '/RitikMauryaResume.pdf'
    }
  ]
  
  // Premium resources data
  const premiumResources = [
    {
      id: 4,
      title: 'Portfolio Source Code',
      description: 'Explore the complete source code of my personal portfolio, built with modern web technologies and designed for smooth, responsive user experience.',
      image: '/SourceCode.png',
      downloadLink: '/PortfolioSourceCode.zip',
      price: 'Premium'
    },
    {
      id: 5,
      title: 'Food Delivery App',
      description: 'A fully functional food delivery app built starter kit with React frontend.',
      image: '/Food.png',
      downloadLink: '/food.zip',
      price: 'Premium'
    }
  ]
  
  // Handle resource download
  const handleDownload = (resource) => {
    window.open(resource.downloadLink, '_blank')
    toast.success(`Downloaded: ${resource.title}`)
  }
  
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
  
  const resourceVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
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
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Resources</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Access premium templates, guides, and development resources. Free and premium materials to help you in your development journey.
          </p>
        </motion.div>
        
        {/* Free Resources */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-bold mb-8"
          >
            Free Resources
          </motion.h2>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {freeResources.map((resource) => (
              <motion.div
                key={resource.id}
                variants={resourceVariants}
              >
                <Card 
                  className="h-full flex flex-col"
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                >
                  <div className="relative overflow-hidden rounded-t-2xl h-48">
                    <img 
                      src={resource.image} 
                      alt={resource.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                    <p className="text-gray-400 mb-6 flex-grow">{resource.description}</p>
                    <Button
                      variant="primary"
                      onClick={() => handleDownload(resource)}
                      onMouseEnter={textEnter}
                      onMouseLeave={textLeave}
                      fullWidth
                    >
                      <FontAwesomeIcon icon={faDownload} className="mr-2" />
                      Download
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>
        
        {/* Premium Resources */}
        <section>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-8"
          >
            Premium Resources
          </motion.h2>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {premiumResources.map((resource) => (
              <motion.div
                key={resource.id}
                variants={resourceVariants}
              >
                <Card 
                  className="h-full flex flex-col"
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                >
                  <div className="relative overflow-hidden rounded-t-2xl h-48">
                    <img 
                      src={resource.image} 
                      alt={resource.title} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute top-0 right-0 bg-red-500 py-1 px-3 rounded-bl-lg">
                      {resource.price}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                    <p className="text-gray-400 mb-6 flex-grow">{resource.description}</p>
                    <Button
                      variant="primary"
                      onClick={() => handleDownload(resource)}
                      onMouseEnter={textEnter}
                      onMouseLeave={textLeave}
                      fullWidth
                    >
                      <FontAwesomeIcon icon={faDownload} className="mr-2" />
                      Download
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </motion.div>
  )
}

export default Resources
