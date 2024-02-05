const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const cors = require('cors');
const registrationRouter = require('./registrationRouter');

const app = express();
const port = 3001;

const pool = new Pool({
    user: 'topblog',
    host: 'localhost',
    database: 'topblog',
    password: 'topblog',
    port: 6432,
});

app.use(cors()); // Используйте cors

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Привет, это текст на главной странице!');
});
app.use('/auth', registrationRouter);

// Регистрация пользователя
app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Хеширование пароля перед сохранением в базу данных
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );

        res.json(newUser.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' }); // Вернуть JSON с сообщением об ошибке
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Поиск пользователя в базе данных по имени пользователя
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        // Если пользователь не найден, отправляем ошибку
        if (user.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Проверка совпадения пароля
        const isPasswordMatch = await bcrypt.compare(password, user.rows[0].password);

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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
