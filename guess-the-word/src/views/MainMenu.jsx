import DialogMessage from '../components/DialogMessage'
import { useContext, useEffect } from 'react'
import { gameContext } from '../context/GameContext'
import { useNavigate } from 'react-router-dom'
import '../styles/mainmenu.css'

function MainMenu() {
  const {
    player, 
    players,
    error,
    lobbyLoading,
    setPlayer,
    sendPlayer
  } = useContext(gameContext)

  const navigateTo = useNavigate()

  const handleInput = (e) => {
    setPlayer(e.target.value)
  }

  useEffect(() => {
    localStorage.clear()
  }, [])

  useEffect(() => {
    if (players.length !== 0) navigateTo('/in-game')
  }, [players.length, navigateTo])

  return (
    <main className='main-menu-container'>
        <h1 className='game-title'>Guess the Word!</h1>
        {error && <DialogMessage />}
        <form method="post" onSubmit={(e) => {
          e.preventDefault()
          sendPlayer(player)
        }}>
            <div className='controller-group'>
                <label htmlFor='username' className='username-main-menu'>Enter your username</label>
                <input 
                  type='text' 
                  id='username' 
                  className='username-input' 
                  placeholder='i.e marco_12' 
                  autoComplete='off'
                  onInput={handleInput} 
                  value={player} />
            </div>
            <button className='btn-start'>{!lobbyLoading ? 'Start new game': 'Searching for Opponents'} {lobbyLoading && <span className="loader"></span>}</button>
        </form>
    </main>
  )
}

export default MainMenu