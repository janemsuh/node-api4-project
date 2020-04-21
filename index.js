// code away!
const express = require('express');
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

const server = express();
const port = 5000;
const logger = require('./middleware/logger');

server.use(express.json());
server.use(logger());

server.get('/', (req, res) => {
    res.json({
        message: 'The API is working!'
    });
});

server.use('/posts', postRouter);
server.use('/users', userRouter);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});