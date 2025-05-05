import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [winner, setWinner] = useState(null)
  const [winningCombination, setWinningCombination] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [aiThinking, setAiThinking] = useState(false)
  
  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setWinner(null)
    setWinningCombination([])
    setGameOver(false)
  }
  
  // Check for a winner
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], combination: lines[i] }
      }
    }
    
    if (squares.every(square => square !== null)) {
      return { winner: 'draw', combination: [] }
    }
    
    return { winner: null, combination: [] }
  }
  
  // AI move with minimax algorithm
  const findBestMove = (squares, depth = 0, isMaximizing = false) => {
    const { winner } = calculateWinner(squares)
    
    // Terminal states
    if (winner === 'X') return { score: -10 + depth }
    if (winner === 'O') return { score: 10 - depth }
    if (winner === 'draw') return { score: 0 }
    
    // Find available moves
    const availableMoves = squares.map((square, index) => 
      square === null ? index : null
    ).filter(val => val !== null)
    
    // No more moves
    if (availableMoves.length === 0) {
      return { score: 0 }
    }
    
    // Initialize best
    let bestMove
    let bestScore = isMaximizing ? -Infinity : Infinity
    
    // Try each available move
    for (let i = 0; i < availableMoves.length; i++) {
      const move = availableMoves[i]
      
      // Make the move
      squares[move] = isMaximizing ? 'O' : 'X'
      
      // Recursively find the score for this move
      const { score } = findBestMove(squares, depth + 1, !isMaximizing)
      
      // Undo the move
      squares[move] = null
      
      // Update best score
      if (isMaximizing && score > bestScore) {
        bestScore = score
        bestMove = move
      } else if (!isMaximizing && score < bestScore) {
        bestScore = score
        bestMove = move
      }
    }
    
    return { move: bestMove, score: bestScore }
  }
  
  // Handle AI move
  useEffect(() => {
    if (!isXNext && !winner && !gameOver) {
      setAiThinking(true)
      
      // Simulate AI thinking time
      setTimeout(() => {
        const boardCopy = [...board]
        const { move } = findBestMove(boardCopy, 0, true)
        
        if (move !== undefined) {
          handleClick(move)
        }
        
        setAiThinking(false)
      }, 700)
    }
  }, [isXNext, winner, gameOver])
  
  // Handle player click
  const handleClick = (index) => {
    // Return if the square is filled or there's a winner
    if (board[index] || winner || gameOver || aiThinking) {
      return
    }
    
    // Create a copy of the board
    const boardCopy = [...board]
    
    // Fill the square with X or O
    boardCopy[index] = isXNext ? 'X' : 'O'
    
    // Update the board
    setBoard(boardCopy)
    
    // Check for winner
    const { winner: newWinner, combination } = calculateWinner(boardCopy)
    
    if (newWinner) {
      setWinner(newWinner)
      setWinningCombination(combination)
      setGameOver(true)
    } else {
      // Switch turns
      setIsXNext(!isXNext)
    }
  }
  
  // Render a square
  const renderSquare = (index) => {
    const isWinningSquare = winningCombination.includes(index)
    
    return (
      <motion.button
        className={`w-full h-24 text-4xl font-bold bg-black border border-gray-700 rounded-lg flex items-center justify-center ${
          isWinningSquare ? 'bg-green-900 bg-opacity-50' : ''
        }`}
        onClick={() => handleClick(index)}
        whileHover={{ scale: board[index] ? 1 : 1.05 }}
        whileTap={{ scale: board[index] ? 1 : 0.95 }}
        disabled={!!board[index] || !!winner || gameOver || aiThinking}
      >
        {board[index] && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={board[index] === 'X' ? 'text-white' : 'text-red-500'}
          >
            {board[index]}
          </motion.span>
        )}
      </motion.button>
    )
  }
  
  // Determine status message
  let status
  if (winner === 'X') {
    status = 'You win!'
  } else if (winner === 'O') {
    status = 'AI wins!'
  } else if (winner === 'draw') {
    status = 'It\'s a draw!'
  } else {
    status = aiThinking ? 'AI is thinking...' : `Your turn (X)`
  }
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-6 text-center">
        <h3 className="text-xl font-semibold mb-2">{status}</h3>
        <p className="text-gray-400 mb-4">You are X, AI is O</p>
        <Button onClick={resetGame}>New Game</Button>
      </div>
      
      <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
        {Array(9).fill(null).map((_, index) => (
          <div key={index}>
            {renderSquare(index)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TicTacToe