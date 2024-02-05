const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const cors = require('cors');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig);

const router = express.Router();
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);

        // Сохраняем пользователя в базе данных
        await knex('users').insert({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/login', async (req, res) => {
    try {
        // Поиск пользователя в базе данных по имени пользователя
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [req.body.username]);

        // Если пользователь не найден, отправляем ошибку
        if (user.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Проверка совпадения пароля
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.rows[0].password);

        // Если пароль не совпадает, отправляем ошибку
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Возвращаем данные пользователя в случае успешной аутентификации
        res.json({
            username: user.rows[0].username,
            email: user.rows[0].email,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
