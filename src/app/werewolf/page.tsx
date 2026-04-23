'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useWerewolfGame } from '@/hooks/useWerewolfGame'
import GameSetup from '@/components/werewolf/GameSetup'
import CardView from '@/components/werewolf/CardView'
import NightPhase from '@/components/werewolf/NightPhase'
import DayPhase from '@/components/werewolf/DayPhase'
import VotingPhase from '@/components/werewolf/VotingPhase'
import GameOver from '@/components/werewolf/GameOver'

export default function WerewolfGame() {
  const { 
    gameState, 
    startGame, 
    resetGame, 
    performNightAction, 
    moveToDay, 
    vote, 
    calculateWinner,
    startCardViewing,
    nextPlayer,
    getCurrentPlayer,
    currentPlayerIndex
  } = useWerewolfGame()
  const [currentPlayerId, setCurrentPlayerId] = useState<string>('')

  const handleStartGame = (playerNames: string[]) => {
    startGame(playerNames)
    startCardViewing()
  }

  const handleReset = () => {
    resetGame()
    setCurrentPlayerId('')
  }

  const handleNextPlayer = () => {
    nextPlayer()
  }

  const handleCardViewed = () => {
    // Card has been viewed, ready for next player
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-night to-game-primary p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="text-white hover:text-white/80 transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-white">One Night Werewolf</h1>
          <button
            onClick={handleReset}
            className="text-white hover:text-white/80 transition-colors"
          >
            Reset Game
          </button>
        </div>

        {gameState.phase === 'setup' && (
          <GameSetup onStartGame={handleStartGame} />
        )}

        {gameState.phase === 'cardView' && (
          <CardView
            gameState={gameState}
            currentPlayerId={getCurrentPlayer()?.id || ''}
            onNextPlayer={handleNextPlayer}
            onCardViewed={handleCardViewed}
          />
        )}

        {gameState.phase === 'night' && (
          <NightPhase
            gameState={gameState}
            currentPlayerId={currentPlayerId}
            onAction={performNightAction}
            onPhaseComplete={moveToDay}
          />
        )}

        {gameState.phase === 'day' && (
          <DayPhase
            gameState={gameState}
            currentPlayerId={currentPlayerId}
            onVote={vote}
          />
        )}

        {gameState.phase === 'voting' && (
          <VotingPhase
            gameState={gameState}
            currentPlayerId={currentPlayerId}
            onVote={vote}
          />
        )}

        {gameState.phase === 'gameOver' && (
          <GameOver
            winner={calculateWinner()}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  )
}
