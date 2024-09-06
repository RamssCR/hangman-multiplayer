import userIcon from '../assets/user-icon.png'
import '../styles/playerCard.css'

function PlayersCard({username, lives}) {
    return (
        <article className='player-card'>
            <div className="img-container">
                <img src={userIcon} alt={username} />
            </div>
            <div className='player-info'>
                <span className='player-name'>{username}</span>
                <span className="lives">Lives: {lives}</span>
            </div>
        </article>
    )
}

export default PlayersCard