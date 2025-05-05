import { motion } from 'framer-motion'

const LoadingAnimation = () => {
  // Variants for the container
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  // Variants for the balls
  const ballVariants = {
    initial: { y: 0 },
    animate: { 
      y: [0, -20, 0],
      transition: {
        repeat: Infinity,
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <motion.div
        className="flex space-x-3"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {[1, 2, 3, 4, 5].map((ball) => (
          <motion.div
            key={ball}
            className="w-4 h-4 bg-white rounded-full"
            variants={ballVariants}
            style={{
              animationDelay: `${ball * 0.1}s`
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default LoadingAnimation