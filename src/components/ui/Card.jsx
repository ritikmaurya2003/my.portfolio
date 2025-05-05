import { motion } from 'framer-motion'

const Card = ({ 
  children, 
  className = '', 
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <motion.div
      className={`glass overflow-hidden ${className}`}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  )
}

export default Card