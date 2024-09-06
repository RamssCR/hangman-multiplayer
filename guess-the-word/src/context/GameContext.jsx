import { createContext, useEffect, useState } from 'react'
import { socket } from '../socket'

export const gameContext = createContext()

// eslint-disable-next-line react/prop-types
export function GameContext({children}) {
    // State to storage player's usernames
    const [player, setPlayer] = useState('')

    // State to storage all players ready for the match
    const [players, setPlayers] = useState(() => {
        const savedPlayers = localStorage.getItem('all-players')
        return savedPlayers ? JSON.parse(savedPlayers) : []
    })

    // State to storage the word to guess
    const [word, setWord] = useState(() => {
        const savedWord = localStorage.getItem('word-config')
        return savedWord ? JSON.parse(savedWord) : {}
    })

    // Errors
    const [error, setError] = useState('')

    // Loaders
    const [lobbyLoading, setLobbyLoading] = useState(false)

    useEffect(() => {
        localStorage.setItem('all-players', JSON.stringify(players))
        localStorage.setItem('word-config', JSON.stringify(word))
    }, [players, word])

    useEffect(() => {
        socket.on('timeout', ({message}) => setError(message))
        setLobbyLoading(false)
    }, [error])

    function sendPlayer() {
        if (player) socket.emit('newPlayer', {username: player})
        socket.on('players', ({allPlayers, wordConfig}) => {
            setPlayers(allPlayers)
            setWord(wordConfig)
        })
        setLobbyLoading(true)
    }

    return (
        <gameContext.Provider value={{
            player, 
            players,
            error,
            lobbyLoading,
            word,
            setPlayers, 
            setPlayer,
            setError, 
            sendPlayer,
        }}>
            {children}
        </gameContext.Provider>
    )
}