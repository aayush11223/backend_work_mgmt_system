const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRouter = require('./routes/auth.js');
const attendanceRouter = require('./routes/attendance.js');
const leavesRouter = require('./routes/leaves.js');
const worklogsRouter = require('./routes/worklogs.js');
const employeesRouter = require('./routes/employees.js');
const authMiddleware = require('./middleware/auth');


const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/attendance', authMiddleware, attendanceRouter);
app.use('/leaves', authMiddleware, leavesRouter);
app.use('/employees', authMiddleware, employeesRouter);
app.use('/worklogs', worklogsRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});




