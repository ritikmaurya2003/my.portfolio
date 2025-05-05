import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'

const SYMBOLS = ['🚀', '🌟', '🌈', '🎮', '🍕', '🎯', '🎨', '🔮', '🎸', '🎭']
const INITIAL_SPEED = 1500

const MemoryGame = () => {
  const [cards, setCards] = useState([])
  const [flippedIndices, setFlippedIndices] = useState([])
  const [matchedPairs, setMatchedPairs] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [showingTimeout, setShowingTimeout] = useState(false)
  const [level, setLevel] = useState(1)
  const [timeoutDuration, setTimeoutDuration] = useState(INITIAL_SPEED)
  
  // Initialize the game
  const startGame = () => {
    // Create card pairs
    const allCards = [...SYMBOLS.slice(0, 8 + level)]
      .map(symbol => ({ symbol, paired: false }))
      .flatMap(card => [card, { ...card }])
    
    // Shuffle cards
    for (let i = allCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[allCards[i], allCards[j]] = [allCards[j], allCards[i]]
    }
    
    // Map IDs to cards
    const cardsWithIds = allCards.map((card, index) => ({
      ...card,
      id: index
    }))
    
    setCards(cardsWithIds)
    setFlippedIndices([])
    setMatchedPairs([])
    setMoves(0)
    setGameOver(false)
    setGameStarted(true)
    
    // Show all cards briefly at start
    const allIndices = cardsWithIds.map((_, index) => index)
    setFlippedIndices(allIndices)
    setShowingTimeout(true)
    
    // Hide cards after timeout
    setTimeout(() => {
      setFlippedIndices([])
      setShowingTimeout(false)
    }, timeoutDuration)
  }
  
  // Handle card click
  const handleCardClick = (index) => {
    // Prevent action if showing timeout is active
    if (showingTimeout) return
    
    // Don't allow flipping if:
    // - Two cards are already flipped
    // - The card is already flipped
    // - The card is already matched
    if (
      flippedIndices.length === 2 ||
      flippedIndices.includes(index) ||
      matchedPairs.some(pair => pair.includes(index))
    ) {
      return
    }
    
    // Add card to flipped cards
    const newFlippedIndices = [...flippedIndices, index]
    setFlippedIndices(newFlippedIndices)
    
    // If two cards are flipped, check for a match
    if (newFlippedIndices.length === 2) {
      const [firstIndex, secondIndex] = newFlippedIndices
      const firstCard = cards[firstIndex]
      const secondCard = cards[secondIndex]
      
      setMoves(moves + 1)
      
      // Check if the symbols match
      if (firstCard.symbol === secondCard.symbol) {
        // Match found
        setMatchedPairs([...matchedPairs, [firstIndex, secondIndex]])
        setFlippedIndices([])
      } else {
        // No match, flip back after a delay
        setTimeout(() => {
          setFlippedIndices([])
        }, 1000)
      }
    }
  }
  
  // Check for game over
  useEffect(() => {
    if (gameStarted && !showingTimeout && matchedPairs.length === cards.length / 2 && cards.length > 0) {
      setGameOver(true)
      
      // Progress to next level for a win
      if (level < 3) {
        setLevel(level + 1)
        setTimeoutDuration(prev => Math.max(prev - 300, 500)) // Reduce showing time for increased difficulty
      }
    }
  }, [matchedPairs, cards, gameStarted, showingTimeout])
  
  // Restart game
  const restartGame = () => {
    setLevel(1)
    setTimeoutDuration(INITIAL_SPEED)
    startGame()
  }
  
  // Start next level
  const nextLevel = () => {
    startGame()
  }
  
  // Calculate grid size based on number of cards
  const getGridCols = () => {
    const totalCards = cards.length
    if (totalCards <= 12) return 'grid-cols-4'
    if (totalCards <= 16) return 'grid-cols-4'
    return 'grid-cols-5'
  }
  
  return (
    <div className="flex flex-col items-center w-full">
      {!gameStarted ? (
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">Memory Game</h3>
          <p className="text-gray-300 mb-6">
            Flip cards to find matching pairs. Remember the positions!
          </p>
          <Button 
            onClick={startGame}
          >
            Start Game
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-6 w-full flex justify-between items-center">
            <div>
              <p className="text-gray-300">Level: {level}/3</p>
              <p className="text-gray-400">Moves: {moves}</p>
            </div>
            <div className="space-x-2">
              {gameOver ? (
                level === 3 ? (
                  <Button onClick={restartGame}>Play Again</Button>
                ) : (
                  <Button onClick={nextLevel}>Next Level</Button>
                )
              ) : (
                <Button 
                  variant="secondary" 
                  onClick={restartGame}
                >
                  Restart
                </Button>
              )}
            </div>
          </div>
          
          <div className={`grid ${getGridCols()} gap-3 w-full max-w-md`}>
            {cards.map((card, index) => {
              const isFlipped = flippedIndices.includes(index) || matchedPairs.some(pair => pair.includes(index))
              
              return (
                <motion.div
                  key={index}
                  className="relative h-16 sm:h-20 cursor-pointer"
                  onClick={() => handleCardClick(index)}
                  whileHover={{ scale: isFlipped ? 1 : 1.05 }}
                  whileTap={{ scale: isFlipped ? 1 : 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-lg flex items-center justify-center"
                    animate={{
                      rotateY: isFlipped ? 180 : 0,
                      backgroundColor: matchedPairs.some(pair => pair.includes(index)) 
                        ? 'rgba(74, 222, 128, 0.2)' 
                        : 'rgba(255, 255, 255, 0.05)'
                    }}
                    transition={{ duration: 0.6 }}
                    style={{
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    <span className="text-xl">?</span>
                  </motion.div>
                  
                  <motion.div
                    className="absolute inset-0 glass rounded-lg flex items-center justify-center"
                    animate={{
                      rotateY: isFlipped ? 0 : -180
                    }}
                    transition={{ duration: 0.6 }}
                    style={{
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    <span className="text-3xl">{card.symbol}</span>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
          
          {/* Game over overlay */}
          {gameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 glass p-4 rounded-lg text-center w-full"
            >
              <h3 className="text-xl font-bold mb-2">
                {level === 3 ? 'Congratulations! You completed all levels!' : `Level ${level} Complete!`}
              </h3>
              <p className="text-gray-300 mb-4">
                You finished in {moves} moves!
              </p>
              {level === 3 ? (
                <Button onClick={restartGame}>Play Again</Button>
              ) : (
                <Button onClick={nextLevel}>Next Level</Button>
              )}
            </motion.div>
          )}
          
          {/* Loading message */}
          {showingTimeout && (
            <div className="mt-4 text-center">
              <p className="text-gray-400">Memorize the cards...</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default MemoryGame