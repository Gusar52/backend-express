const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name text)`);

/* GET users listing. */
router.get('/', function(req, res, next) {
    db.all("SELECT id, name FROM users", [], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.send(rows);
        }
    });
});

router.post('/', function(req, res, next) {
    let user = req.body;
    const insert = "INSERT INTO users (user) VALUES (?)";
    db.run(insert, [user]);
    res.status(201).json(user);
})

router.get('/:id', function(req, res, next) {
    let id = req.params.id;
    db.get("SELECT name FROM users WHERE id = @id", [id], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.send(rows);
        }
    });
})

module.exports = router;
