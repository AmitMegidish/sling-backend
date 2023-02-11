import express from 'express';
import cors from 'cors';
import fsRouter from './routes/fs.route.js';

const PORT = process.env.PORT ?? 3000;

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/fs", fsRouter);

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
});

