import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faRobot, faDragon, faBrain } from '@fortawesome/free-solid-svg-icons'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import TicTacToe from '../games/TicTacToe'
import SnakeGame from '../games/SnakeGame'
import MemoryGame from '../games/MemoryGame'

const Fun = ({ textEnter, textLeave }) => {
  // State for selected game
  const [selectedGame, setSelectedGame] = useState(null)
  
  // Games data
  const games = [
    {
      id: 'tictactoe',
      title: 'AI Tic Tac Toe',
      description: 'Play the classic game of Tic Tac Toe against an AI opponent.',
      icon: faRobot,
      component: TicTacToe
    },
    {
      id: 'snake',
      title: 'Snake Game',
      description: 'Control the snake, eat the apples, and try not to hit the walls or yourself!',
      icon: faDragon,
      component: SnakeGame
    },
    {
      id: 'memory',
      title: 'Memory Game',
      description: 'Test your memory by matching pairs of cards in this classic game.',
      icon: faBrain,
      component: MemoryGame
    }
  ]
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const gameCardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  }
  
  // Handle back button
  const handleBack = () => {
    setSelectedGame(null)
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-16 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="mr-3">Let's Have Fun</span>
            <FontAwesomeIcon icon={faGamepad} className="text-white" />
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Take a break and enjoy these mini-games. Challenge yourself or just relax!
          </p>
        </motion.div>
        
        <AnimatePresence mode="wait">
          {selectedGame ? (
            <motion.div
              key="game"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-2xl p-6 md:p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{selectedGame.title}</h2>
                <Button
                  variant="secondary"
                  onClick={handleBack}
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                >
                  Back to Games
                </Button>
              </div>
              
              <selectedGame.component />
            </motion.div>
          ) : (
            <motion.div
              key="gamesList"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {games.map((game) => (
                <motion.div
                  key={game.id}
                  variants={gameCardVariants}
                  whileHover={{ y: -5 }}
                >
                  <Card 
                    className="h-full flex flex-col cursor-pointer"
                    onClick={() => setSelectedGame(game)}
                    onMouseEnter={textEnter}
                    onMouseLeave={textLeave}
                  >
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex justify-center mb-4">
                        <FontAwesomeIcon icon={game.icon} className="text-5xl text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-center mb-3">{game.title}</h3>
                      <p className="text-gray-400 text-center mb-6 flex-grow">{game.description}</p>
                      <Button
                        variant="primary"
                        fullWidth
                        onClick={() => setSelectedGame(game)}
                        onMouseEnter={textEnter}
                        onMouseLeave={textLeave}
                      >
                        Play Now
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default Fun