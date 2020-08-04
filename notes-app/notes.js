const fs = require('fs')
const chalk = require('chalk')

const readNote = (title) => {
    const notes = loadNotes()
    const keyNote = notes.find(element => element.title === title)
    if (keyNote) {
        console.log(chalk.blue(keyNote.title + ' ' + keyNote.body))
    }
    else {
        console.log(chalk.red(`Title ${title} not found`))
    }
}

const listNotes = () => {
    loadNotes().forEach(element => console.log(element.title))
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter(note => note.title !== title)
    if (notes.length === notesToKeep.length) {
        console.log(chalk.red(`Note with title:${title} not exist`))
    }
    else if (notes.length !== notesToKeep.length) {
        saveNotes(notesToKeep)
        console.log(chalk.green(`Note with title:${title} was deleted`))
    }
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note =>note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(`New note ${title} added`)
    } else {
        console.log(`Title ${title} already taken`)
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    listNotes : listNotes,
    addNote : addNote,
    removeNote : removeNote,
    readNote : readNote
}