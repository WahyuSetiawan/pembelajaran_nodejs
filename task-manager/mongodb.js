// CRUD create read update delete

const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { userNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("unable to connect to database")
    }

    const db = client.db(databaseName);

    // db.collection('users').insertOne({
    //     nama: "wahyu",
    //     age: 27
    // })

    db.collection(
        "tasks"
    ).insertOne({
        description: 'Clean the house',
        completed: true
    })

    db.collection(
        "tasks"
    ).insertOne({
        description: 'Renew inspection',
        completed: false
    })

    db.collection(
        "tasks"
    ).insertOne({
        description: 'Pot plants',
        completed: false
    })
})