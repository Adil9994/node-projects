//obj property shorthand

const name = 'first'
const age = 27

const user = {
    name : name,
    age : age,
    location : 'Omsk'
}

const user2 = {
    name,
    age,
    location : 'Omsk'
}

console.log(user)
console.log(user2)

//object destructing

const product = {
    label: 'red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
}

//const {label : productLabel, stock} = product
//console.log(productLabel,stock)

const transaction = (type, {label}) => {
    console.log(label)
}

transaction('order', product)