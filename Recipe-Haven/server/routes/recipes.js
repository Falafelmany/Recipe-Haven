const express = require('express');
const router = express.Router();

router.post('/submit', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).send('You need to log in to submit a recipe');
    }

    const { title, ingredients, instructions } = req.body;
    req.db.run(`INSERT INTO recipes (title, ingredients, instructions, user_id) VALUES (?, ?, ?, ?)`,
        [title, ingredients, instructions, req.session.userId], function(err) {
            if (err) {
                return res.status(500).send('Error submitting recipe');
            }
            res.redirect('/');
        });
});

router.get('/', (req, res) => {
    req.db.all(`SELECT * FROM recipes`, [], (err, rows) => {
        if (err) {
            return res.status(500).send('Error retrieving recipes');
        }
        res.json(rows);
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    req.db.get(`SELECT * FROM recipes WHERE id = ?`, [id], (err, row) => {
        if (err) {
            return res.status(500).send('Error retrieving recipe');
        }
        res.json(row);
    });
});

module.exports = router;
