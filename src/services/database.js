const database = require('better-sqlite3')

const surveydb = new database('./data/databases/survey.db')

const stmt = surveydb.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='surveyinfo';`)
let row = stmt.get();

if(row === undefined) {
    console.log('survey database missing')

    const sqlInit = `CREATE TABLE surveyinfo ( id INTEGER PRIMARY KEY, firstname TEXT, lastname TEXT, email TEXT, height INTEGER, age INTEGER, sleep INTEGER, mood TEXT, energy TEXT, symptoms TEXT);`;

    surveydb.exec(sqlInit)
} else {
    console.log('survey database exists.')
}

module.exports = surveydb

