const sqlite3 = require('sqlite3').verbose();
const md5 = require('md5');
//The .verbose() modifier is to get extra information for debugging. 
//MD5 is used to create a hash for stored passwords, avoiding to save plain text passwords.

const DBSOURCE = "./database.db";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message);
      throw err;
    }else{
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
        (err) => {
            if (err) {
                // Table already created
                console.log(err.message);
            }else{
                // Table just created, creating some rows
                const insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)';
                db.run(insert, ["admin","admin@admin.com",md5("admin123456")]);
                db.run(insert, ["user","user@user.com",md5("user123456")]);
            }
        });  
    }
});


module.exports = db
