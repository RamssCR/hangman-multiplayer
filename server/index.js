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

const word = generateWord()


// Creating the real-time connection to websockets
io.on('connection', (socket) => {
    socket.on('newPlayer', ({ username }) => {
        // Adding users to the waiting array until more than 1 player joins the match
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
                    allPlayers: players_in_game
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
})

server.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`))