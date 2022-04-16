const database = require('better-sqlite3')
//create databases
const userinfo = new database('user.db')

const user_stmt = userdb.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='userinfo';`)

let user_row = user_stmt.get()

// create user database
if(user_row === undefined) {
    console.log('User database missing')
    var sqlInit = `CREATE TABLE userinfo ( id INTEGER PRIMARY KEY, username TEXT, password TEXT, email TEXT);`
    userdb.exec(sqlInit)
} else {
    console.log('user database exists')
}



module.exports = userinfo
