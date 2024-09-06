import { useContext, useEffect } from "react"
import { gameContext } from "../context/GameContext"
import { useNavigate } from 'react-router-dom'
import PlayersCard from '../components/PlayersCard'
import WordToGuess from '../components/WordToGuess'
import Keyboard from "../components/Keyboard"
import '../styles/game.css'

function Game() {
    const { players } = useContext(gameContext)
    const navigateTo = useNavigate()

    useEffect(() => {
        if (players.length === 0) navigateTo('/')
    }, [])

    return (
        <main className='game-container'>
            <div className='playing-users'>
                {players.map((player, index) => <PlayersCard key={index} username={player.username} lives={player.lives} />)}
            </div>
            <WordToGuess />
            <Keyboard />
        </main>
    )
}

export default Game