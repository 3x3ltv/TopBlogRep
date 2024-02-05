const express = require('express');
const bodyParser = require('body-parser');
const registrationRouter = require('./registrationRouter');

const app = express();
const port = 3001; // Вы можете использовать другой порт, если хотите

app.use(bodyParser.json());
app.use('/auth', registrationRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
