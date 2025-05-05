import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardUser, faComment, faCommentDots, faHouseChimneyUser, faPaperPlane, faTimes, faUser } from '@fortawesome/free-solid-svg-icons'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [hasNotification, setHasNotification] = useState(true)
  const [messages, setMessages] = useState([
    { 
      text: "Hello! I'm Ritik's chatbot assistant. How can I help you today?", 
      sender: 'bot' 
    }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Clear notification when chat is opened
  useEffect(() => {
    if (isOpen) {
      setHasNotification(false)
    }
  }, [isOpen])

  // Function to handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    setMessages([...messages, { text: input, sender: 'user' }])
    
    // Process the message after a short delay to simulate thinking
    setTimeout(() => {
      const botResponse = getBotResponse(input.toLowerCase())
      setMessages(prevMessages => [...prevMessages, { text: botResponse, sender: 'bot' }])
    }, 500)
    
    setInput('')
  }

  // Function to generate bot responses based on keywords
  const getBotResponse = (message) => {
    if (message.includes('contact') || message.includes('reach')) {
      return "You can contact Ritik through the contact form on the Contact page or directly via email at contact@ritik.com."
    } else if (message.includes('project') || message.includes('work')) {
      return "Ritik's projects can be found in the Projects section. There you'll see a variety of work ranging from web applications to mobile apps and more."
    } else if (message.includes('tech') || message.includes('technology') || message.includes('stack')) {
      return "Ritik works with a variety of technologies including React, NextJS, Node.js, Express, MongoDB, and more. Check out the About page for a complete list!"
    } else if (message.includes('resume')) {
      return "You can view and download Ritik's resume from the Resume page."
    } else if (message.includes('resources')) {
      return "Ritik offers both free and premium resources. You'll need to login to access the premium resources."
    } else if (message.includes('game') || message.includes('fun')) {
      return "Check out the Fun section for games like Tic Tac Toe, Snake and Memory Game!"
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello there! How can I assist you today?"
    } else {
      return "I'm not sure how to respond to that. Can you try asking something about Ritik's projects, skills, or how to contact him?"
    }
  }

  return (
    <>
      {/* Chat button */}
      <motion.div
        className="fixed bottom-5 right-5 z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg relative"
        >
          <FontAwesomeIcon icon={faUser} className="text-white text-2xl" />
          
          {/* Notification dot */}
          {hasNotification && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full"
            />
          )}
        </button>
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-20 right-5 w-80 h-96 glass rounded-2xl shadow-xl z-40 overflow-hidden flex flex-col"
          >
            {/* Chat header */}
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Chat with Ritik</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index % 3) }}
                  className={`max-w-3/4 ${
                    message.sender === 'user' 
                      ? 'ml-auto bg-gray-300 text-black' 
                      : 'mr-auto bg-[#222] text-white'
                  } rounded-lg p-3 shadow-sm`}
                >
                  {message.text}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Chat input */}
            <form 
              onSubmit={handleSendMessage}
              className="p-3 border-t border-gray-800 flex"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-[#222] text-white rounded-l-full px-4 py-2 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-gray-300 text-[#222] rounded-r-full px-4 hover:bg-gray-400 transition-colors"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot