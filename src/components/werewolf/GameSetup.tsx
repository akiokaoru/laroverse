'use client'

import { useState } from 'react'

interface GameSetupProps {
  onStartGame: (playerNames: string[]) => void
}

export default function GameSetup({ onStartGame }: GameSetupProps) {
  const [playerNames, setPlayerNames] = useState<string[]>(['', '', ''])

  const handlePlayerNameChange = (index: number, name: string) => {
    const newNames = [...playerNames]
    newNames[index] = name
    setPlayerNames(newNames)
  }

  const handlePlayerCountChange = (count: number) => {
    const newNames = Array(count).fill('')
    playerNames.forEach((name, index) => {
      if (index < count) {
        newNames[index] = name
      }
    })
    setPlayerNames(newNames)
  }

  const handleStartGame = () => {
    const validNames = playerNames.filter(name => name.trim() !== '')
    if (validNames.length >= 3) {
      onStartGame(validNames)
    }
  }

  const canStart = playerNames.filter(name => name.trim() !== '').length >= 3

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Game Setup</h2>
      
      <div className="mb-6">
        <label className="block text-white mb-2">Number of Players</label>
        <select
          value={playerNames.length}
          onChange={(e) => handlePlayerCountChange(Number(e.target.value))}
          className="w-full bg-white/20 text-white border border-white/30 rounded-lg px-4 py-2 focus:outline-none focus:border-white/50"
        >
          <option value={3}>3 Players</option>
          <option value={4}>4 Players</option>
          <option value={5}>5 Players</option>
          <option value={6}>6 Players</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-white mb-2">Player Names</label>
        {playerNames.map((name, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Player ${index + 1}`}
            value={name}
            onChange={(e) => handlePlayerNameChange(index, e.target.value)}
            className="w-full bg-white/20 text-white border border-white/30 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:border-white/50 placeholder-white/50"
          />
        ))}
      </div>

      <div className="bg-white/10 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">Game Rules</h3>
        <ul className="text-white/80 text-sm space-y-1">
          <li>• Each player gets a secret role</li>
          <li>• Werewolves win if they equal or outnumber villagers</li>
          <li>• Villagers win if all werewolves are eliminated</li>
          <li>• Special roles have unique abilities during the night phase</li>
        </ul>
      </div>

      <button
        onClick={handleStartGame}
        disabled={!canStart}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
          canStart
            ? 'bg-white text-game-primary hover:bg-white/90'
            : 'bg-white/20 text-white/50 cursor-not-allowed'
        }`}
      >
        Start Game
      </button>
    </div>
  )
}
