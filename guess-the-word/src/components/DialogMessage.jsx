import { useContext } from "react"
import { gameContext } from "../context/GameContext"
import '../styles/dialog.css'

function DialogMessage() {
    const { error, setError } = useContext(gameContext)

    return (
        <div className='modal'>
            <div className='dialog'>
                <h2 className='error-title'>Timeout!</h2>
                <p className='error-description'>{error}</p>
                <button className='btn-close' onClick={() => setError('')}>Close</button>
            </div>
        </div>
    )
}

export default DialogMessage