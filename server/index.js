import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { PORT } from './config.js'
import { generateWord } from './generateWord.js'

// Configurating the real-time server
const app = express()
const server = createServer(app)
const io = new Server(server)

let players_in_lobby = []
let players_in_game = []
let current_turn = 0

const word = generateWord()


// Creating the real-time connection to websockets
io.on('connection', (socket) => {
    // A player starts a new match
    socket.on('newPlayer', ({ username }) => {
        if (username) players_in_lobby.push(username)

        setTimeout(() => {
            if (players_in_lobby.length >= 2) {
                // Configurating players' settings before starting the match
                players_in_game = players_in_lobby.map((player) => {
                    return {
                        username: player,
                        lives: 9
                    }
                })
    
                const matchConfig = {
                    wordConfig: word,
                    allPlayers: players_in_game,
                    starting_player: players_in_game[0].username
                }
    
                if (players_in_lobby.length <= 4) {
                    io.emit('players', matchConfig)
                    players_in_lobby = []
                    return
                }
            }
    
            setTimeout(() => {
                socket.emit('timeout', {message: 'Sorry, we could not find another player waiting for a match'})
                players_in_lobby = []
            }, 10000);
        }, 15000)
    })

    socket.on('check_letter', ({username, lives, letter}) => {
        const { gameWord } = word

        const index = players_in_game.findIndex(player => player.username === username)
        if (index === -1) return io.emit('error', { message: 'Player is not in the In-Game room now' })

        if (gameWord.includes(letter)) {
            io.emit('match', {message: true})
        } else {
            const modifiedPlayer = {
                username,
                lives: lives - 1
            }

            players_in_game[index] = modifiedPlayer
            io.emit('players', {
                wordConfig: word,
                allPlayers: players_in_game,
                starting_player: players_in_game[0].username
            })
            io.emit('miss', {message: false})
        }

        // Passing to the next player's turn
        if (index === players_in_game.length - 1) {
            current_turn = 0
            return io.emit('current_turn', {current_turn: players_in_game[current_turn].username})
        }

        current_turn++
        return io.emit('current_turn', {current_turn: players_in_game[current_turn].username})
    })
})

server.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`))