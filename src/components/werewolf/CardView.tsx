'use client'

import { useState } from 'react'
import { GameState, Player } from '@/types/werewolf'

interface CardViewProps {
  gameState: GameState
  currentPlayerId: string
  onNextPlayer: () => void
  onCardViewed: () => void
}

export default function CardView({ gameState, currentPlayerId, onNextPlayer, onCardViewed }: CardViewProps) {
  const [hasViewedCard, setHasViewedCard] = useState(false)
  const [showCard, setShowCard] = useState(true)
  const currentPlayer = gameState.players.find(p => p.id === currentPlayerId)

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'werewolf': return '🐺'
      case 'seer': return '🔮'
      case 'robber': return '🥷'
      case 'troublemaker': return '👹'
      case 'insomniac': return '😴'
      default: return '👤'
    }
  }

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'werewolf':
        return 'You are a werewolf! Work with other werewolves to blend in and avoid detection.'
      case 'seer':
        return 'You are the Seer! During the night, you may view one player\'s card or two center cards.'
      case 'robber':
        return 'You are the Robber! During the night, you may swap your card with another player.'
      case 'troublemaker':
        return 'You are the Troublemaker! During the night, you may swap two other players\' cards.'
      case 'insomniac':
        return 'You are the Insomniac! During the night, you may view your own card to see if it changed.'
      default:
        return 'You are a Villager! Help identify and eliminate the werewolves.'
    }
  }

  const handleViewCard = () => {
    setHasViewedCard(true)
    onCardViewed()
  }

  const handleNextPlayer = () => {
    setShowCard(false) // Hide current card before moving to next player
    setTimeout(() => {
      onNextPlayer()
      setShowCard(true) // Show card for next player
      setHasViewedCard(false) // Reset viewed state for next player
    }, 300) // Small delay to ensure card is hidden
  }

  if (!currentPlayer) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-auto text-center">
        <p className="text-white">Player not found</p>
      </div>
    )
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-white mb-6">View Your Role</h2>
      
      <div className="mb-8">
        <p className="text-white/80 mb-4">
          {currentPlayer.name}, it's time to view your secret role card.
        </p>
        <p className="text-white/60 text-sm">
          Make sure other players cannot see your screen!
        </p>
      </div>

      {!hasViewedCard ? (
        <div className="bg-white/20 rounded-xl p-8 mb-6 cursor-pointer hover:bg-white/30 transition-colors"
             onClick={handleViewCard}>
          <div className="text-6xl mb-4">🎴</div>
          <p className="text-white font-semibold">Click to reveal your role</p>
        </div>
      ) : showCard ? (
        <div className="bg-gradient-to-br from-game-primary to-game-secondary rounded-xl p-8 mb-6">
          <div className="text-6xl mb-4">{getRoleIcon(currentPlayer.role)}</div>
          <h3 className="text-2xl font-bold text-white mb-2 capitalize">{currentPlayer.role}</h3>
          <p className="text-white/80">{getRoleDescription(currentPlayer.role)}</p>
        </div>
      ) : (
        <div className="bg-white/20 rounded-xl p-8 mb-6">
          <div className="text-6xl mb-4">🎴</div>
          <p className="text-white/60">Card hidden for privacy</p>
        </div>
      )}

      {hasViewedCard && (
        <button
          onClick={handleNextPlayer}
          className="bg-white text-game-primary py-3 px-8 rounded-lg font-semibold hover:bg-white/90 transition-colors"
        >
          Next Player
        </button>
      )}

      <div className="mt-6 text-white/40 text-sm">
        Player {gameState.players.findIndex(p => p.id === currentPlayerId) + 1} of {gameState.players.length}
      </div>
    </div>
  )
}
