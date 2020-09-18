const path = require('path')
const http = require('http')
const { generateMessage, generateLocationMessage } = require('./utils/messages')
const express = require('express')
const socketIo = require('socket.io')
const Filter = require('bad-words')
const app = express()
const server = http.createServer(app)
const io = socketIo(server)
const { addUser, getUser, removeUser, getUsersInRoom} = require('./utils/utils')

const port = 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New Web Socket connection')

    socket.on('join', ({username, room}, callback) => {
        const {error, user} = addUser({ id : socket.id, username, room})

        if (error) {
            return callback(error)
        }

        socket.join(user.room)

        socket.emit('message', generateMessage('Admin','Welcome') )
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin',`${user.username} has joined`))

        callback()
    })

    socket.on('sendMessage', (msg, callback) => {
        const user = getUser(socket.id)
        const filter = new Filter()

        if (filter.isProfane(msg)) {
            return callback('No bad words in chat')
        }

        io.to(user.room).emit('message', generateMessage(user.username,msg))
        callback()
    })

    socket.on('sendCoordinates', (coordinates, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username,`https://google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`))
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', generateMessage('Admin',`${user.username} has left`))
        }
    })
})

server.listen(port, () => {
    console.log(`Server is up on ${port}!`)
})