import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import Resume from './pages/Resume'
import Contact from './pages/Contact'
import Resources from './pages/Resources'
import Fun from './pages/Fun'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import ProtectedRoute from './components/auth/ProtectedRoute'
import LoadingAnimation from './components/shared/LoadingAnimation'
import CustomCursor from './components/ui/CustomCursor'
import Chatbot from './components/shared/Chatbot'

function App() {
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [cursorVariant, setCursorVariant] = useState("default")

  // Enable cursor hover animation
  const textEnter = () => setCursorVariant("text")
  const textLeave = () => setCursorVariant("default")

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Add loading animation between route changes
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [location.pathname])

  if (loading) {
    return <LoadingAnimation />
  }

  return (
    <div className="flex flex-col min-h-screen bg-pure-black">
      <CustomCursor cursorVariant={cursorVariant} />
      
      <Navbar textEnter={textEnter} textLeave={textLeave} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home textEnter={textEnter} textLeave={textLeave} />} />
            <Route path="/about" element={<About textEnter={textEnter} textLeave={textLeave} />} />
            <Route path="/projects" element={<Projects textEnter={textEnter} textLeave={textLeave} />} />
            <Route path="/experience" element={<Experience textEnter={textEnter} textLeave={textLeave} />} />
            <Route path="/resume" element={<Resume textEnter={textEnter} textLeave={textLeave} />} />
            <Route path="/contact" element={<Contact textEnter={textEnter} textLeave={textLeave} />} />
            <Route path="/resources" element={
              <ProtectedRoute>
                <Resources textEnter={textEnter} textLeave={textLeave} />
              </ProtectedRoute>
            } />
            <Route path="/fun" element={<Fun textEnter={textEnter} textLeave={textLeave} />} />
            <Route path="/login" element={<Login textEnter={textEnter} textLeave={textLeave} />} />
            <Route path="/signup" element={<SignUp textEnter={textEnter} textLeave={textLeave} />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      <Footer textEnter={textEnter} textLeave={textLeave} />
      
      <Chatbot />
    </div>
  )
}

export default App