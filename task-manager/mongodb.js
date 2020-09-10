const { MongoClient, ObjectID } = require('mongodb')

const connectionUrl = 'mongodb://localhost:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionUrl, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect' + error)
    }
    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     name : 'asd',
    //     age : 12
    // }, (error, inserted) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(inserted.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'asd', age: 13
    //     }, {
    //         name: 'asd', age: 13
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Cant insert docs')
    //     }
    //     console.log(result.ops)
    // })
    // db.collection('tasks').findOne({_id: new ObjectID("5f5a0c43588fe02f6b0b94c2")}, (error, result) => {
    //     if (error) {
    //         return console.log('Cant fetch')
    //     }
    //     console.log(result)
    // })
    // db.collection('tasks').find({completed:true}).limit(1).toArray((error, result) => {
    //     console.log(result)
    // })

    // db.collection('tasks').updateOne({_id: new ObjectID("5f5a0c43588fe02f6b0b94c2")},{
    //     $set : {
    //         description : 'Clean the window'
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('tasks').deleteOne({description: 'yolo'}).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
})
