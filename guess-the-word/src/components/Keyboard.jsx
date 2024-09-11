import { useContext } from 'react';
import { gameContext } from '../context/GameContext';
import '../styles/keyboard.css'

function Keyboard() {
    const { player, players, validateLetter, playerTurn } = useContext(gameContext)
    const actualPlayer = players.filter(filteredPlayer => filteredPlayer.username === player)
    const chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z"]

    return (
        <div className="keyboard">
            {chars.map((char, index) => <button className="btn-char" key={index} onClick={(e) => {
                const user_answer = {
                    username: actualPlayer[0].username,
                    lives: actualPlayer[0].lives,
                    letter: e.target.innerText,
                    allPlayers: players
                }

                console.log(player, playerTurn)

                if (player === playerTurn) validateLetter(user_answer)
            }}>{char}</button>)}
        </div>
    );
}

export default Keyboard;