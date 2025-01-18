const express = require('express');
const router = express.Router();
const db = require('../db'); // Arquivo de configuração do banco de dados

// Página inicial com listagem
router.get('/', async (req, res) => {
    const [users] = await db.query('SELECT * FROM users');
    res.render('home', { users });
});

// Página de criação
router.get('/create', (req, res) => {
    res.render('create');
});

// Criação de usuário
router.post('/create', async (req, res) => {
    const { nome, sobrenome } = req.body;
    await db.query('INSERT INTO users (nome, sobrenome) VALUES (?, ?)', [nome, sobrenome]);
    res.redirect('/');
});

// Página de edição
router.get('/edit/:id', async (req, res) => {
    const [user] = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    res.render('edit', { user: user[0] });
});

// Atualização de usuário
router.post('/edit/:id', async (req, res) => {
    const { nome, sobrenome } = req.body;
    await db.query('UPDATE users SET nome = ?, sobrenome = ? WHERE id = ?', [nome, sobrenome, req.params.id]);
    res.redirect('/');
});

// Exclusão de usuário
router.post('/delete/:id', async (req, res) => {
    await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.redirect('/');
});

module.exports = router;
