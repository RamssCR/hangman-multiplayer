import { createContext, useEffect, useState } from 'react'
import { socket } from '../socket'

export const gameContext = createContext()

// eslint-disable-next-line react/prop-types
export function GameContext({children}) {
    // State to storage player's usernames
    const [player, setPlayer] = useState(() => {
        const savedPlayer = localStorage.getItem('username')
        return savedPlayer ? savedPlayer : ''
    })

    // Starting User
    const [startingUser, setStartingUser] = useState(() => {
        const starter = localStorage.getItem('starter')
        return starter ? starter : ''
    })

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

    // In-Game messages
    const [ingameMessage, setIngameMessage] = useState('')
    const [playerTurn, setPlayerTurn] = useState('')



    useEffect(() => {
        localStorage.setItem('username', player)
        localStorage.setItem('all-players', JSON.stringify(players))
        localStorage.setItem('word-config', JSON.stringify(word))
        localStorage.setItem('starter', startingUser)
    }, [players, word, player, startingUser])

    useEffect(() => {
        socket.on('timeout', ({message}) => setError(message))
        setLobbyLoading(false)
    }, [error])

    useEffect(() => {
        socket.on('match', ({message}) => setIngameMessage(message))
        socket.on('miss', ({message}) => setIngameMessage(message))
    }, [ingameMessage])

    useEffect(() => {
        if (players.length !== 0) socket.on('players', ({allPlayers}) => setPlayers(allPlayers)) 
    }, [players])

    useEffect(() => {
        socket.on('current_turn', ({current_turn}) => setPlayerTurn(current_turn))
    }, [playerTurn])


    function sendPlayer() {
        if (player) socket.emit('newPlayer', {username: player})
        socket.on('players', ({allPlayers, wordConfig, starting_player}) => {
            setPlayers(allPlayers)
            setWord(wordConfig)
            setStartingUser(starting_player)
        })
        setLobbyLoading(true)
    }

    function validateLetter(user_answer) {
        socket.emit('check_letter', user_answer)
    }

    return (
        <gameContext.Provider value={{
            player, 
            players,
            error,
            lobbyLoading,
            word,
            playerTurn,
            setPlayers, 
            setPlayer,
            setError, 
            sendPlayer,
            validateLetter,
            ingameMessage,
            setPlayerTurn
        }}>
            {children}
        </gameContext.Provider>
    )
}