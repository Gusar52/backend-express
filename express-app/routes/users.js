const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name text)`);

/* GET users listing. */
/* GET users listing. */
router.get('/', function(req, res, next) {
    db.all("SELECT id, name FROM users", [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            res.send(rows);
        }
    });
});

router.post('/', function(req, res, next) {
    let name = req.body.name;
    const insert = "INSERT INTO users (name) VALUES (?)";
    db.run(insert, [name], function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(201).json({ id: this.lastID, name }); // Возвращаем созданный объект
    });
})

router.get('/:id', function(req, res, next) {
    let id = req.params.id;
    db.get("SELECT name FROM users WHERE id = ?", [id], (err, row) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.send(row);
        }
    });
})


module.exports = router;
