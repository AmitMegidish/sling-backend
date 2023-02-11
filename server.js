import express from 'express';
import cors from 'cors';

const PORT = process.env.PORT ?? 3000;

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
});