'use client'

import { useState } from 'react'
import { GameState } from '@/types/werewolf'

interface NightPhaseProps {
  gameState: GameState
  currentPlayerId: string
  onAction: (action: keyof GameState['nightActions'], value: any) => void
  onPhaseComplete: () => void
}

export default function NightPhase({ gameState, currentPlayerId, onAction, onPhaseComplete }: NightPhaseProps) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [selectedTarget, setSelectedTarget] = useState('')
  const [showSeerResult, setShowSeerResult] = useState(false)

  const currentPlayer = gameState.players.find(p => p.id === currentPlayerId)
  const rolesInOrder = ['werewolf', 'seer', 'robber', 'troublemaker', 'insomniac']
  const currentRole = rolesInOrder[currentRoleIndex]
  const playersWithRole = gameState.players.filter(p => p.role === currentRole)

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'werewolf':
        return 'Werewolves wake up and identify each other'
      case 'seer':
        return 'Seer may view one player\'s card or two of the center cards'
      case 'robber':
        return 'Robber may swap their card with another player'
      case 'troublemaker':
        return 'Troublemaker may swap two other players\' cards'
      case 'insomniac':
        return 'Insomniac may view their own card'
      default:
        return ''
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'werewolf': return '🐺'
      case 'seer': return '🔮'
      case 'robber': return '🥷'
      case 'troublemaker': return '👹'
      case 'insomniac': return '😴'
      default: return '❓'
    }
  }

  const handleAction = () => {
    if (currentRole === 'seer' && selectedTarget) {
      if (!showSeerResult) {
        setShowSeerResult(true)
        return
      }
      onAction('seerTarget', selectedTarget)
    } else if (currentRole === 'robber' && selectedTarget) {
      onAction('robberTarget', selectedTarget)
    } else if (currentRole === 'troublemaker' && selectedTarget) {
      onAction('troublemakerTargets', [selectedTarget, ''])
    }
    
    if (currentRoleIndex < rolesInOrder.length - 1) {
      setCurrentRoleIndex(currentRoleIndex + 1)
      setSelectedTarget('')
      setShowSeerResult(false)
    } else {
      onPhaseComplete()
    }
  }

  const canSelectTarget = () => {
    if (currentRole === 'seer') return !selectedTarget
    if (currentRole === 'robber') return !selectedTarget
    if (currentRole === 'troublemaker') return !selectedTarget
    return false
  }

  const hasSelectedTarget = () => {
    return selectedTarget !== ''
  }

  const canConfirmAction = () => {
    // Can confirm action if it's the last role or if action has been taken
    return currentRoleIndex === rolesInOrder.length - 1 || 
           (currentRole !== 'seer' && currentRole !== 'robber' && currentRole !== 'troublemaker') ||
           (currentRole === 'seer' && selectedTarget) ||
           (currentRole === 'robber' && selectedTarget) ||
           (currentRole === 'troublemaker' && selectedTarget)
  }

  const getSelectedTargetRole = () => {
    if (!selectedTarget) return null
    const targetPlayer = gameState.players.find(p => p.id === selectedTarget)
    return targetPlayer ? targetPlayer.role : null
  }

  const handleSkip = () => {
    if (currentRoleIndex < rolesInOrder.length - 1) {
      setCurrentRoleIndex(currentRoleIndex + 1)
      setSelectedTarget('')
    } else {
      onPhaseComplete()
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Night Phase</h2>
      
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">{getRoleIcon(currentRole)}</div>
        <h3 className="text-2xl font-semibold text-white mb-2 capitalize">{currentRole}s Wake Up</h3>
        <p className="text-white/80">{getRoleDescription(currentRole)}</p>
      </div>

      {playersWithRole.length > 0 && (
        <div className="mb-6">
          <p className="text-white mb-2">Players with this role:</p>
          <div className="flex flex-wrap gap-2">
            {playersWithRole.map(player => (
              <span key={player.id} className="bg-white/20 text-white px-3 py-1 rounded-lg">
                {player.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {(currentRole === 'seer' || currentRole === 'robber' || currentRole === 'troublemaker') && (
        <div className="mb-6">
          <p className="text-white mb-2">Select a target:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {gameState.players.map(player => (
              <button
                key={player.id}
                onClick={() => setSelectedTarget(player.id)}
                className={`p-3 rounded-lg transition-colors ${
                  selectedTarget === player.id
                    ? 'bg-white text-night'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {player.name}
                {currentRole === 'seer' && selectedTarget === player.id && showSeerResult && (
                  <span className="ml-2 text-sm text-night/80">
                    ({getSelectedTargetRole()})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={handleAction}
          disabled={false}
          className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
            selectedTarget || (currentRole !== 'seer' && currentRole !== 'robber' && currentRole !== 'troublemaker')
              ? 'bg-white text-night hover:bg-white/90'
              : 'bg-white/20 text-white/50 cursor-not-allowed'
          }`}
        >
          {currentRole === 'seer' && !showSeerResult ? 'View Card' : currentRole === 'insomniac' ? 'View Card' : 'Confirm Action'}
        </button>
        
        <button
          onClick={handleSkip}
          className="flex-1 bg-white/20 text-white py-3 px-6 rounded-lg font-semibold hover:bg-white/30 transition-colors"
        >
          Skip
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-white/60 text-sm">
          Step {currentRoleIndex + 1} of {rolesInOrder.length}
        </p>
      </div>
    </div>
  )
}
