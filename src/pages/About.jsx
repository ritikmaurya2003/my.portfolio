import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

const About = ({ textEnter, textLeave }) => {
  // Tech stack data
  const skills = [
    { category: 'Frontend', items: ['React', 'HTML', 'CSS', 'Javascript', 'TailwindCSS', 'DaisyUI'] },
    { category: 'Backend', items: ['Node.js', 'Express'] },
    { category: 'Database', items: ['MongoDB', 'SQL', 'Firebase'] },
    { category: 'DevOps', items: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Git'] },
    { category: 'Design', items: ['Canva', 'Photoshop', 'Illustrator'] }
  ]

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

  const itemVariants = {
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
        {/* About Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">About Me</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Get to know more about my background, skills, and passions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold mb-4">My Story</h2>
              <p className="text-gray-300 mb-4">
              Hi! I'm Ritik — a passionate full-stack developer and designer with over 6 years of experience building beautiful, functional web applications and digital experiences.
              </p>
              <p className="text-gray-300 mb-4">
              My journey began at 19 with a simple HTML website, and since then, I’ve been on a continuous learning path — evolving my expertise across the entire development stack. Alongside full-stack development, I have a strong foundation in Data Structures and Algorithms, and I’m actively exploring Data Science to build smarter, data-driven solutions.
              </p>
              <p className="text-gray-300 mb-8">
              I believe in crafting products that not only look great but also solve real problems, perform efficiently, and deliver exceptional user experiences. I'm particularly passionate about clean code, responsive design, and intuitive, user-centered interfaces.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/projects">
                  <Button 
                    onMouseEnter={textEnter}
                    onMouseLeave={textLeave}
                  >
                    View My Work
                  </Button>
                </Link>
                <Link to="/resume">
                  <Button 
                    variant="secondary"
                    onMouseEnter={textEnter}
                    onMouseLeave={textLeave}
                  >
                    Resume
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center"
            >
              <div className=" rounded-2xl overflow-hidden w-full max-w-md">
                <img 
                  src="./src/utils/MainProfilePictureBG.png" 
                  alt="Ritik" 
                  className="w-full h-auto object-cover rounded-2xl hover:scale-105 transition-transform duration-500" 
                />
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Skills Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Skills & Technologies</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A comprehensive overview of my technical expertise and skill set.
            </p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skills.map((skillGroup, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass p-6 rounded-2xl"
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
              >
                <h3 className="text-xl font-semibold mb-4">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-white bg-opacity-5 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
        
        {/* Education & Values */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-6">Education</h2>
              <div className="space-y-6">
                <div className="glass p-6 rounded-2xl">
                  <h3 className="text-lg font-medium">Bachelor of Technology in Computer Science & Engineering</h3>
                  <p className="text-gray-400">Shri Ramswaroop Memorial University</p>
                  <p className="text-gray-500 text-sm">2021 - 2025</p>
                </div>
                
                <div className="glass p-6 rounded-2xl">
                  <h3 className="text-lg font-medium">Intermediate</h3>
                  <p className="text-gray-400">St. Xavier's Inter College</p>
                  <p className="text-gray-500 text-sm">2020 - 2021</p>
                </div>
                <div className="glass p-6 rounded-2xl">
                  <h3 className="text-lg font-medium">High School</h3>
                  <p className="text-gray-400">St. Xavier's Inter College</p>
                  <p className="text-gray-500 text-sm">2018 - 2019</p>
                </div>
                
                
              </div>
              
              
            </motion.div>
            
            
            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold mb-6">My Core Values</h2>
              <div className="space-y-4">
                <div className="glass p-4 rounded-2xl">
                  <h3 className="text-lg font-medium mb-2">User-Centered Approach</h3>
                  <p className="text-gray-400">I believe in putting users first and creating intuitive, accessible experiences.</p>
                </div>
                <div className="glass p-4 rounded-2xl">
                  <h3 className="text-lg font-medium mb-2">Continuous Learning</h3>
                  <p className="text-gray-400">The tech world evolves rapidly, and I'm committed to growing with it.</p>
                </div>
                <div className="glass p-4 rounded-2xl">
                  <h3 className="text-lg font-medium mb-2">Attention to Detail</h3>
                  <p className="text-gray-400">The small details make the difference between good and exceptional products.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </motion.div>
  )
}

export default About