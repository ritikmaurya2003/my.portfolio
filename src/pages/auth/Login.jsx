import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/ui/Button'
import { toast } from 'react-toastify'

const Login = ({ textEnter, textLeave }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { login, signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  
  // Handle login with email and password
  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      await login(email, password)
      toast.success('Logged in successfully!')
      navigate('/resources')
    } catch (error) {
      setError('Failed to sign in. Please check your credentials.')
      toast.error('Failed to sign in. Please check your credentials.')
    }
    
    setLoading(false)
  }
  
  // Handle Google sign in
  const handleGoogleSignIn = async () => {
    setError('')
    setLoading(true)
    
    try {
      await signInWithGoogle()
      toast.success('Logged in with Google successfully!')
      navigate('/resources')
    } catch (error) {
      setError('Failed to sign in with Google.')
      toast.error('Failed to sign in with Google.')
    }
    
    setLoading(false)
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-16 px-4 sm:px-6"
    >
      <div className="max-w-md mx-auto glass rounded-2xl p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-400">
            Sign in to access premium resources and more.
          </p>
        </motion.div>
        
        {error && (
          <div className="bg-red-900 bg-opacity-30 border border-red-700 text-white p-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-black bg-opacity-40 rounded-lg border border-gray-700 py-3 px-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-white focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <a 
                href="#" 
                className="text-sm text-gray-400 hover:text-white transition-colors"
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
              >
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-black bg-opacity-40 rounded-lg border border-gray-700 py-3 px-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-white focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          
          <Button
            type="submit"
            fullWidth
            disabled={loading}
            onMouseEnter={textEnter}
            onMouseLeave={textLeave}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
        
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-700"></div>
          <span className="px-4 text-sm text-gray-400">OR</span>
          <div className="flex-grow h-px bg-gray-700"></div>
        </div>
        
        <Button
          variant="secondary"
          fullWidth
          onClick={handleGoogleSignIn}
          disabled={loading}
          onMouseEnter={textEnter}
          onMouseLeave={textLeave}
        >
          <FontAwesomeIcon icon={faGoogle} className="mr-2" />
          Sign in with Google
        </Button>
        
        <div className="text-center mt-6">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="text-white hover:underline"
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default Login