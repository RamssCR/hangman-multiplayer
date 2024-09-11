import { useContext, useEffect } from "react"
import { gameContext } from "../context/GameContext"
import { useNavigate } from 'react-router-dom'
import PlayersCard from '../components/PlayersCard'
import WordToGuess from '../components/WordToGuess'
import Keyboard from "../components/Keyboard"
import '../styles/game.css'

function Game() {
    const { players, setPlayerTurn, ingameMessage } = useContext(gameContext)
    const navigateTo = useNavigate()

    useEffect(() => {
        if (players.length === 0) navigateTo('/')
    }, [navigateTo, players.length])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setPlayerTurn(localStorage.getItem('starter')), [])

    return (
        <main className='game-container'>
            {ingameMessage && (
                <div className="in-game-container">
                    <span className="in-game-dialog">{ingameMessage}</span>
                </div>
            ) }
            <div className='playing-users'>
                {players.length !== 0 && players.map((player, index) => <PlayersCard key={index} username={player.username} lives={player.lives} />)}
            </div>
            <WordToGuess />
            <Keyboard />
        </main>
    )
}

export default Game