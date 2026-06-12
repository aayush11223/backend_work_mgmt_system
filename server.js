const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRouter = require('./routes/auth.js');
const attendanceRouter = require('./routes/attendance.js');
const leavesRouter = require('./routes/leaves.js');
const worklogsRouter = require('./routes/leaves.js');



const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
//This tells Express: "any request that starts with /auth — hand it to authRouter

app.use('/attendance', attendanceRouter);
//This tells Express: "any request that starts with /attendance — hand it to attendanceRouter

app.use('/leaves', leavesRouter);
//This tells Express: "any request that starts with /leaves — hand it to leavesRouter

app.use('/worklogs', worklogsRouter);
//This tells Express: "any request that starts with /worklogs — hand it to worklogsRouter

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
