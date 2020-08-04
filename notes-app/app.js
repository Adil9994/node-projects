const notes = require('./notes.js')
const yargs = require('yargs')
const chalk = require('chalk')

yargs.command({
    command: 'add',
    describe : 'Add a new note',
    builder: {
        title: {
            describe : 'Note title',
            demandOption: true,
            type : 'string'
        },
        body : {
            describe : 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe : 'Removing a new note',
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'read',
    describe : 'Reading a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe : 'Listing a new note',
    handler() {
        notes.listNotes()
    }
})

yargs.argv