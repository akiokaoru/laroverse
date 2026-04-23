'use client'

import { GameState } from '@/types/werewolf'

interface VotingPhaseProps {
  gameState: GameState
  currentPlayerId: string
  onVote: (voterId: string, targetId: string) => void
}

export default function VotingPhase({ gameState, currentPlayerId, onVote }: VotingPhaseProps) {
  const voteCount = Object.values(gameState.votes).reduce((acc: any, vote: string) => {
    acc[vote] = (acc[vote] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const mostVoted = Object.entries(voteCount).reduce((a: [string, number], b: [string, number]) => 
    b[1] > a[1] ? b : a, ['', 0])

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

  const eliminatedPlayer = gameState.players.find(p => p.id === mostVoted[0])

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Voting Results</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">Vote Count</h3>
        <div className="space-y-3">
          {Object.entries(voteCount).map(([playerId, votes]) => {
            const player = gameState.players.find(p => p.id === playerId)
            return (
              <div key={playerId} className="bg-white/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getRoleIcon(player?.role || '')}</span>
                    <span className="text-white font-medium">{player?.name}</span>
                    <span className="text-white/60">({player?.role})</span>
                  </div>
                  <div className="text-white font-bold text-xl">{votes} votes</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {eliminatedPlayer && (
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">Player Eliminated</h3>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{getRoleIcon(eliminatedPlayer.role)}</span>
            <span className="text-white font-medium">{eliminatedPlayer.name}</span>
            <span className="text-white/60">({eliminatedPlayer.role})</span>
          </div>
        </div>
      )}

      <div className="bg-white/10 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-2">Game Status</h3>
        <p className="text-white/80">
          The game will now check for a winner. If there's no winner yet, the game continues to another round.
        </p>
      </div>
    </div>
  )
}
