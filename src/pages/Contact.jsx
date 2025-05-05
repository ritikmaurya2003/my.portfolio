import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import Button from '../components/ui/Button'
import { toast } from 'react-toastify'
import emailjs from '@emailjs/browser'

const Contact = ({ textEnter, textLeave }) => {
  const formRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    emailjs.sendForm(
      'portfolio_queries',
      'portfolio_queries',
      formRef.current,
      'J2j4CeCiAMBd0kNY9'
    )
    .then(() => {
      toast.success("Message sent successfully! I'll get back to you soon.")
      setFormData({ name: '', email: '', subject: '', message: '' })
    })
    .catch((error) => {
      console.error('EmailJS error:', error)
      toast.error("Failed to send message. Please try again.")
    })
    .finally(() => setIsSubmitting(false))
  }

  const contactInfo = [
    {
      icon: faEnvelope,
      title: 'Email',
      value: 'ritikhere.info@gmail.com',
      link: 'mailto:ritikhere.info@gmail.com'
    },
    {
      icon: faPhone,
      title: 'Phone',
      value: '+91 9695513521',
      link: 'tel:+919695513521'
    },
    {
      icon: faLocationDot,
      title: 'Location',
      value: 'Lucknow, India',
      link: null
    }
  ]

  const socialLinks = [
    {
      icon: faGithub,
      title: 'GitHub',
      link: 'https://github.com/ritikmaurya2003'
    },
    {
      icon: faLinkedin,
      title: 'LinkedIn',
      link: 'https://linkedin.com/in/ritikmaurya08'
    },
    {
      icon: faXTwitter,
      title: 'Twitter',
      link: 'https://x.com/exoticxritik'
    }
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contact Me</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Have a question or want to work together? Reach out to me using the form below.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="glass p-8 rounded-2xl mb-8" onMouseEnter={textEnter} onMouseLeave={textLeave}>
              <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-white bg-opacity-10 p-3 rounded-full mr-4">
                      <FontAwesomeIcon icon={info.icon} />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">{info.title}</h3>
                      {info.link ? (
                        <a href={info.link} className="text-gray-300 hover:text-white transition-colors">{info.value}</a>
                      ) : (
                        <p className="text-gray-300">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass p-8 rounded-2xl" onMouseEnter={textEnter} onMouseLeave={textLeave}>
              <h2 className="text-2xl font-semibold mb-6">Connect</h2>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white bg-opacity-10 p-4 rounded-full text-white hover:bg-opacity-20 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={textEnter}
                    onMouseLeave={textLeave}
                    aria-label={social.title}
                  >
                    <FontAwesomeIcon icon={social.icon} size="lg" />
                  </motion.a>
                ))}
              </div>
              
              <p className="mt-6 text-gray-400">Feel free to connect with me on social media or check out my work.</p>
            </div>
            <div className="glass p-8 mt-8 rounded-2xl" onMouseEnter={textEnter} onMouseLeave={textLeave}>
              <h2 className="text-2xl font-semibold mb-6">Find me here.</h2>
              {/* Google Map */}
  <div className="rounded-xl overflow-hidden">
    <iframe
      title="My Location"
      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d444.97978126524896!2d80.8719648!3d26.8450965!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfe44b74174b9%3A0x4042be07da613dcf!2sE-1288%2C%20Block%20F%2C%20Rajajipuram%2C%20Lucknow%2C%20Uttar%20Pradesh%20226011!5e0!3m2!1sen!2sin!4v1746348323390!5m2!1sen!2sin"
      width="100%"
      height="300"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
              
             
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="glass p-8 rounded-2xl" onMouseEnter={textEnter} onMouseLeave={textLeave}>
            <h2 className="text-2xl font-semibold mb-6">Send Me a Message</h2>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-black bg-opacity-40 rounded-lg border border-gray-700 py-3 px-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-white focus:border-transparent" placeholder="Enter your name" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-black bg-opacity-40 rounded-lg border border-gray-700 py-3 px-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-white focus:border-transparent" placeholder="Enter your email address" />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="w-full bg-black bg-opacity-40 rounded-lg border border-gray-700 py-3 px-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-white focus:border-transparent" placeholder="Project Inquiry" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows="5" className="w-full bg-black bg-opacity-40 rounded-lg border border-gray-700 py-3 px-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-white focus:border-transparent resize-none" placeholder="Your message here..."></textarea>
              </div>

              <Button type="submit" fullWidth disabled={isSubmitting} onMouseEnter={textEnter} onMouseLeave={textLeave}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default Contact
