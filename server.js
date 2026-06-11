
import express, { json } from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
