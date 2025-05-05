import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const CustomCursor = ({ cursorVariant }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    window.addEventListener('mousemove', mouseMove)

    return () => {
      window.removeEventListener('mousemove', mouseMove)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      height: 20,
      width: 20
    },
    text: {
      x: mousePosition.x - 15,
      y: mousePosition.y - 15,
      height: 30,
      width: 30,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      mixBlendMode: 'difference'
    }
  }

  // Don't render custom cursor on touch devices
  if ('ontouchstart' in window) {
    return null
  }

  return (
    <motion.div
      className="cursor hidden sm:block"
      variants={variants}
      animate={cursorVariant}
    />
  )
}

export default CustomCursor