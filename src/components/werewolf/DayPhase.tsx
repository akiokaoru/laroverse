'use client'

import { useState } from 'react'
import { GameState } from '@/types/werewolf'

interface DayPhaseProps {
  gameState: GameState
  currentPlayerId: string
  onVote: (voterId: string, targetId: string) => void
}

export default function DayPhase({ gameState, currentPlayerId, onVote }: DayPhaseProps) {
  const [selectedTarget, setSelectedTarget] = useState('')
  const [hasVoted, setHasVoted] = useState(false)

  const currentPlayer = gameState.players.find(p => p.id === currentPlayerId)
  const voteCount = Object.values(gameState.votes).reduce((acc, vote) => {
    acc[vote] = (acc[vote] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const handleVote = () => {
    if (selectedTarget && !hasVoted) {
      onVote(currentPlayerId, selectedTarget)
      setHasVoted(true)
    }
  }

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

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Day Phase</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">Discussion Time</h3>
        <p className="text-white/80 mb-4">
          Players discuss who they think the werewolves are. Each player shares what they know or suspect.
        </p>
        
        <div className="bg-white/10 rounded-lg p-4 mb-6">
          <h4 className="text-lg font-semibold text-white mb-2">Your Role</h4>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{getRoleIcon(currentPlayer?.role || '')}</span>
            <span className="text-white capitalize">{currentPlayer?.role}</span>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-4 mb-6">
          <h4 className="text-lg font-semibold text-white mb-2">All Players</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {gameState.players.map(player => (
              <div key={player.id} className="bg-white/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{getRoleIcon(player.role)}</span>
                  <span className="text-white font-medium">{player.name}</span>
                </div>
                <div className="text-white/60 text-sm">
                  Votes: {voteCount[player.id] || 0}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-4">Vote for a Player</h3>
        <p className="text-white/80 mb-4">
          Select who you think is a werewolf:
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {gameState.players
            .filter(p => p.id !== currentPlayerId)
            .map(player => (
              <button
                key={player.id}
                onClick={() => setSelectedTarget(player.id)}
                disabled={hasVoted}
                className={`p-3 rounded-lg transition-colors ${
                  selectedTarget === player.id
                    ? 'bg-red-500 text-white'
                    : 'bg-white/20 text-white hover:bg-white/30'
                } ${hasVoted ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                <div className="flex items-center gap-2 justify-center">
                  <span>{getRoleIcon(player.role)}</span>
                  <span>{player.name}</span>
                </div>
              </button>
            ))}
        </div>

        <button
          onClick={handleVote}
          disabled={!selectedTarget || hasVoted}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
            selectedTarget && !hasVoted
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-white/20 text-white/50 cursor-not-allowed'
          }`}
        >
          {hasVoted ? 'Vote Submitted' : 'Submit Vote'}
        </button>
      </div>

      {hasVoted && (
        <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 text-center">
          <p className="text-green-300">Your vote has been submitted!</p>
        </div>
      )}
    </div>
  )
}
