const database = require('better-sqlite3')
//create databases
// const userinfo = new database('user.db')

// const user_stmt = userinfo.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='userinfo';`)

// let user_row = user_stmt.get()

// // create user database
// if(user_row === undefined) {
//     console.log('User database missing')
//     var sqlInit = `CREATE TABLE userinfo ( id INTEGER PRIMARY KEY, username TEXT, password TEXT, email TEXT);`
//     userinfo.exec(sqlInit)
// } else {
//     console.log('user database exists')
// }

const surveydb = new database('survey.db')

const stmt = surveydb.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='surveyinfo';`)
let row = stmt.get();

if(row === undefined) {
    console.log('survey database missing')

    const sqlInit = `CREATE TABLE surveyinfo ( id INTEGER PRIMARY KEY, firstname TEXT, lastname TEXT, height INTEGER, age INTEGER, sleep INTEGER, mood TEXT, energy TEXT);`;

    surveydb.exec(sqlInit)
} else {
    console.log('survey database exists.')
}

module.exports = surveydb
// module.exports = userinfo
