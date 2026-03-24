const express = require('express');
const router = express.Router();
const users = [{'name': 'vasya'}];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(users);
});

router.post('/', function(req, res, next) {
    let user = req.body;
    users.push(user);
    res.status(201).json(user);
})

router.get('/:id', function(req, res, next) {
    let id = req.params.id - 1;
    if (users.length > id) {
        res.send(users[id]);
    }
    else {
        res.status(404).send('Not Found');
    }
})

module.exports = router;
