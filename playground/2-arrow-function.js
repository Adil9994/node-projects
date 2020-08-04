const square1 = function (x) {
    return x*x
}

const square2 = (x) => {
    return x*x
}

const square3 = (x) => x*x

const square4 = x => x*x

const event = {
    name : 'Birthday party',
    guestList : ['first', 'second','third'],
    printGuestList()  {
        this.guestList.forEach((guest) => {
            console.log(guest + ' is attending ' + this.name)
        })
    }
}

event.printGuestList()

