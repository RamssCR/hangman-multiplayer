import { useContext } from "react"
import { gameContext } from '../context/GameContext'
import '../styles/wordToGuess.css'

function WordToGuess() {
    const {word} = useContext(gameContext)

    if (!word.gameWord) return
    const {gameWord} = word

    return (
        <div className='letters-container'>
            {gameWord.map((letter, index) => (
                <div className='letter-container' key={index}>
                    {/* <span className='letter'>{letter}</span> */}
                </div>
            ))}
        </div>
    )
}

export default WordToGuess;