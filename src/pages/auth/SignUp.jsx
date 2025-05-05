import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/ui/Button'
import { toast } from 'react-toastify'

const SignUp = ({ textEnter, textLeave }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { signup, signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  
  // Handle signup with email and password
  const handleSignUp = async (e) => {
    e.preventDefault()
    setError('')
    
    // Check if passwords match
    if (password !== confirmPassword) {
      return setError('Passwords do not match')
    }
    
    // Check password strength
    if (password.length < 6) {
      return setError('Password should be at least 6 characters')
    }
    
    setLoading(true)
    
    try {
      await signup(email, password)
      toast.success('Account created successfully!')
      navigate('/resources')
    } catch (error) {
      setError('Failed to create an account. Email may already be in use.')
      toast.error('Failed to create an account.')
    }
    
    setLoading(false)
  }
  
  // Handle Google sign in
  const handleGoogleSignIn = async () => {
    setError('')
    setLoading(true)
    
    try {
      await signInWithGoogle()
      toast.success('Signed up with Google successfully!')
      navigate('/resources')
    } catch (error) {
      setError('Failed to sign up with Google.')
      toast.error('Failed to sign up with Google.')
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
          <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
          <p className="text-gray-400">
            Join to access premium resources and more.
          </p>
        </motion.div>
        
        {error && (
          <div className="bg-red-900 bg-opacity-30 border border-red-700 text-white p-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSignUp} className="space-y-6">
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
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
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? 'Creating Account...' : 'Create Account'}
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
          Sign up with Google
        </Button>
        
        <div className="text-center mt-6">
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-white hover:underline"
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default SignUp