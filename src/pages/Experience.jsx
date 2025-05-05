import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faGraduationCap } from '@fortawesome/free-solid-svg-icons'

const Experience = ({ textEnter, textLeave }) => {
  // Experience data
  const workExperience = [
    {
      title: 'Full Stack Developer',
      company: 'Techplement',
      period: 'June 2024 - August 2024',
      location: 'Lucknow',
      description: [
        'Led the development of a next-generation e-commerce platform',
        'Architected and implemented multiple payment methods',
        'Improved API performance by 65% through caching strategies and query optimization',
        'Mentored team members and have a great experience from them'
      ]
    },
    {
      title: 'Frontend Developer',
      company: 'CodSoft',
      period: 'August 2024 - Dec 2024',
      location: 'Remote',
      description: [
        'Built responsive interfaces using React, Redux, and Tailwind CSS',
        'Implemented state management solutions and optimized component rendering',
        'Collaborated with designers to transform mockups into pixel-perfect UI components',
        'Integrated third-party APIs and services into the frontend architecture'
      ]
    },
   
  ]
  
  // Education data
  const education = [
    {
      degree: 'Bachelor of Technology in Computer Science & Engineering',
      institution: 'Shri Ramswaroop Memorial University',
      period: '2021 - 2025',
      location: 'Lucknow, India',
      description: [
        'Specialized in Data Science & Artificial Intelligence',
         'Class Topper',
        'GPA: 8.7/9.5'
      ]
    },
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
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Experience & Education</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My professional journey and academic background.
          </p>
        </motion.div>
        
        {/* Work Experience */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold flex items-center">
              <FontAwesomeIcon icon={faBriefcase} className="mr-3 text-white" />
              Work Experience
            </h2>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {workExperience.map((job, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
              >
                {/* Timeline connector */}
                {index < workExperience.length - 1 && (
                  <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-700 z-0" />
                )}
                
                <div className="glass rounded-2xl p-6 relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <p className="text-gray-300">{job.company}</p>
                    </div>
                    <div className="mt-2 md:mt-0 text-right">
                      <p className="bg-white bg-opacity-10 rounded-full px-3 py-1 inline-block text-sm">
                        {job.period}
                      </p>
                      <p className="text-gray-400 text-sm mt-1">{job.location}</p>
                    </div>
                  </div>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    {job.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
        
        {/* Education */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold flex items-center">
              <FontAwesomeIcon icon={faGraduationCap} className="mr-3 text-white" />
              Education
            </h2>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            {education.map((edu, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
              >
                {/* Timeline connector */}
                {index < education.length - 1 && (
                  <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-700 z-0" />
                )}
                
                <div className="glass rounded-2xl p-6 relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{edu.degree}</h3>
                      <p className="text-gray-300">{edu.institution}</p>
                    </div>
                    <div className="mt-2 md:mt-0 text-right">
                      <p className="bg-white bg-opacity-10 rounded-full px-3 py-1 inline-block text-sm">
                        {edu.period}
                      </p>
                      <p className="text-gray-400 text-sm mt-1">{edu.location}</p>
                    </div>
                  </div>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    {edu.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </motion.div>
  )
}

export default Experience