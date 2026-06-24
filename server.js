import express from "express"
import cors from 'cors';
import "dotenv/config"
import morgan from "morgan";

import authRouter from './routes/auth.js';
import attendanceRouter from './routes/attendance.js';
import leavesRouter from './routes/leaves.js';
import worklogsRouter from './routes/worklogs.js';
import employeesRouter from './routes/employees.js';
import authMiddleware from './middleware/auth.js';
import paycheckRouter from './routes/paycheck.js';


const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
    res.json({
        ji: "asd"
    })
})

app.use('/auth', authRouter);
app.use('/attendance', authMiddleware, attendanceRouter);
app.use('/leaves', authMiddleware, leavesRouter);
app.use('/employees', authMiddleware, employeesRouter);
app.use('/worklogs', authMiddleware, worklogsRouter);
app.use('/paycheck', authMiddleware, paycheckRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});




