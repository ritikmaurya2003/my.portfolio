import { motion } from 'framer-motion'

const Button = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  type = 'button',
  fullWidth = false,
  onMouseEnter,
  onMouseLeave
}) => {
  // Base classes
  let baseClasses = 'rounded-full transition-all font-medium focus:outline-none'
  
  // Size classes
  const sizeClasses = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 px-5 text-base',
    lg: 'py-3 px-7 text-lg'
  }
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-white text-black hover:bg-opacity-90',
    secondary: 'glass border border-glass-border hover:bg-white hover:bg-opacity-10',
    outline: 'border border-white text-white bg-transparent hover:bg-white hover:bg-opacity-10',
    ghost: 'text-white bg-transparent hover:bg-white hover:bg-opacity-10',
    danger: 'bg-red-500 text-white hover:bg-red-600'
  }
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Disabled classes
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  // Combine all classes
  const classes = `
    ${baseClasses} 
    ${sizeClasses[size]} 
    ${variantClasses[variant]} 
    ${widthClasses} 
    ${disabledClasses} 
    ${className}
  `.trim();
  
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.button>
  )
}

export default Button