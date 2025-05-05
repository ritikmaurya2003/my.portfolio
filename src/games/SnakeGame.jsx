import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'

const GRID_SIZE = 20
const SNAKE_START = [{ x: 8, y: 8 }]
const FOOD_START = { x: 12, y: 12 }
const SPEED_START = 150
const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 }
}

const SnakeGame = () => {
  const [snake, setSnake] = useState(SNAKE_START)
  const [food, setFood] = useState(FOOD_START)
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT)
  const [speed, setSpeed] = useState(SPEED_START)
  const [gameOver, setGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  
  const gameAreaRef = useRef(null)
  
  // Initialize the game
  useEffect(() => {
    const storedHighScore = localStorage.getItem('snakeHighScore')
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore))
    }
    
    gameAreaRef.current.focus()
  }, [])
  
  // Game loop
  useEffect(() => {
    if (gameOver || isPaused) return
    
    const interval = setInterval(moveSnake, speed)
    return () => clearInterval(interval)
  }, [snake, gameOver, isPaused, direction, speed])
  
  // Handle keyboard inputs
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== DIRECTIONS.DOWN) {
            setDirection(DIRECTIONS.UP)
          }
          break
        case 'ArrowDown':
          if (direction !== DIRECTIONS.UP) {
            setDirection(DIRECTIONS.DOWN)
          }
          break
        case 'ArrowLeft':
          if (direction !== DIRECTIONS.RIGHT) {
            setDirection(DIRECTIONS.LEFT)
          }
          break
        case 'ArrowRight':
          if (direction !== DIRECTIONS.LEFT) {
            setDirection(DIRECTIONS.RIGHT)
          }
          break
        case ' ':
          // Space bar toggles pause
          setIsPaused(prev => !prev)
          break
        default:
          break
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [direction])
  
  // Move the snake
  const moveSnake = () => {
    const newSnake = [...snake]
    const head = { ...newSnake[0] }
    
    // Apply current direction to the head
    head.x += direction.x
    head.y += direction.y
    
    // Check for collisions
    if (isCollision(head)) {
      endGame()
      return
    }
    
    // Add new head
    newSnake.unshift(head)
    
    // Check if snake ate food
    if (head.x === food.x && head.y === food.y) {
      // Increase score
      const newScore = score + 1
      setScore(newScore)
      
      // Update high score if needed
      if (newScore > highScore) {
        setHighScore(newScore)
        localStorage.setItem('snakeHighScore', newScore.toString())
      }
      
      // Generate new food
      setFood(generateFood(newSnake))
      
      // Speed up the game slightly
      setSpeed(prevSpeed => Math.max(prevSpeed - 5, 50))
    } else {
      // Remove tail
      newSnake.pop()
    }
    
    setSnake(newSnake)
  }
  
  // Check for collisions with walls or snake body
  const isCollision = (head) => {
    // Check for wall collisions
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true
    }
    
    // Check for self collision
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        return true
      }
    }
    
    return false
  }
  
  // Generate food in a random empty location
  const generateFood = (snake) => {
    let newFood
    let foodOnSnake
    
    do {
      foodOnSnake = false
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      }
      
      // Check if food is on the snake
      for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === newFood.x && snake[i].y === newFood.y) {
          foodOnSnake = true
          break
        }
      }
    } while (foodOnSnake)
    
    return newFood
  }
  
  // End the game
  const endGame = () => {
    setGameOver(true)
  }
  
  // Reset the game
  const resetGame = () => {
    setSnake(SNAKE_START)
    setFood(FOOD_START)
    setDirection(DIRECTIONS.RIGHT)
    setSpeed(SPEED_START)
    setGameOver(false)
    setIsPaused(false)
    setScore(0)
    gameAreaRef.current.focus()
  }
  
  // Toggle pause
  const togglePause = () => {
    setIsPaused(prev => !prev)
    gameAreaRef.current.focus()
  }
  
  // Handle directional button clicks for mobile devices
  const handleDirectionClick = (newDirection) => {
    // Make sure we don't change to opposite direction
    if (
      (newDirection === DIRECTIONS.UP && direction !== DIRECTIONS.DOWN) ||
      (newDirection === DIRECTIONS.DOWN && direction !== DIRECTIONS.UP) ||
      (newDirection === DIRECTIONS.LEFT && direction !== DIRECTIONS.RIGHT) ||
      (newDirection === DIRECTIONS.RIGHT && direction !== DIRECTIONS.LEFT)
    ) {
      setDirection(newDirection)
    }
    
    gameAreaRef.current.focus()
  }
  
  // Create grid cells
  const createGrid = () => {
    const grid = []
    
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        // Determine if this cell is part of the snake
        let isSnake = false
        let isSnakeHead = false
        
        for (let i = 0; i < snake.length; i++) {
          if (snake[i].x === x && snake[i].y === y) {
            isSnake = true
            isSnakeHead = i === 0
            break
          }
        }
        
        // Determine if this cell is food
        const isFood = food.x === x && food.y === y
        
        // Set the appropriate class
        let cellClass = "w-3 h-3 sm:w-4 sm:h-4 rounded-sm"
        
        if (isSnakeHead) {
          cellClass += " bg-green-400"
        } else if (isSnake) {
          cellClass += " bg-green-600"
        } else if (isFood) {
          cellClass += " bg-red-500"
        } else {
          cellClass += " bg-gray-800"
        }
        
        grid.push(
          <div 
            key={`${x}-${y}`} 
            className={cellClass}
          />
        )
      }
    }
    
    return grid
  }
  
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex items-center justify-between w-full">
        <div>
          <p className="text-gray-300">Score: {score}</p>
          <p className="text-gray-400 text-sm">Best: {highScore}</p>
        </div>
        
        <div className="space-x-2">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={togglePause}
          >
            {isPaused ? 'Resume' : 'Pause'}
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            onClick={resetGame}
          >
            Restart
          </Button>
        </div>
      </div>
      
      <div 
        ref={gameAreaRef}
        className="relative outline-none"
        tabIndex={0}
      >
        {/* Game area */}
        <div 
          className="glass p-4 rounded-lg"
          style={{ touchAction: 'none' }}
        >
          <div className="grid grid-cols-12 gap-1">
            {createGrid()}
          </div>
        </div>
        
        {/* Game over overlay */}
        {gameOver && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 rounded-lg"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Game Over</h3>
              <p className="mb-4">Final Score: {score}</p>
              <Button onClick={resetGame}>Play Again</Button>
            </div>
          </motion.div>
        )}
        
        {/* Pause overlay */}
        {isPaused && !gameOver && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 rounded-lg"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Paused</h3>
              <Button onClick={togglePause}>Resume</Button>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Mobile controls */}
      <div className="mt-8 grid grid-cols-3 gap-2 w-48 sm:hidden">
        <div></div>
        <Button 
          variant="secondary"
          onClick={() => handleDirectionClick(DIRECTIONS.UP)}
          aria-label="Up"
        >
          ↑
        </Button>
        <div></div>
        
        <Button 
          variant="secondary"
          onClick={() => handleDirectionClick(DIRECTIONS.LEFT)}
          aria-label="Left"
        >
          ←
        </Button>
        <Button 
          variant="secondary"
          onClick={() => handleDirectionClick(DIRECTIONS.DOWN)}
          aria-label="Down"
        >
          ↓
        </Button>
        <Button 
          variant="secondary"
          onClick={() => handleDirectionClick(DIRECTIONS.RIGHT)}
          aria-label="Right"
        >
          →
        </Button>
      </div>
      
      <div className="mt-6 text-center text-gray-400 text-sm">
        <p className="mb-1">Use arrow keys to control the snake</p>
        <p>Press spacebar to pause the game</p>
      </div>
    </div>
  )
}

export default SnakeGame