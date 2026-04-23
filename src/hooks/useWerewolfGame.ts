'use client'

import { useState, useCallback } from 'react'
import { GameConfig, GameState, Player, Role } from '@/types/werewolf'

const getRolesForPlayerCount = (playerCount: number): Role[] => {
  switch (playerCount) {
    case 3:
      return ['werewolf', 'seer', 'robber', 'villager', 'villager', 'villager']
    case 4:
      return ['werewolf', 'werewolf', 'seer', 'robber', 'villager', 'villager']
    case 5:
      return ['werewolf', 'werewolf', 'seer', 'robber', 'troublemaker', 'villager']
    case 6:
      return ['werewolf', 'werewolf', 'seer', 'robber', 'troublemaker', 'insomniac']
    default:
      return ['werewolf', 'werewolf', 'seer', 'robber', 'troublemaker', 'insomniac']
  }
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const useWerewolfGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    phase: 'setup',
    players: [],
    currentTurn: 0,
    nightActions: {},
    votes: {},
    centerCards: [],
  })
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)

  const startGame = useCallback((playerNames: string[]) => {
    const roles = getRolesForPlayerCount(playerNames.length)
    const shuffledRoles = shuffleArray(roles)
    
    const players: Player[] = playerNames.map((name, index) => ({
      id: `player-${index}`,
      name,
      role: shuffledRoles[index],
      isAlive: true,
    }))

    // Assign remaining roles to center cards (3 center cards)
    const centerCards = shuffledRoles.slice(playerNames.length, playerNames.length + 3)

    setGameState({
      phase: 'night',
      players,
      currentTurn: 0,
      nightActions: {},
      votes: {},
      centerCards,
    })
  }, [])

  const resetGame = useCallback(() => {
    setGameState({
      phase: 'setup',
      players: [],
      currentTurn: 0,
      nightActions: {},
      votes: {},
      centerCards: [],
    })
  }, [])

  const performNightAction = useCallback((action: keyof GameState['nightActions'], value: any) => {
    setGameState(prev => ({
      ...prev,
      nightActions: {
        ...prev.nightActions,
        [action]: value,
      },
    }))
  }, [])

  const moveToDay = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      phase: 'day',
    }))
  }, [])

  const vote = useCallback((voterId: string, targetId: string) => {
    setGameState(prev => ({
      ...prev,
      votes: {
        ...prev.votes,
        [voterId]: targetId,
      },
    }))
  }, [])

  const calculateWinner = useCallback((): 'werewolves' | 'villagers' | null => {
    const alivePlayers = gameState.players.filter(p => p.isAlive)
    const aliveWerewolves = alivePlayers.filter(p => p.role === 'werewolf')
    const aliveVillagers = alivePlayers.filter(p => p.role !== 'werewolf')

    if (aliveWerewolves.length === 0) return 'villagers'
    if (aliveWerewolves.length >= aliveVillagers.length) return 'werewolves'
    return null
  }, [gameState.players])

  const startCardViewing = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      phase: 'cardView',
    }))
    setCurrentPlayerIndex(0)
  }, [])

  const nextPlayer = useCallback(() => {
    if (currentPlayerIndex < gameState.players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1)
    } else {
      setGameState(prev => ({
        ...prev,
        phase: 'night',
      }))
    }
  }, [currentPlayerIndex, gameState.players.length])

  const getCurrentPlayer = useCallback(() => {
    return gameState.players[currentPlayerIndex]
  }, [currentPlayerIndex, gameState.players])

  return {
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
    currentPlayerIndex,
  }
}
