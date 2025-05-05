import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Button from '../components/ui/Button'

const Home = ({ textEnter, textLeave }) => {
  const heroRef = useRef(null)

  // Particles animation
  useEffect(() => {
    const canvas = document.getElementById('particles')
    const ctx = canvas.getContext('2d')
    let particles = []
    
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resize()
    window.addEventListener('resize', resize)
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.color = 'rgba(255, 255, 255, 0.5)'
      }
      
      update() {
        this.x += this.speedX
        this.y += this.speedY
        
        if (this.x < 0 || this.x > canvas.width) {
          this.speedX = -this.speedX
        }
        
        if (this.y < 0 || this.y > canvas.height) {
          this.speedY = -this.speedY
        }
      }
      
      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    
    const createParticles = () => {
      particles = []
      const numberOfParticles = Math.min(window.innerWidth, window.innerHeight) * 0.1
      
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle())
      }
    }
    
    createParticles()
    
    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            const opacity = 1 - (distance / 100)
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }
      
      connectParticles()
      requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen"
    >
      {/* Particle background */}
      <canvas id="particles" className="absolute inset-0 -z-10" />
      
      {/* Hero section */}
      <section 
        ref={heroRef}
        className="min-h-screen flex flex-col justify-center relative pt-24 pb-12 px-4 sm:px-6"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center md:text-left"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Ritik</span>
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-6">
              Full Stack Developer & Data Scientist
            </h2>
            <p className="text-gray-400 max-w-2xl md:text-lg mb-8 mx-auto md:mx-0">
            I build clean, responsive web apps with great UX. Along with full stack development, I’m skilled in DSA and exploring data science to solve real-world problems better.


            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/projects">
                <Button 
                  size="md"
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                >
                  View My Work
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  variant="secondary" 
                  size="md"
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                >
                  Get In Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-gray-400 text-sm mb-2">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ height: ["20%", "80%", "20%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white w-1 rounded-full mt-1"
            />
          </motion.div>
        </motion.div>
      </section>
      
      {/* Featured sections */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Sections</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore highlights from my portfolio, including projects, skills, and interactive experiences.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass p-6 rounded-2xl flex flex-col"
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
            >
              <h3 className="text-xl font-semibold mb-3">Projects</h3>
              <p className="text-gray-400 mb-4 flex-grow">
                Explore my portfolio of web applications, mobile apps, and design projects.
              </p>
              <Link to="/projects" className="inline-flex items-center text-white hover:underline">
                View Projects <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </Link>
            </motion.div>
            
            {/* Featured Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass p-6 rounded-2xl flex flex-col"
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
            >
              <h3 className="text-xl font-semibold mb-3">Resources</h3>
              <p className="text-gray-400 mb-4 flex-grow">
                Access premium templates, guides, and development resources.
              </p>
              <Link to="/resources" className="inline-flex items-center text-white hover:underline">
                Browse Resources <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </Link>
            </motion.div>
            
            {/* Featured Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass p-6 rounded-2xl flex flex-col"
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
            >
              <h3 className="text-xl font-semibold mb-3">Fun</h3>
              <p className="text-gray-400 mb-4 flex-grow">
                Play interactive games and enjoy creative coding experiments.
              </p>
              <Link to="/fun" className="inline-flex items-center text-white hover:underline">
                Let's Have Fun <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default Home