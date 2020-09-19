const socket = io()

//server (emit) -> client (receive) -> acknowledgement -> server
//client (emit) -> server (receive) -> acknowledgement -> server

const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton  = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

const messageTemplate = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

const { username : username, room : room } = Qs.parse(location.search, { ignoreQueryPrefix : true })

socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        username : message.username,
        message : message.text,
        createdAt : moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('locationMessage', (message) => {
    console.log(message.url)
    const html = Mustache.render(locationMessageTemplate, {
        username : message.username,
        url : message.url,
        createdAt : moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    $messageFormButton.setAttribute('disabled', 'disabled')

    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (error) => {

        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()

        if (error) {
            return console.log(error)
        }
        console.log('Message delivered')
    })
})

$sendLocationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported')
    }

    $sendLocationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        let coordinates = {}
        coordinates.latitude = position.coords.latitude
        coordinates.longitude = position.coords.longitude

        socket.emit('sendCoordinates', coordinates, () => {
            $sendLocationButton.removeAttribute('disabled')
        })
    })
})

socket.on('roomData', ({room , users}) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML = html
})

socket.emit('join', {username : username, room : room}, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})