const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const dataMessageOne = document.querySelector('#dataMessageOne')
const dataMessageTwo = document.querySelector('#dataMessageTwo')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    dataMessageOne.textContent = 'Loading...'
    dataMessageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response => {
        response.json().then((data => {
            if (data.messageError) {
                dataMessageOne.textContent = data.messageError
            } else {
                dataMessageOne.textContent = data[0].location
                dataMessageTwo.textContent = data[1].info.current.weather_descriptions
            }
        }))
    }))
})
