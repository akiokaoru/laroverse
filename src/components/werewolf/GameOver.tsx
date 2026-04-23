'use client'

interface GameOverProps {
  winner: 'werewolves' | 'villagers' | null
  onReset: () => void
}

export default function GameOver({ winner, onReset }: GameOverProps) {
  const getWinnerMessage = () => {
    if (winner === 'werewolves') {
      return {
        title: '🐺 Werewolves Win!',
        message: 'The werewolves have successfully infiltrated the village and won the game!',
        color: 'red'
      }
    } else if (winner === 'villagers') {
      return {
        title: '🏘️ Villagers Win!',
        message: 'The villagers successfully identified and eliminated all werewolves!',
        color: 'green'
      }
    } else {
      return {
        title: '🤝 Game Draw!',
        message: 'The game ended in a draw. Well played by all!',
        color: 'yellow'
      }
    }
  }

  const winnerInfo = getWinnerMessage()

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-bold text-white mb-6">Game Over</h2>
      
      <div className={`bg-${winnerInfo.color}-500/20 border border-${winnerInfo.color}-500 rounded-lg p-8 mb-8`}>
        <h3 className="text-3xl font-bold text-white mb-4">{winnerInfo.title}</h3>
        <p className="text-white/80 text-lg">{winnerInfo.message}</p>
      </div>

      <div className="bg-white/10 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">Thanks for Playing!</h3>
        <p className="text-white/80 mb-4">
          One Night Werewolf is a game of deduction and deception. Each game is unique with different roles and outcomes.
        </p>
        <div className="text-white/60 text-sm">
          <p>• Werewolves try to remain undetected</p>
          <p>• Villagers try to identify the werewolves</p>
          <p>• Special roles have unique abilities to help their team</p>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={onReset}
          className="bg-white text-game-primary py-3 px-8 rounded-lg font-semibold hover:bg-white/90 transition-colors"
        >
          Play Again
        </button>
        
        <button
          onClick={() => window.location.href = '/'}
          className="bg-white/20 text-white py-3 px-8 rounded-lg font-semibold hover:bg-white/30 transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}
